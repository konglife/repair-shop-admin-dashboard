import React from 'react'
import { Admin, Resource, ListGuesser } from 'react-admin'
import { People as PeopleIcon, Category as CategoryIcon, Scale as UnitsIcon } from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box, Typography, Card, CardContent, Paper, Chip } from '@mui/material'
import { QueryProvider } from '../providers/QueryProvider'
import { strapiProvider } from '../services/strapiProvider'
import { useAuthStore } from '../store/authSlice'
import { SimpleLoginPage } from '../components/SimpleLoginPage'

// Create enhanced MUI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: '"Sarabun", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

// Auth provider for react-admin
const authProvider = {
  login: ({ username, password }: { username: string; password: string }) => {
    // This will be handled by the custom login page
    return Promise.resolve()
  },
  logout: () => {
    const { logout } = useAuthStore.getState()
    logout()
    return Promise.resolve()
  },
  checkAuth: () => {
    const { isAuthenticated } = useAuthStore.getState()
    return isAuthenticated ? Promise.resolve() : Promise.reject()
  },
  checkError: (error: { status?: number }) => {
    const status = error.status
    if (status === 401 || status === 403) {
      const { logout } = useAuthStore.getState()
      logout()
      return Promise.reject()
    }
    return Promise.resolve()
  },
  getPermissions: () => Promise.resolve(),
}

// Dashboard component (enhanced)
const Dashboard = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h3" component="h1" gutterBottom sx={{ 
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      mb: 3
    }}>
      🔧 ยินดีต้อนรับสู่ระบบจัดการร้านซ่อม
    </Typography>
    
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3, mb: 4 }}>
      <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>📊 รายงานวันนี้</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            ข้อมูลสรุปการทำงานประจำวัน
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>👥 ลูกค้า</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            จัดการข้อมูลลูกค้าและประวัติการซ่อม
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>🔧 งานซ่อม</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            ติดตามสถานะงานซ่อมและอะไหล่
          </Typography>
        </CardContent>
      </Card>
    </Box>
    
    <Paper sx={{ p: 3, background: 'linear-gradient(145deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        🚀 <span>ขั้นตอนการพัฒนา</span>
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        ระบบอยู่ในขั้นตอนการพัฒนา Sprint 1 - Core Master Data
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip label="✅ Sprint 0: Setup สำเร็จ" color="success" />
        <Chip label="🔄 Sprint 1: ลูกค้า, หมวดหมู่, หน่วย" color="primary" />
        <Chip label="⏳ Sprint 2: สินค้า & ซัพพลายเออร์" />
        <Chip label="⏳ Sprint 3: การสั่งซื้อ" />
      </Box>
    </Paper>
  </Box>
)

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <QueryProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SimpleLoginPage onSuccess={() => window.location.reload()} />
        </ThemeProvider>
      </QueryProvider>
    )
  }

  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Admin
          dataProvider={strapiProvider}
          authProvider={authProvider}
          dashboard={Dashboard}
          title="ระบบจัดการร้านซ่อม"
        >
          {/* Temporary Resources for Sprint 0 - will be replaced in Sprint 1 */}
          <Resource name="customers" list={ListGuesser} icon={PeopleIcon} />
          <Resource name="categories" list={ListGuesser} icon={CategoryIcon} />
          <Resource name="units" list={ListGuesser} icon={UnitsIcon} />
          
        </Admin>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App