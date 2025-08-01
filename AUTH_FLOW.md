# Authentication & Registration Flow (Strapi v5)

## 1. Register User (POST /api/auth/local/register)
### Request
```json
{
  "username": "frontenduser",
  "email": "frontend@example.com",
  "password": "password123"
}
```
### Response
```json
{
  "jwt": "eyJhbGci...",
  "user": {
    "id": "clx...",
    "username": "frontenduser",
    "email": "frontend@example.com"
  }
}
```

## 2. Login (POST /api/auth/local)
### Request
```json
{
  "identifier": "frontenduser",
  "password": "password123"
}
```
### Response
```json
{
  "jwt": "eyJhbGci...",
  "user": {
    "id": "clx...",
    "username": "frontenduser",
    "email": "frontend@example.com"
  }
}
```

## 3. ใช้งาน JWT
- ทุก request ที่ต้องการ auth ให้แนบ header:
  - `Authorization: Bearer {jwt}`

## 4. ตัวอย่าง Error (401 Unauthorized)
```json
{
  "error": {
    "status": 401,
    "name": "UnauthorizedError",
    "message": "Invalid identifier or password"
  }
}
```
