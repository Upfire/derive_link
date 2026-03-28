# 🚗 DriveLink — Fleet SaaS Starter

A multi-tenant SaaS platform for Uber/rideshare fleet management. Car owners post vehicles, drivers rent them, admins manage the fleet.

## Architecture

### 3-Role System
| Role | Access | Description |
|------|--------|-------------|
| `superadmin` | `/superadmin/*` | Manages all tenants (fleet companies) on the platform |
| `admin` | `/admin/*` | Manages one tenant's fleet: cars, drivers, payments, portal config |
| `user` | `/portal/*` | Driver — sees only what admin has enabled for them |

### Key Concept: Admin-controlled Visibility
Admins configure **exactly what drivers can see** in their portal via the **Portal Settings** page (`/admin/settings`). Toggles control:
- Car details (make, model, VIN, mileage)
- Owner contact info
- Payment history
- Other drivers in the fleet
- Fleet-wide statistics
- Rental terms & daily rate breakdown
- Maintenance schedule

This data flows through `VisibilityContext` and is respected by all User portal pages.

---

## Tech Stack
- **React 18** + **TypeScript**
- **Vite** (dev server + bundler)
- **React Router v6** (nested routes per role)
- **Tailwind CSS** (utility-first, dark theme)
- **Recharts** (revenue chart)
- **Lucide React** (icons)

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@drivelink.io | super123 |
| Fleet Admin | admin@fastfleet.com | admin123 |
| Driver | driver@fastfleet.com | driver123 |

---

## Project Structure

```
src/
├── components/
│   ├── auth/          # Route guard (RequireAuth)
│   ├── layout/        # Sidebar, HeaderBar, DashLayout
│   └── shared/        # StatCard, Badge
├── context/
│   ├── AuthContext    # Login/logout, current user
│   └── VisibilityContext  # Admin-controlled driver portal config
├── pages/
│   ├── auth/          # LoginPage
│   ├── superadmin/    # Platform overview, tenant management
│   ├── admin/         # Fleet dashboard, cars, drivers, payments, settings
│   └── user/          # Driver portal (dashboard, car, payments, rental)
├── types/             # TypeScript interfaces
└── utils/
    └── mockData.ts    # Sample data (replace with real API calls)
```

---

## Next Steps (Backend Integration)

1. **Replace `mockData.ts`** with real API calls (REST or GraphQL)
2. **Replace `AuthContext` login** with JWT/OAuth flow
3. **Add a real backend**: Node.js + PostgreSQL recommended
   - Multi-tenant with `tenant_id` on every table
   - Row-level security in PostgreSQL for tenant isolation
4. **Persist VisibilityConfig** to database per tenant
5. **Add file uploads** for car images (S3/Cloudflare R2)
6. **Payment processing**: Stripe Connect for owner payouts

---

## Extending

**Add a new Admin page:**
1. Create `src/pages/admin/AdminXxx.tsx`
2. Add a `NavItem` in `AdminLayout.tsx`
3. Add a `<Route>` in `App.tsx`

**Add a new role-gated section:**
1. Create a new layout + pages directory
2. Wrap the layout route with `<RequireAuth allowedRoles={['yourRole']}>`
