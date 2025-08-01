import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Container,
  Paper,
  Avatar,
  Divider,
} from '@mui/material'
import { Build as BuildIcon, Login as LoginIcon } from '@mui/icons-material'
import { authApi } from '../services/api'
import { useAuthStore } from '../store/authSlice'

interface SimpleLoginPageProps {
  onSuccess?: () => void
}

export const SimpleLoginPage = ({ onSuccess }: SimpleLoginPageProps) => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!identifier || !password) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await authApi.login(identifier, password)
      
      // Store auth data in Zustand store
      login(response.jwt, response.user)
      
      // Call success callback if provided
      onSuccess?.()
      
    } catch (err: unknown) {
      console.error('Login error:', err)
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { error?: { message?: string } } } }
        if (axiosError.response?.data?.error?.message) {
          setError(axiosError.response.data.error.message)
        } else {
          setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
        }
      } else {
        setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              p: 4,
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <BuildIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              ระบบจัดการร้านซ่อม
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              เข้าสู่ระบบเพื่อจัดการงานซ่อมและลูกค้า
            </Typography>
          </Box>
          
          <CardContent sx={{ p: 4 }}>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="identifier"
              label="ชื่อผู้ใช้หรืออีเมล"
              autoComplete="username"
              autoFocus
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={isLoading}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={isLoading ? null : <LoginIcon />}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                  boxShadow: '0 6px 10px 2px rgba(25, 118, 210, .3)',
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'เข้าสู่ระบบ'
              )}
            </Button>
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="caption" color="text.secondary">
                ระบบปลอดภัย & ใช้งานง่าย
              </Typography>
            </Divider>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                โดย React Admin & Material-UI
              </Typography>
            </Box>
          </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  )
}

export default SimpleLoginPage