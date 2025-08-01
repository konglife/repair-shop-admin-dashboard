# PRD: Repair Shop Admin Dashboard

> **Version:**1.0 (Final) | **Owner:** John (PM) | **Last updated:** 30 July 2025

---

## 1. Vision & Purpose

สร้างแผงหลังบ้านแบบ Single‑Page Application (SPA) สำหรับร้านซ่อมขนาดเล็ก — ให้เจ้าของร้านจัดการลูกค้า, งานซ่อม, สต็อกอะไหล่ และสรุปรายได้ได้อย่างรวดเร็ว **พร้อมความสามารถออกใบเสร็จ (Receipt) เป็น PDF ผ่าน PDFKit 0.16.0** บนเดสก์ท็อป Linux Mint เครื่องเดียว

---

## 2. Goals & Success Metrics

| เป้าหมาย                                | ตัวชี้วัดความสำเร็จ                                       |
| --------------------------------------- | --------------------------------------------------------- |
| ลดเวลาบันทึกใบงานซ่อม - งานขาย และอื่นๆ | ⬇ ลง 50 % ภายใน 1 เดือนแรก (จาก 4 → 2 นาที/งาน)           |
| เพิ่มความแม่นยำสต็อกอะไหล่              | Stock discrepancy < 2 % ต่อเดือน                          |
| เห็นภาพรวมรายได้รายเดือน                | Dashboard แสดงรายได้ประจำเดือนแบบเรียล‑ไทม์ (< 5 s delay) |
| สร้างใบเสร็จ PDF ได้ภายใน 1 คลิก        | 100 % ของ Sale/RepairJob มีลิงก์ดาวน์โหลด PDF ภายใน 0.5 s |

---

## 3. User Personas

- **Owner/Admin (คุณ T)** – Dev มือใหม่, ใช้คอม Linux Mint, ต้องการ UI เรียบง่าย Responsive

---

## 4. Key Use Cases / User Stories

| ID    | User Story                                                      | Priority |
| ----- | --------------------------------------------------------------- | -------- |
| US‑1  | **Manage Customers** – CRUD ข้อมูลลูกค้า (ชื่อ, เบอร์, รถ)      | Must     |
| US‑2  | **Manage Categories** (ประเภทอะไหล่/งาน) CRUD                   | Must     |
| US‑3  | **Manage Units** (เช่น ชิ้น, ลิตร) CRUD                         | Must     |
| US‑4  | **Manage Products** (อะไหล่) CRUD + ตั้ง Min Stock              | Must     |
| US‑5  | **Manage Suppliers** CRUD                                       | Should   |
| US‑6  | **Create Purchase** + **Purchase Items** – รับอะไหล่เข้า Stock  | Must     |
| US‑7  | **Stock Overview** – ดู/ปรับยอดคงเหลือวัตถุดิบ                  | Must     |
| US‑8  | **Create Repair Job** + **Used Parts** – บันทึกงาน/อะไหล่ที่ใช้ | Must     |
| US‑9  | **Record Sale & Sale Items** – ออกบิลขายทั่วไป                  | Must     |
| US‑10 | **Generate PDF Receipt** – สร้างใบเสร็จผ่าน PDFKit              | Must     |
| US‑11 | **View Dashboard KPI** – การ์ดงานวันนี้/รายได้/สต็อกต่ำ         | Must     |

---

## 5. Functional Requirements

| หมวด               | Requirement                                                                                                               | Priority |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------- |
| Authentication     | JWT login / refresh token จาก Strapi                                                                                      | Must     |
| Data Grid          | Sort‑Filter‑Paginate ทุกโมดูล                                                                                             | Must     |
| Dashboard          | KPI Cards + Recharts (line, pie)                                                                                          | Must     |
| CRUD Modules       | Customer, Categories, Units, Products, Suppliers, Purchases/Purchase Items, Stock, RepairJobs/UsedParts, Sales/Sale Items | Must     |
| Receipt Generation | ใช้ **PDFKit 0.16.0** ฝั่ง Frontend (browser) สร้าง PDF ใบเสร็จ                                                           | Must     |
| Export PDF         | ดาวน์โหลดสรุปรายเดือน                                                                                                     | Should   |
| Theming            | Light/Dark toggle (MUI v6)                                                                                                | Could    |

---

## 6. Non‑Functional Requirements

- **Performance:** First Load Time < 2 s (Vite + code‑splitting)
- **Compatibility:** React 19.1, react‑admin 5.6, Vite 7, MUI v6, PDFKit 0.16.0
- **Security:** ใช้ HTTPS, ​XSS safe via MUI components, JWT stored in HttpOnly cookie
- **Reliability:** PDF generation ต้องสำเร็จ ≥ 99.5 % (retry 1 ครั้ง)

---

## 7. Tech Stack Alignment

| Layer          | ชุดเทคโนโลยี                                           | Note                            |
| -------------- | ------------------------------------------------------ | ------------------------------- |
| Frontend       | React 19.1, Vite 7, react‑admin 5.6, MUI v6, shadcn/ui | SPA only, no SSR                |
| State/Data     | TanStack Query 5, Zustand 4, react‑hook‑form 8         |                                 |
| PDF Generation | **PDFKit 0.16.0** + blob‑stream                        | Client‑side generate & download |
| Backend        | Strapi v5 (deployed on Render)                         | primary key = `documentId`      |

---

## 8. Milestones & Timeline (Tentative)

| Sprint | ระยะเวลา        | เป้าหมายหลัก                                        |
| ------ | --------------- | --------------------------------------------------- |
|  0     | Aug 1 ‑ Aug 3   | Bootstrapping Vite, auth flow, dataProvider mapping |
|  1     | Aug 4 ‑ Aug 10  | **Customer, Categories, Units** CRUD + Unit tests   |
|  2     | Aug 11 ‑ Aug 17 | **Suppliers, Products** CRUD + Stock view           |
|  3     | Aug 18 ‑ Aug 24 | **Purchases & Purchase Items** + Stock update logic |
|  4     | Aug 25 ‑ Aug 31 | **Repair Jobs & Used Parts** module                 |
|  5     | Sep 1 ‑ Sep 7   | **Sales & Sale Items** + Receipt PDF via PDFKit     |
|  6     | Sep 8 ‑ Sep 14  | Dashboard KPIs, CSV Export, Polish UI, Dark mode    |

---

## 9. Risks & Mitigations

| ความเสี่ยง                                   | ผลกระทบ            | การบรรเทา                                             |
| -------------------------------------------- | ------------------ | ----------------------------------------------------- |
| ไลบรารี 3rd‑party ไม่อัปเดตรองรับ React 19.1 | Build fail / bug   | ตรวจ peer deps ล่วงหน้า, เตรียม fallback ↔ `react@18` |
| Strapi latency บน Render                     | โหลด Dashboard ช้า | เพิ่ม cache layer / index field                       |
| ขนาด bundle PDFKit (\~500 KB)                | First load ช้า     | ใช้ dynamic import / code‑split receipt page          |

---

## 10. Open Questions

1. ต้องการระบบสำรองข้อมูล (backup) อัตโนมัติหรือไม่?
2. ต้องการระบบค้นหาเต็มรูปแบบ (full‑text search) สำหรับ Product/Customer หรือใช้ filter ธรรมดาพอ?

---

### Appendix

- **Content Types (ครบตามลำดับ Build):** `customers`, `categories`, `units`, `products`, `suppliers`, `purchases`, `purchase_items`, `stocks`, `repair_jobs`, `used_parts`, `sales`, `sale_items`
- **API Base URL:** `https://my-shop-backend-g2k6.onrender.com/api`
- **Receipt Template:** 80 mm thermal style, โลโก้ร้าน + QR PromtPay

---

Draft prepared by **John (PM)** · 30 July 2025

