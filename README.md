# Artist Launchpad – Professional Artist Skills Academy

A high-converting, responsive landing page and admissions management system for an artist training academy offering **Acting, Dancing, Singing, and Music Production**.

---

## 1. Project Overview & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion.
- **Backend**: Node.js & Express (`server.ts`) providing full-stack API endpoints.
- **Database**:
  - Local runtime persistence via atomic file storage (`data/applications.json` & `data/settings.json`).
  - Production PostgreSQL / Supabase SQL schema with Row-Level Security (RLS) located in `database/schema.sql`.
- **Application Portal**: Modal pop-up application form with Indian mobile number validation, course preselection, duplicate prevention, and immediate reference code generation.
- **Admissions CRM**: Password-protected dashboard with real-time statistics, search, filtering, status transitions, internal notes logging, 1-click WhatsApp follow-ups, and CSV export.

---

## 2. Quickstart & Local Installation

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Copy environment configuration
cp .env.example .env

# 3. Start development server (serves both React frontend & Express API on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 3. Environment Variables

Configure the following variables in your `.env` file:

| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | Local server port | `3000` |
| `ADMIN_PASSWORD` | Passcode for Admin CRM access | `artist2026` |
| `APP_URL` | Canonical app URL for SEO | `https://artistlaunchpad.academy` |
| `DATABASE_URL` | Optional PostgreSQL connection string | `postgresql://...` |
| `SUPABASE_URL` | Optional Supabase Project URL | `https://xyz.supabase.co` |
| `SUPABASE_ANON_KEY` | Optional Supabase Anon Key | `ey...` |

---

## 4. Database Setup & Supabase Migration

For production deployment on Supabase or self-hosted PostgreSQL:

1. Open your Supabase Dashboard or PostgreSQL client (e.g. `psql`, pgAdmin).
2. Run the SQL script located in `/database/schema.sql`.
3. The script sets up:
   - `applications` table with typed Enums for courses, skill levels, modes, and statuses.
   - `academy_settings` table for configurable contact details and pricing flags.
   - Row Level Security (RLS) policies allowing public inserts for verified applicants while locking read/write access to authenticated administrators.
   - B-Tree indexes for fast CRM searches on `phone`, `status`, `course`, and `created_at`.

---

## 5. Key Features

### High-Converting Landing Page
- Dark aesthetic with violet, pink, and amber cinematic gradients.
- Typography: Outfit & Plus Jakarta Sans via Google Fonts.
- Hero section with headline: *"Turn Your Talent Into Your Next Big Thing."*
- 4 dedicated course cards with curriculum breakdowns:
  1. **Acting**: Fundamentals, expressions, dialogue delivery, audition prep, screen presence.
  2. **Dancing**: Rhythm & coordination, Bollywood & contemporary, choreography, stage performance.
  3. **Singing**: Pitch & rhythm, breath control, Hindi/Bollywood song practice, studio mic technique.
  4. **Music Production**: DAW layout, beat-making, vocal tracking, audio editing, mixing workflow.
- Course cards automatically preselect the chosen course in the application modal.
- Studio philosophy, 4-step onboarding pathway, upcoming masterclasses, and transparent FAQs.

### Pop-up Application Form
- Full validation for:
  - Name (min 2 chars)
  - Indian mobile numbers (10 digits starting with 6–9) and international formats
  - City & district
  - Skill level & training mode (Online, Offline, Hybrid)
  - Privacy and contact consent
- Duplicate submission prevention within 3-minute intervals.
- Generates unique reference ID (e.g. `ALP-4812`).
- 1-click WhatsApp button pre-filled with applicant reference ID.

### Staff Admissions CRM Dashboard
- Accessible via **Staff Portal** button in header or footer.
- Default demo passcode: `artist2026` (convenient 1-click fill button included).
- Filter applications by Course, Pipeline Status, and Mode.
- Search applicants by name, phone number, city, or reference code.
- Detailed applicant drawer with full notes history.
- Status update workflow: `New` → `Contacted` → `Interested` → `Trial Scheduled` → `Enrolled` → `Not Interested`.
- 1-click WhatsApp follow-up link pre-populated with a personalized greeting.
- Export all records to `.csv` spreadsheet.
- Real-time settings editor to change WhatsApp number, phone, email, location, and toggle public course pricing.

---

## 6. External Accounts & Production Checklist

The application runs independently out of the box. Before public launch, configure the following external assets:

1. **WhatsApp Business Account**: Set your actual verified WhatsApp phone number in the Admin CRM settings.
2. **Domain & DNS**: Point your custom domain (e.g., `artistlaunchpad.com`) to your hosting provider.
3. **Payment Gateway (Optional Future Monetization)**: If enabling online tuition collection, connect Razorpay (`RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`) via server-side verification.
4. **Transactional Email (Optional)**: Connect SendGrid, Resend, or AWS SES for automated applicant email confirmations.
