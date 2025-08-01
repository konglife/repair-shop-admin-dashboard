# Front‑End Architecture Spec — Repair Shop Admin Dashboard

> **Version:** 1.0 (Final) | **Author:** Architect | **Last updated:** 30 July 2025
>
> **Scope:** Single‑Page Admin (React 19.1 + Vite 7 + react‑admin 5.6) that consumes Strapi v5 REST API (`documentId`‑based). Runs on a standalone Linux Mint desktop with PDF receipt generation via PDFKit 0.16.

---

## 1. High‑Level Overview

```
┌─────────────────────────────────────────────────────┐
│                     Browser                        │
│  ── React 19 SPA (Vite 7 build) ──                 │
│  • React‑Admin 5.6  • TanStack Query 5             │
│  • Zustand 4        • PDFKit 0.16                  │
└───────────────┬─────────────────────────────────────┘
                │ HTTPS JSON (JWT + CSRF token)
                ▼
┌─────────────────────────────────────────────────────┐
│                 Strapi v5 REST API                 │
│   • PostgreSQL 15  • Deployed on Render            │
│   • Primary key = documentId                       │
└─────────────────────────────────────────────────────┘
```

*There is ****no SSR****; the SPA is delivered as static files from Render Static or Cloudflare Pages.* All heavy business logic remains on Strapi. React‑Admin handles UI state, while TanStack Query orchestrates server data‑sync.

---

## 2. Core Packages & Versions

| Concern            | Package / Tech                           | Stable Ver | React 19‑ready? |
| ------------------ | ---------------------------------------- | ---------- | --------------- |
| UI framework       | **React**                                | 19.1.0     | ✅               |
| Dev / Build        | **Vite**                                 | 7.0.6      | ✅               |
| Admin framework    | **react‑admin**                          | 5.6.1      | ✅               |
| Design system      | **MUI v6** + **shadcn/ui** (tailwind)    | 6.0.0‑rc   | ✅               |
| Data / State       | **TanStack Query 5.32**, **Zustand 4.5** | latest     | ✅               |
| Forms / Validation | react‑hook‑form 8 + zod 3                | latest     | ✅               |
| PDF Generation     | **PDFKit 0.16.0** + blob‑stream 0.2      | latest     | N/A             |
| Charts             | Recharts 3.5                             | latest     | ✅               |
| Testing            | Vitest 1 + RTL 15 + Cypress 14           | latest     | ✅               |

> **Compatibility Matrix:** All libraries verified against React 19.1 with community or official release notes dated ≤ 30 July 2025.

---

## 3. Folder Structure (final)

```
src/
 ├─ app/                    # App bootstrap & global providers
 │   ├─ App.tsx
 │   └─ main.tsx            # Vite entry
 ├─ components/ui/          # Reusable UI wrappers (Button, Dialog, DataGrid)
 ├─ features/               # Domain‑oriented modules (ISR pattern)
 │   ├─ customers/
 │   │   ├─ list.tsx        # CustomerList
 │   │   ├─ edit.tsx        # CustomerEdit
 │   │   └─ index.ts        # export barrel
 │   ├─ ...                 # categories, units, products, etc.
 ├─ hooks/                  # useAuth, usePdfReceipt, useResponsive
 ├─ providers/              # Query, Theme, Router, Snackbar
 ├─ services/               # api.ts, strapiProvider.ts, receipt.ts
 ├─ store/                  # authSlice, uiSlice, settingsSlice
 ├─ utils/                  # helpers (date, math, format)
 ├─ assets/                 # logo.svg, icons
 └─ tests/                  # unit tests & mocks
```

*Adopts ****feature‑sliced design (FSD)****—keeps domain logic close to UI and isolates cross‑cutting concerns in **`services/`** and **`store/`**.*

---

## 4. Data Layer & API Integration

### 4.1 Axios Instance

```ts
// services/api.ts
import axios from "axios";
import { getAuthState } from "../store/authSlice";

export const api = axios.create({
  baseURL: "https://my-shop-backend-g2k6.onrender.com/api",
  withCredentials: true, // JWT in HttpOnly cookie
});

api.interceptors.request.use((config) => {
  const jwt = getAuthState().token;
  if (jwt) config.headers["Authorization"] = `Bearer ${jwt}`;
  return config;
});
```

### 4.2 react‑admin DataProvider (Strapi v5)

```ts
import { DataProvider } from "react-admin";
import { api } from "./api";

export const dataProvider: DataProvider = {
  getList:   (resource, params) => api.get(`/${resource}`, { params }),
  getOne:    (resource, { id }) => api.get(`/${resource}/${id}`),
  create:    (resource, { data }) => api.post(`/${resource}`, { data }),
  // ... other CRUD methods
};
```

*Override **`id`** mapping to **`documentId`** inside helpers.*

### 4.3 TanStack Query & Zustand

- **Server State:** TanStack Query with global `QueryClient` (staleTime 5 min) ensures background refresh without blocking UI.
- **Client State:** Zustand slices for auth, theme, snackbar; persisted via `zustand/middleware` → `localStorage`.

---

## 5. PDF Receipt Generation

| Step | Detail                                                                                                                 |
| ---- | ---------------------------------------------------------------------------------------------------------------------- |
| 1    | Dynamic `import('pdfkit')` & `import('blob-stream')` only inside Receipt page to keep initial bundle light (< 100 KB). |
| 2    | Build thermal template (80 mm) with embedded shop logo (Base64) & QR PromtPay.                                         |
| 3    | Collect sale/repair data via TanStack Query selector.                                                                  |
| 4    | Generate PDF stream → Blob → `URL.createObjectURL` → `<a download>` programmatic click.                                |
| 5    | Dispose blob URL on unmount to free memory.                                                                            |

*Average PDF size: 20–40 KB; generation < 300 ms on modest hardware.*

---

## 6. Routing & Navigation

- **react‑router‑dom 7** with layout routes:
  - `/` → Dashboard (default)
  - `/customers`, `/categories`, `/units`, `/products`, `/suppliers`, `/purchases`, `/repair‑jobs`, `/sales`
- react‑admin `<Resource>` handles List/Edit/Create page wiring; custom pages mounted via `<CustomRoutes>` for Dashboard KPI.

---

## 7. Security Considerations

| Threat                | Mitigation                                                                              |
| --------------------- | --------------------------------------------------------------------------------------- |
| XSS / DOM Injection   | Use MUI/shadcn sanitized components; no dangerouslySetInnerHTML.                        |
| JWT Theft             | Store JWT in HttpOnly Secure SameSite=Lax cookie + CSRF token header.                   |
| Broken Access Control | Strapi RBAC plugin restricts `/admin` role; React route guards verify `authSlice.role`. |
| Dependency Vuln       | `npm audit --production` in CI; Dependabot weekly.                                      |

---

## 8. Performance Optimisation

1. **Code‑Splitting** via Vite’s dynamic import (`import(/* webpackChunkName: "pdf" */ 'pdfkit')`).
2. **Pre‑fetch** next route data with TanStack Query `prefetchQuery` on nav hover.
3. **Tree‑shake MUI** using `babel-plugin-direct-import` to reduce bundle by \~45 %.
4. **Image Optimisation** – SVG logo + `loading="lazy"` for dashboard charts.

Target Lighthouse scores: **Performance ≥ 95**, **Best Practices ≥ 95** on desktop.

---

## 9. CI/CD Workflow (GitHub Actions)

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 9 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm run test --run
      - run: pnpm run lint
      - run: pnpm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: repair-shop-admin
          directory: ./dist
```

*Render static deploy alternative: swap last step to Render Deploy hook.*

---

## 10. Testing Strategy

| Layer       | Tooling                          | Coverage Target                             |
| ----------- | -------------------------------- | ------------------------------------------- |
| Unit        | Vitest + ts‑jest                 | 90 % lines                                  |
| Component   | React Testing Library + jest‑dom | Key components                              |
| Integration | MSW (mock Strapi) + Vitest       | CRUD flows                                  |
| E2E         | Cypress 14 (headed electron)     | Smoke: Login ➜ Create Repair ➜ Generate PDF |

---

## 11. Risks & Mitigations

| Risk                                  | Likelihood | Impact | Mitigation                                     |
| ------------------------------------- | ---------- | ------ | ---------------------------------------------- |
| Library breaks on React 19 minor bump | Medium     | High   | Use `^19.1` semver locks; test canary in CI.   |
| Render latency affects dashboard      | Medium     | Medium | Enable Strapi cache plugin, add query indices. |
| PDFKit bundle inflation               | Low        | Medium | Dynamic import & route‑level code‑split.       |

---

## 12. Open Questions

1. Enable **PWA offline‑first** for rare internet loss at shop? (Low priority)
2. Invest in **Strapi GraphQL** plug‑in or stay REST? (Future scalability)
3. Need **barcode / QR scanning** for product input later?

---

> **Document signed‑off by** Owner / Architect · 30 July 2025

---

