# API Endpoint Summary (Strapi v5)

> **อัปเดต: 2025-07-09**

## รายการ Endpoints ทั้งหมด (REST API)

| Content Type   | List                | Single (documentId)         | Create            | Update               | Delete               |
|---------------|---------------------|-----------------------------|-------------------|----------------------|----------------------|
| Category      | GET /api/categories | GET /api/categories/{documentId} | POST /api/categories | PUT /api/categories/{documentId} | DELETE /api/categories/{documentId} |
| Customer      | GET /api/customers  | GET /api/customers/{documentId}  | POST /api/customers  | PUT /api/customers/{documentId}  | DELETE /api/customers/{documentId}  |
| Product       | GET /api/products   | GET /api/products/{documentId}   | POST /api/products   | PUT /api/products/{documentId}   | DELETE /api/products/{documentId}   |
| Purchase      | GET /api/purchases  | GET /api/purchases/{documentId}  | POST /api/purchases  | PUT /api/purchases/{documentId}  | DELETE /api/purchases/{documentId}  |
| PurchaseItem  | GET /api/purchase-items | GET /api/purchase-items/{documentId} | POST /api/purchase-items | PUT /api/purchase-items/{documentId} | DELETE /api/purchase-items/{documentId} |
| RepairJob     | GET /api/repair-jobs| GET /api/repair-jobs/{documentId}| POST /api/repair-jobs| PUT /api/repair-jobs/{documentId}| DELETE /api/repair-jobs/{documentId}|
| Sale          | GET /api/sales      | GET /api/sales/{documentId}      | POST /api/sales      | PUT /api/sales/{documentId}      | DELETE /api/sales/{documentId}      |
| SaleItem      | GET /api/sale-items | GET /api/sale-items/{documentId} | POST /api/sale-items | PUT /api/sale-items/{documentId} | DELETE /api/sale-items/{documentId} |
| Stock         | GET /api/stocks     | GET /api/stocks/{documentId}     | POST /api/stocks     | PUT /api/stocks/{documentId}     | DELETE /api/stocks/{documentId}     |
| Supplier      | GET /api/suppliers  | GET /api/suppliers/{documentId}  | POST /api/suppliers  | PUT /api/suppliers/{documentId}  | DELETE /api/suppliers/{documentId}  |
| Unit          | GET /api/units      | GET /api/units/{documentId}      | POST /api/units      | PUT /api/units/{documentId}      | DELETE /api/units/{documentId}      |
| UsedPart      | GET /api/used-parts | GET /api/used-parts/{documentId} | POST /api/used-parts | PUT /api/used-parts/{documentId} | DELETE /api/used-parts/{documentId} |


## หมายเหตุสำคัญ (Strapi v5)
- **documentId**: ใช้เป็น path parameter สำหรับ single entry (เช่น `/api/products/{documentId}`)
- **Numeric id**: ถ้าต้องการค้นหาด้วย id เดิม (เลข) ให้ใช้ query filter เช่น `/api/products?filters[id][$eq]=1`
- สามารถใช้ query filter อื่นๆ ได้ตาม Strapi docs เช่น sort, pagination, populate

## ตัวอย่างการใช้งาน
- **Get รายการสินค้า:**
  - `GET /api/products`
- **Get รายการสินค้าแบบเจาะจง:**
  - `GET /api/products/{documentId}`
- **ค้นหาด้วย id เดิม:**
  - `GET /api/products?filters[id][$eq]=1`
- **สร้างลูกค้าใหม่:**
  - `POST /api/customers`
- **อัปเดตใบสั่งซื้อ:**
  - `PUT /api/purchases/{documentId}`
- **ลบ Supplier:**
  - `DELETE /api/suppliers/{documentId}`

## ข้อมูลเพิ่มเติม
- ทุก endpoint รองรับ query string สำหรับ filter, pagination, populate relations ตามมาตรฐาน Strapi
- การกำหนดสิทธิ์ (Public/Authenticated) ให้ดูที่ Strapi Admin Panel > Settings > Roles
- สำหรับการใช้งานแบบ Authenticated ให้ใช้ JWT (login ผ่าน `/api/auth/local`)

---

> **ข้อมูลนี้ใช้สำหรับทีม Frontend และ Fullstack ในการเชื่อมต่อกับ Strapi Backend**
