# Development Plan - Repair Shop Admin Dashboard

> **วันที่สร้าง:** 30 July 2025 | **เวอร์ชัน:** 1.0

## ภาพรวมโครงการ

สร้าง Single-Page Application (SPA) สำหรับจัดการร้านซ่อมขนาดเล็ก ด้วย React 19.1 + react-admin 5.6 + Strapi v5 backend พร้อมระบบออกใบเสร็จ PDF

---

## Sprint 0: Project Setup (Aug 1-3, 2025)

### วัตถุประสงค์
- ตั้งค่าโครงการพื้นฐาน
- เชื่อมต่อกับ Strapi backend
- ระบบ authentication

### งานหลัก
1. **Project Initialization**
   - [ ] สร้างโครงการ Vite + React 19.1
   - [ ] ติดตั้ง dependencies: react-admin 5.6, MUI v6, TanStack Query 5, Zustand 4
   - [ ] ตั้งค่า TypeScript และ ESLint

2. **Authentication Setup**
   - [ ] สร้าง authSlice (Zustand)
   - [ ] ตั้งค่า axios interceptors สำหรับ JWT
   - [ ] สร้างหน้า Login/Register
   - [ ] ทดสอบการเชื่อมต่อกับ `/api/auth/local`

3. **Basic Layout**
   - [ ] ตั้งค่า react-admin Layout
   - [ ] สร้าง navigation menu
   - [ ] ตั้งค่า MUI theme (light/dark)

### ผลลัพธ์ที่คาดหวัง
- โครงการที่ build ได้และ run ได้
- ระบบ login/logout ทำงาน
- พื้นฐาน UI layout

---

## Sprint 1: Core Master Data (Aug 4-10, 2025)

### วัตถุประสงค์
- CRUD สำหรับข้อมูลหลัก 3 ตัวแรก
- ทดสอบระบบ react-admin

### งานหลัก
1. **Customers Module**
   - [ ] สร้าง CustomerList component
   - [ ] สร้าง CustomerEdit/Create forms
   - [ ] เชื่อมต่อกับ `/api/customers`
   - [ ] ทดสอบ CRUD operations

2. **Categories Module**
   - [ ] สร้าง CategoryList component
   - [ ] สร้าง CategoryEdit/Create forms
   - [ ] เชื่อมต่อกับ `/api/categories`

3. **Units Module**
   - [ ] สร้าง UnitList component
   - [ ] สร้าง UnitEdit/Create forms
   - [ ] เชื่อมต่อกับ `/api/units`

4. **Data Provider Enhancement**
   - [ ] ปรับ react-admin dataProvider สำหรับ Strapi v5 documentId
   - [ ] จัดการ error handling
   - [ ] เพิ่ม loading states

5. **Testing**
   - [ ] เขียน unit tests สำหรับ components
   - [ ] ตั้งค่า MSW สำหรับ mock API

### ผลลัพธ์ที่คาดหวัง
- CRUD ทำงานสมบูรณ์สำหรับ 3 modules
- ระบบ error handling พื้นฐาน
- Unit tests ครอบคลุม 80%+

---

## Sprint 2: Products & Suppliers (Aug 11-17, 2025)

### วัตถุประสงค์
- จัดการสินค้าและซัพพลายเออร์
- เริ่มระบบ Stock management

### งานหลัก
1. **Suppliers Module**
   - [ ] สร้าง SupplierList/Edit/Create
   - [ ] เชื่อมต่อกับ `/api/suppliers`
   - [ ] เพิ่ม validation forms

2. **Products Module**
   - [ ] สร้าง ProductList/Edit/Create
   - [ ] เชื่อมต่อ relations (category, unit, supplier)
   - [ ] เพิ่มฟิลด์ Min Stock Level
   - [ ] เชื่อมต่อกับ `/api/products`

3. **Stock Overview**
   - [ ] สร้างหน้า Stock dashboard
   - [ ] แสดงรายการสินค้าทั้งหมดพร้อม stock level
   - [ ] เตือนสินค้าใกล้หมด (below min stock)
   - [ ] เชื่อมต่อกับ `/api/stocks`

4. **Enhanced UI**
   - [ ] เพิ่ม responsive design
   - [ ] ปรับปรุง form validation
   - [ ] เพิ่ม confirmation dialogs

### ผลลัพธ์ที่คาดหวัง
- จัดการสินค้าและซัพพลายเออร์ได้สมบูรณ์
- ภาพรวม Stock พื้นฐาน
- UI ที่ responsive

---

## Sprint 3: Purchase Management (Aug 18-24, 2025)

### วัตถุประสงค์
- ระบบสั่งซื้อสินค้า
- อัปเดต Stock อัตโนมัติ

### งานหลัก
1. **Purchase Module**
   - [ ] สร้าง PurchaseList/Edit/Create
   - [ ] เชื่อมต่อกับ `/api/purchases`
   - [ ] เพิ่ม status tracking (Draft, Completed)

2. **Purchase Items**
   - [ ] สร้าง PurchaseItemList/Edit/Create
   - [ ] เชื่อมต่อ relation กับ Purchase และ Product
   - [ ] คำนวณ total amount

3. **Stock Integration**
   - [ ] อัปเดต stock เมื่อ purchase completed
   - [ ] สร้าง hook สำหรับ stock calculation
   - [ ] ป้องกัน stock เป็นลบ

4. **Business Logic**
   - [ ] สร้าง custom hooks สำหรับ purchase workflow
   - [ ] เพิ่ม validation rules
   - [ ] จัดการ concurrent updates

### ผลลัพธ์ที่คาดหวัง
- ระบบสั่งซื้อที่สมบูรณ์
- Stock update อัตโนมัติ
- Business logic ที่ถูกต้อง

---

## Sprint 4: Repair Jobs (Aug 25-31, 2025)

### วัตถุประสงค์
- ระบบจัดการงานซ่อม
- ติดตามการใช้อะไหล่

### งานหลัก
1. **Repair Jobs Module**
   - [ ] สร้าง RepairJobList/Edit/Create
   - [ ] เชื่อมต่อกับ Customer
   - [ ] เพิ่มฟิลด์: vehicle info, problem description, status
   - [ ] เชื่อมต่อกับ `/api/repair-jobs`

2. **Used Parts Module**
   - [ ] สร้าง UsedPartsList/Edit/Create
   - [ ] เชื่อมต่อกับ RepairJob และ Product
   - [ ] คำนวณค่าใช้จ่ายอะไหล่
   - [ ] เชื่อมต่อกับ `/api/used-parts`

3. **Repair Job Workflow**
   - [ ] สร้าง status workflow (Received, In Progress, Completed)
   - [ ] อัปเดต stock เมื่อใช้อะไหล่
   - [ ] คำนวณค่าแรงและค่าอะไหล่

4. **Reporting**
   - [ ] รายงานงานซ่อมรายวัน/เดือน
   - [ ] ติดตามประสิทธิภาพการซ่อม

### ผลลัพธ์ที่คาดหวัง
- ระบบจัดการงานซ่อมครบถ้วน
- ติดตามการใช้อะไหล่
- รายงานเบื้องต้น

---

## Sprint 5: Sales & PDF Receipts (Sep 1-7, 2025)

### วัตถุประสงค์
- ระบบขายสินค้า
- สร้างใบเสร็จ PDF

### งานหลัก
1. **Sales Module**
   - [ ] สร้าง SaleList/Edit/Create
   - [ ] เชื่อมต่อกับ Customer
   - [ ] เชื่อมต่อกับ `/api/sales`

2. **Sale Items Module**
   - [ ] สร้าง SaleItemsList/Edit/Create
   - [ ] เชื่อมต่อกับ Sale และ Product
   - [ ] คำนวณ total, tax, discount
   - [ ] เชื่อมต่อกับ `/api/sale-items`

3. **PDF Receipt Generation**
   - [ ] ติดตั้งและตั้งค่า PDFKit 0.16.0
   - [ ] สร้าง receipt template (80mm thermal)
   - [ ] เพิ่ม shop logo และ QR PromptPay
   - [ ] Dynamic import เพื่อลด bundle size

4. **Receipt Features**
   - [ ] สร้าง usePdfReceipt hook
   - [ ] ดาวน์โหลด PDF ผ่าน browser
   - [ ] พิมพ์ใบเสร็จ (print CSS)

5. **Stock Integration**
   - [ ] ลด stock เมื่อขายสำเร็จ
   - [ ] ตรวจสอบ stock ก่อนขาย

### ผลลัพธ์ที่คาดหวัง
- ระบบขายสมบูรณ์
- สร้างใบเสร็จ PDF ได้
- การจัดการ stock ที่แม่นยำ

---

## Sprint 6: Dashboard & Polish (Sep 8-14, 2025)

### วัตถุประสงค์
- Dashboard และ KPI
- ปรับปรุง UI/UX
- เตรียม production

### งานหลัก
1. **Dashboard KPIs**
   - [ ] การ์ดงานวันนี้ (repair jobs)
   - [ ] รายได้รายวัน/เดือน
   - [ ] สินค้าใกล้หมด
   - [ ] ลูกค้าใหม่

2. **Charts & Analytics**
   - [ ] ติดตั้ง Recharts 3.5
   - [ ] กราฟรายได้รายเดือน (line chart)
   - [ ] กราฟสัดส่วนงานซ่อม vs ขายสินค้า (pie chart)
   - [ ] ติดตามประสิทธิภาพ

3. **Export Features**
   - [ ] ส่งออกรายงานเป็น CSV
   - [ ] ส่งออกรายงานรายเดือนเป็น PDF

4. **UI/UX Polish**
   - [ ] ปรับปรุง responsive design
   - [ ] เพิ่ม loading skeletons
   - [ ] ปรับปรุง error messages
   - [ ] Dark mode ที่สมบูรณ์

5. **Performance Optimization**
   - [ ] Code splitting สำหรับ routes
   - [ ] Lazy loading สำหรับ heavy components
   - [ ] Bundle analysis และ optimization
   - [ ] PWA setup (optional)

6. **Production Preparation**
   - [ ] Environment configuration
   - [ ] Error tracking setup
   - [ ] Performance monitoring
   - [ ] Deployment scripts

### ผลลัพธ์ที่คาดหวัง
- Dashboard ที่ให้ข้อมูลครบถ้วน
- UI/UX ที่สวยงามและใช้งานง่าย
- พร้อมสำหรับ production

---

## การทดสอบตลอดโครงการ

### Unit Testing
- ใช้ Vitest + React Testing Library
- เป้าหมาย coverage 90%+
- Mock API calls ด้วย MSW

### Integration Testing
- ทดสอบ user flows สำคัญ
- ทดสอบ API integration
- ทดสอบ state management

### E2E Testing
- ใช้ Cypress 14
- ทดสอบ critical user paths:
  - Login → Create Customer → Create Repair Job → Generate PDF
  - Create Product → Purchase → Sale → Stock Update

---

## Performance Targets

- **First Load Time:** < 2s
- **Bundle Size:** < 500KB (initial)
- **PDF Generation:** < 300ms
- **API Response:** < 5s
- **Lighthouse Score:** Performance ≥ 95

---

## Deployment Strategy

1. **Development:** Local development server
2. **Staging:** Cloudflare Pages preview
3. **Production:** Cloudflare Pages + Strapi on Render

---

## Risk Mitigation

| ความเสี่ยง | แนวทางแก้ไข |
|---|---|
| React 19.1 compatibility issues | ใช้ stable versions, test thoroughly |
| PDFKit bundle size | Dynamic import, code splitting |
| Strapi API latency | Implement caching, optimize queries |
| Stock calculation errors | Comprehensive testing, transaction handling |

---

## Success Criteria

- ✅ ทุก CRUD operations ทำงานสมบูรณ์
- ✅ PDF receipts สร้างได้ใน < 0.5s
- ✅ Stock tracking แม่นยำ 100%
- ✅ Dashboard loading time < 5s
- ✅ Mobile responsive (320px+)
- ✅ Unit test coverage ≥ 90%
- ✅ E2E tests ผ่านทั้งหมด

---

> **หมายเหตุ:** แผนนี้อาจปรับเปลี่ยนได้ตามความเหมาะสมในระหว่างการพัฒนา