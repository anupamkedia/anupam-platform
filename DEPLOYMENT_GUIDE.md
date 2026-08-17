# ANUPAM PAINTS — COMPLETE DIGITAL PLATFORM
## Step-by-Step Deployment Guide

**Platform:** Next.js 14 + Supabase + Vercel
**Total:** 82 pages, 7 portals, 7 API routes, 40+ database tables
**Integrations:** WhatsApp Business API, MSG91 SMS, Resend Email, Google Maps

---

## STEP 1: CREATE SUPABASE PROJECT (10 minutes)

1. Go to **https://supabase.com** → Sign up / Login
2. Click **"New Project"**
3. Name: `anupam-paints`
4. Database Password: choose a strong password (save it)
5. Region: **South Asia (Mumbai)** — ap-south-1
6. Click **"Create Project"** — wait 2 minutes for setup

### Run Database Migration:
1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open the file `supabase/migration.sql` from the zip
4. Copy-paste the ENTIRE content into the SQL editor
5. Click **"Run"** — you should see "Migration complete" at the bottom
6. Go to **Table Editor** — you should see 40+ tables with seed data

### Get Your API Keys:
1. Go to **Settings → API** in Supabase
2. Copy these values (you'll need them in Step 3):
   - **Project URL** (e.g., https://abcdef.supabase.co)
   - **anon/public key** (starts with eyJ...)
   - **service_role key** (starts with eyJ... — keep this SECRET)

### Enable Authentication:
1. Go to **Authentication → Providers** in Supabase
2. Email provider should be enabled by default
3. Go to **Authentication → URL Configuration**
4. Set **Site URL** to: `https://anupampaints.com` (or your Vercel URL)
5. Add **Redirect URLs**: `https://anupampaints.com/api/auth/callback`

### Create Storage Bucket (for media uploads):
1. Go to **Storage** in Supabase
2. Click **"New Bucket"**
3. Name: `media`
4. Toggle **"Public bucket"** ON
5. Click **"Create"**

---

## STEP 2: PUSH CODE TO GITHUB (5 minutes)

1. Extract the zip file on your computer
2. Open Terminal/Command Prompt in the extracted folder
3. Run these commands:

```bash
git init
git add .
git commit -m "Anupam Paints - Complete Digital Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anupam-paints.git
git push -u origin main
```

(Create the repository on GitHub first at https://github.com/new)

---

## STEP 3: DEPLOY ON VERCEL (5 minutes)

1. Go to **https://vercel.com** → Sign up / Login (use GitHub)
2. Click **"Add New Project"**
3. Import your `anupam-paints` repository
4. **Framework Preset:** Next.js (auto-detected)
5. Open **"Environment Variables"** and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service_role key |
| `NEXT_PUBLIC_SITE_URL` | `https://anupampaints.com` |

6. Click **"Deploy"** — wait 2-3 minutes
7. Your site is now live at `https://anupam-paints-xxx.vercel.app`

### Custom Domain:
1. In Vercel → Project Settings → Domains
2. Add `anupampaints.com`
3. Update your domain's DNS:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21`

---

## STEP 4: SET UP WHATSAPP BUSINESS API (30 minutes)

### Option A: Meta Business Platform (Recommended)
1. Go to **https://business.facebook.com**
2. Create a Business Account if you don't have one
3. Go to **Meta for Developers** → https://developers.facebook.com
4. Create an App → Type: **Business**
5. Add **WhatsApp** product to your app
6. Get a **temporary access token** from the WhatsApp API setup
7. Register your **business phone number**
8. Create **message templates** (require Meta approval):
   - `enquiry_confirmation` — "Hi {{1}}, thank you for your enquiry about {{2}}. Our team will contact you within 24 hours. — Anupam Paints"
   - `order_update` — "Hi {{1}}, your order {{2}} status: {{3}}. Track at anupampaints.com"
   - `warranty_confirmation` — "Dear {{1}}, your warranty for {{2}} is registered. Certificate: {{3}}"

9. Set up **Webhook**:
   - Callback URL: `https://anupampaints.com/api/whatsapp`
   - Verify Token: choose any secret string
   - Subscribe to: `messages`

10. Add to Vercel Environment Variables:
   - `WHATSAPP_API_URL` = `https://graph.facebook.com/v18.0`
   - `WHATSAPP_PHONE_NUMBER_ID` = (from Meta dashboard)
   - `WHATSAPP_ACCESS_TOKEN` = (permanent token — generate via System User)
   - `WHATSAPP_VERIFY_TOKEN` = (your chosen verify token)

### Option B: Third-Party Providers
If Meta's process is too complex, use providers like:
- **Twilio** (WhatsApp Business API) — https://twilio.com
- **WATI** (India-focused) — https://wati.io
- **Interakt** — https://interakt.shop

---

## STEP 5: SET UP SMS GATEWAY — MSG91 (15 minutes)

1. Go to **https://msg91.com** → Sign up
2. Get your **Auth Key** from Dashboard → API Keys
3. Go to **SMS → Templates** and create DLT-registered templates:
   - OTP Template: "Your Anupam Paints verification code is {otp}. Valid for 10 minutes."
   - Enquiry Template: "Dear {name}, we received your {enquiry_type} enquiry. Our team will contact you shortly. — Anupam Paints"
   - Warranty Template: "Dear {name}, warranty registered for {product}. Certificate: {url}. — Anupam Paints"
   - Order Template: "Dear {name}, your order {order_id} is {status}. — Anupam Paints"

4. After DLT approval, note the **Template IDs**
5. Add to Vercel Environment Variables:
   - `MSG91_AUTH_KEY` = your auth key
   - `MSG91_SENDER_ID` = `ANUPAM` (register this sender ID)
   - `MSG91_TEMPLATE_ID_OTP` = your OTP template ID
   - `MSG91_TEMPLATE_ID_ENQUIRY` = your enquiry template ID
   - `MSG91_TEMPLATE_ID_WARRANTY` = your warranty template ID
   - `MSG91_TEMPLATE_ID_ORDER` = your order template ID

---

## STEP 6: SET UP EMAIL — RESEND (10 minutes)

1. Go to **https://resend.com** → Sign up
2. Add your domain: `anupampaints.com`
3. Add DNS records (MX, TXT, CNAME) as shown by Resend
4. Get your **API Key**
5. Add to Vercel Environment Variables:
   - `RESEND_API_KEY` = your key
   - `EMAIL_FROM` = `Anupam Paints <notifications@anupampaints.com>`
   - `EMAIL_SALES` = `sales@anupampaints.com`
   - `EMAIL_TECHNICAL` = `technical@anupampaints.com`

---

## STEP 7: SET UP GOOGLE MAPS (5 minutes)

1. Go to **https://console.cloud.google.com**
2. Create a project → Enable **Maps JavaScript API** and **Places API**
3. Create an API Key → Restrict to your domain
4. Add to Vercel: `NEXT_PUBLIC_GOOGLE_MAPS_KEY` = your key

---

## STEP 8: CREATE YOUR ADMIN ACCOUNT (2 minutes)

1. Go to your live site → `/signup`
2. Create an account with your email
3. Go to **Supabase → Table Editor → profiles**
4. Find your user row → set `role_id` to the `super_admin` role's UUID
5. Now login at `/login` → you can access `/admin`

---

## STEP 9: POPULATE YOUR DATA (ongoing)

Priority order for data entry via Admin Panel (`/admin`):

1. **Settings** (`/admin/settings`) — Update company phone, email, WhatsApp, social links
2. **Products** (`/admin/products`) — Add products division by division
3. **Media** (`/admin/media`) — Upload product images, factory photos, certificates
4. **Blog** (`/admin/blog`) — Write 3-5 initial articles
5. **Dealers** (`/admin/dealers`) — Add dealer network

---

## PLATFORM MAP — ALL 82 PAGES

### Public Website (18 pages)
| URL | Purpose |
|---|---|
| `/` | Home — hero, stats, divisions, approvals, solutions, CTA |
| `/about` | Company timeline, vision/mission, leadership |
| `/infrastructure` | Factory facilities, lab, resin plant |
| `/products` | Product divisions landing |
| `/products/[division]` | Division product grid |
| `/products/[division]/[product]` | Individual product detail |
| `/product-finder` | 4-step interactive product recommendation |
| `/solutions` | 12 coating solution cards |
| `/solutions/[slug]` | Layer-by-layer coating system spec |
| `/approvals` | Categorised approval cards |
| `/clients` | Client sectors grid |
| `/contact` | Enquiry form (triggers WhatsApp + SMS + Email) |
| `/calculator` | Wall/industrial/roof paint calculators |
| `/shade-card` | Interactive shade browser |
| `/blog` | Blog listing |
| `/blog/[slug]` | Full article page |
| `/technical-library` | TDS/MSDS download categories |
| `/dealers` | Find/become a dealer |
| `/testimonials` | Customer feedback |
| `/careers` | Career opportunities |
| `/privacy-policy` | DPDPA compliant privacy policy |
| `/terms` | Terms of use |

### Auth (2 pages)
| `/login` | Email/phone login |
| `/signup` | New user registration |

### Admin Panel (17 pages — requires login)
| `/admin` → Dashboard, Products, Enquiries, Blog, Media, Dealers, Settings, Campaigns, Warranties, Complaints, Painters, Employees, Reports, Users, Approvals, Notifications, CMS Pages |

### Employee SFA (10 pages — requires login)
| `/employee` → Dashboard, Attendance (GPS), Tour Plan, Visits (dealer/painter/project/institutional), Leads, Quotations, Tasks, Expenses, Sales, Collections |

### Dealer Portal (10 pages — requires login)
| `/dealer` → Dashboard, Catalogue, Orders, Statements, Schemes, Loyalty, Complaints, Warranty, Leads, Training |

### Painter Portal (9 pages — requires login)
| `/painter` → Dashboard, QR Scan, Points, Rewards, Projects, Schemes, Training, Leads, Nearby Dealers |

### Customer Portal (5 pages — requires login)
| `/customer` → Dashboard, Warranty, Complaints, Purchases, Authenticity Check |

### Manager Dashboard (7 pages — requires login)
| `/manager` → Dashboard, Team, Visit Review, Pipeline, Performance, Expenses, Reports |

### API Routes (7 endpoints)
| `/api/enquiry` | Enquiry submission + WhatsApp/SMS/email notification |
| `/api/tds-download` | Gated TDS download with lead capture |
| `/api/scan` | Painter QR/coupon scan for loyalty |
| `/api/warranty` | Warranty registration + lookup |
| `/api/whatsapp` | WhatsApp Business webhook |
| `/api/sms` | OTP send/verify and SMS dispatch |
| `/api/auth/callback` | Supabase auth callback handler |

---

## INTEGRATIONS SUMMARY

| Service | Purpose | Library File |
|---|---|---|
| WhatsApp Business API | Customer notifications, enquiry alerts | `src/lib/notifications.ts` |
| MSG91 SMS | OTP verification, order updates, warranty SMS | `src/lib/notifications.ts` |
| Resend Email | Sales alerts, transactional emails | `src/lib/notifications.ts` |
| Supabase Auth | Login, signup, role-based portal access | `src/lib/auth.ts` + `src/middleware.ts` |
| Supabase Database | All data storage (PostgreSQL) | `src/lib/supabase.ts` |
| Supabase Storage | Media, documents, images | Admin media library |
| Google Maps | Dealer locator, GPS tracking | Client-side integration |

---

## TROUBLESHOOTING

**Build fails:** Check `.env.local` has all 4 Supabase variables
**Login not working:** Ensure Supabase Auth → URL Configuration has correct Site URL
**WhatsApp not sending:** Check access token is valid, templates are approved by Meta
**SMS not sending:** Check MSG91 auth key, DLT templates approved, sender ID registered
**Images not loading:** Create "media" storage bucket in Supabase and make it public
**Admin access denied:** Set your profile's role_id to super_admin in Supabase Table Editor

---

**Anupam Enterprises** | Since 1972 | Kolkata, India
