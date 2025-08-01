# Error Handling (Strapi v5)

## 1. ตัวอย่าง Error Response
### Validation Error
```json
{
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "name must be defined",
    "details": { ... }
  }
}
```

### Unauthorized (401)
```json
{
  "error": {
    "status": 401,
    "name": "UnauthorizedError",
    "message": "Invalid identifier or password"
  }
}
```

### Forbidden (403)
```json
{
  "error": {
    "status": 403,
    "name": "ForbiddenError",
    "message": "You are not allowed to perform this action"
  }
}
```

## 2. ข้อควรปฏิบัติ
- ตรวจสอบ `error.status` และ `error.message` ทุกครั้งใน frontend
- แสดงข้อความที่เหมาะสมกับผู้ใช้
- กรณี 401/403 ให้ redirect ไปหน้า login หรือแสดงแจ้งเตือน
