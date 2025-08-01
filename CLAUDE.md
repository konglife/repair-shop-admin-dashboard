# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Repair Shop Admin Dashboard - a React 19.1 SPA built with Vite 7 and react-admin 5.6 that manages customers, products, repairs, and sales for a small repair shop. The application integrates with a Strapi v5 REST API backend and includes PDF receipt generation via PDFKit 0.16.0.

## Architecture

### Tech Stack
- **Frontend**: React 19.1, Vite 7, react-admin 5.6, MUI v6, shadcn/ui
- **State Management**: TanStack Query 5, Zustand 4
- **Forms**: react-hook-form 8 + zod 3
- **PDF Generation**: PDFKit 0.16.0 + blob-stream (client-side)
- **Testing**: Vitest 1 + RTL 15 + Cypress 14
- **Backend**: Strapi v5 (deployed on Render)

### Project Structure
```
src/
├── app/                    # App bootstrap & global providers
├── components/ui/          # Reusable UI components (Button, Dialog, DataGrid)
├── features/               # Domain modules (customers, products, repairs, sales)
├── hooks/                  # Custom hooks (useAuth, usePdfReceipt, useResponsive)
├── providers/              # Query, Theme, Router, Snackbar providers
├── services/               # API layer (api.ts, strapiProvider.ts, receipt.ts)
├── store/                  # Zustand slices (auth, ui, settings)
├── utils/                  # Helper functions
└── tests/                  # Unit tests & mocks
```

## Development Commands

Since this is currently a planning/documentation stage project, the following commands are expected based on the architecture specification:

```bash
# Install dependencies
pnpm install

# Development server
pnpm run dev

# Build for production
pnpm run build

# Run tests
pnpm run test        # Vitest unit tests
pnpm run test:watch  # Watch mode
pnpm run test:e2e    # Cypress E2E tests

# Linting and formatting
pnpm run lint
pnpm run typecheck

# Preview production build
pnpm run preview
```

## API Integration

### Backend Configuration
- **Base URL**: `https://my-shop-backend-g2k6.onrender.com/api`
- **Authentication**: JWT tokens via Bearer header
- **Primary Key**: Uses `documentId` (Strapi v5 format)

### Core Entities
- `customers` - Customer management
- `categories` - Product/service categories
- `units` - Measurement units
- `products` - Inventory items
- `suppliers` - Supplier management
- `purchases` + `purchase_items` - Purchase orders
- `stocks` - Inventory tracking
- `repair_jobs` + `used_parts` - Repair job management
- `sales` + `sale_items` - Sales transactions

### API Patterns
All endpoints follow Strapi v5 REST conventions:
- GET `/api/{resource}` - List with filtering/pagination
- GET `/api/{resource}/{documentId}` - Single item
- POST `/api/{resource}` - Create
- PUT `/api/{resource}/{documentId}` - Update
- DELETE `/api/{resource}/{documentId}` - Delete

## Key Features

### PDF Receipt Generation
- Client-side PDF generation using PDFKit 0.16.0
- Dynamic imports to keep initial bundle light
- Thermal receipt format (80mm width)
- Includes shop logo and QR PromptPay codes

### Data Management
- react-admin for CRUD operations
- TanStack Query for server state management
- Zustand for client state (auth, UI preferences)
- Optimistic updates with error handling

### Performance Optimizations
- Code-splitting via dynamic imports
- Tree-shaking for MUI components
- Image optimization (SVG logos, lazy loading)
- Bundle target: < 100KB initial load

## Authentication Flow

- Login: POST `/api/auth/local` with identifier/password
- Returns JWT token and user object
- Token stored in HttpOnly cookies with CSRF protection
- All authenticated requests use `Authorization: Bearer {jwt}` header

## Error Handling

Strapi v5 returns structured errors:
```json
{
  "error": {
    "status": 400,
    "name": "ValidationError", 
    "message": "name must be defined"
  }
}
```

Handle errors by checking `error.status` and displaying appropriate user messages.

## Testing Strategy

- **Unit Tests**: Vitest for utilities and hooks (90% coverage target)
- **Component Tests**: RTL for key components
- **Integration Tests**: MSW for API mocking
- **E2E Tests**: Cypress for critical user flows

## Security Considerations

- XSS protection via MUI/shadcn sanitized components
- JWT in HttpOnly Secure SameSite cookies
- RBAC via Strapi admin roles
- No sensitive data in client-side code
- Regular dependency audits via `npm audit`

## Development Workflow

### Sprint-Based Development
This project follows a 6-sprint development plan (see `plan.md`). Each sprint has specific deliverables and testing requirements.

### Progress Tracking Requirements
**IMPORTANT**: After completing each sprint or major milestone:
1. User must test all implemented features thoroughly
2. User must confirm that features work as expected
3. Only after user approval, update the development plan and mark tasks as completed
4. Update `plan.md` with actual progress and any scope changes
5. Document any blockers or changes in approach

### Plan Update Protocol
- **Never** mark sprint tasks as completed without user testing confirmation
- Update `plan.md` progress section after each user validation
- Adjust timeline estimates based on actual development speed
- Document lessons learned and technical decisions

## Development Notes

- Follow feature-sliced design (FSD) patterns
- Use existing component libraries (MUI v6 + shadcn/ui)
- Implement responsive design for desktop Linux Mint usage
- Maintain React 19.1 compatibility for all dependencies
- Code-split heavy features like PDF generation