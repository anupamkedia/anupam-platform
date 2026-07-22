# Anupam Paints — Digital Platform

**Complete corporate website and admin CMS for Anupam Enterprises (Anupam Paints)**

Built with Next.js 14 + Supabase + Tailwind CSS. Ready for Vercel deployment.

---

## Quick Start

### 1. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open the **SQL Editor**
3. Copy the contents of `supabase/migration.sql` and run it
4. This creates all 40+ tables, seed data (divisions, brands, approvals), and RLS policies

### 2. Configure Environment

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL` → from Supabase Settings → API
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → from Supabase Settings → API (anon/public key)
   - `SUPABASE_SERVICE_ROLE_KEY` → from Supabase Settings → API (service_role key)

### 3. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add the same environment variables in Vercel project settings
4. Deploy — Vercel auto-builds and deploys

---

## Project Structure

```
anupam-paints/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── about/              # About Us
│   │   ├── infrastructure/     # Factory & Infrastructure
│   │   ├── products/           # Products landing + division pages
│   │   │   └── [slug]/         # Dynamic division pages
│   │   ├── solutions/          # Coating solutions
│   │   ├── approvals/          # Approvals & certifications
│   │   ├── clients/            # Clients & projects
│   │   ├── contact/            # Contact + enquiry form
│   │   ├── calculator/         # Paint calculators
│   │   ├── blog/               # Blog / knowledge centre
│   │   ├── technical-library/  # TDS/MSDS downloads
│   │   ├── dealers/            # Dealer network
│   │   ├── testimonials/       # Customer feedback
│   │   ├── careers/            # Career opportunities
│   │   ├── admin/              # Admin panel
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── products/       # Product management
│   │   │   ├── pages/          # CMS page builder
│   │   │   ├── media/          # Media library
│   │   │   ├── blog/           # Blog management
│   │   │   ├── enquiries/      # Enquiry management
│   │   │   ├── dealers/        # Dealer management
│   │   │   └── settings/       # Site settings
│   │   └── api/
│   │       └── enquiry/        # Enquiry submission API
│   ├── components/
│   │   ├── layout/             # Header, Footer, WhatsApp
│   │   ├── home/               # Homepage sections
│   │   ├── ui/                 # Reusable UI components
│   │   └── products/           # Product-specific components
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client + types
│   │   └── constants.ts        # Site data, nav, stats
│   └── styles/
│       └── globals.css         # Tailwind + custom styles
├── supabase/
│   └── migration.sql           # Complete database schema + seed data
├── tailwind.config.ts          # Brand colors + custom theme
├── next.config.js
└── package.json
```

## Pages Built (19 routes)

| Route | Description |
|---|---|
| `/` | Full homepage — hero, stats, divisions, why us, approvals, solutions, factory, CTA |
| `/about` | Company history timeline, vision/mission, strengths, leadership |
| `/infrastructure` | Factory facilities, lab, resin plant, safety systems |
| `/products` | Product divisions landing with category filters |
| `/products/[slug]` | Dynamic division pages with product grid |
| `/solutions` | 12 pre-configured coating solutions |
| `/approvals` | All approvals grouped by category with color coding |
| `/clients` | Client sectors with organization cards |
| `/contact` | Contact info + multi-field enquiry form |
| `/calculator` | Wall, industrial, and roof paint calculators |
| `/blog` | Blog listing with categories |
| `/technical-library` | TDS/MSDS download categories |
| `/dealers` | Find a dealer + become a dealer application |
| `/testimonials` | Testimonial cards with ratings |
| `/careers` | Department listing + resume submission |
| `/admin` | Admin dashboard with KPI cards |
| `/admin/*` | Admin panel with 13 sidebar sections |

## Database (40+ tables)

The migration creates tables for: users, roles, territories, products, divisions, categories, brands, solutions, pages, banners, menus, approvals, clients, case studies, testimonials, blog, media, enquiries, dealers, painters, employees, attendance, visits, leads, complaints, warranties, loyalty, campaigns, quotations, notifications, and settings.

## Brand Colors

- **Primary Blue:** `#1B3A5C` (brand-500)
- **Accent Red:** `#C0392B` (accent-400)
- **Steel Grey:** `#7F8C8D` (steel-400)
- **Light Background:** `#EBF5FB` (brand-50)

## What's Next (Phase 2+)

After deploying Phase 1, the following will be built:

- **Phase 2:** Employee SFA with GPS tracking, CRM, lead management
- **Phase 3:** Dealer portal with ordering, loyalty, and schemes
- **Phase 4:** Painter portal with QR scanning and rewards
- **Phase 5:** Campaign engine, warranty platform, customer portal
- **Phase 6:** BI dashboards, integrations (Tally, WhatsApp, SMS)

See the FRD document for complete specifications.

---

**Anupam Enterprises** | Since 1972 | Kolkata, India
