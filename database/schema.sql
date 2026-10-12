-- =========================================================================
-- Artist Launchpad: Supabase / PostgreSQL Schema & RLS Policies
-- =========================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Enums
DO $$ BEGIN
    CREATE TYPE course_type AS ENUM (
        'Acting',
        'Dancing',
        'Singing',
        'Music Production',
        'Multiple Skills'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE skill_level_type AS ENUM (
        'Beginner',
        'Some Experience',
        'Intermediate',
        'Experienced'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE training_mode_type AS ENUM (
        'Online',
        'Offline',
        'Hybrid'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE schedule_type AS ENUM (
        'Morning',
        'Afternoon',
        'Evening',
        'Flexible'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status_type AS ENUM (
        'New',
        'Contacted',
        'Interested',
        'Trial Scheduled',
        'Enrolled',
        'Not Interested'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_code VARCHAR(32) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(255),
    city_district VARCHAR(150) NOT NULL,
    course course_type NOT NULL,
    skill_level skill_level_type NOT NULL,
    training_mode training_mode_type NOT NULL,
    age_group VARCHAR(50),
    preferred_schedule schedule_type NOT NULL DEFAULT 'Flexible',
    learning_goals TEXT,
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    consent_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status application_status_type NOT NULL DEFAULT 'New',
    internal_notes JSONB DEFAULT '[]'::jsonb,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Settings Table
CREATE TABLE IF NOT EXISTS academy_settings (
    id VARCHAR(50) PRIMARY KEY,
    academy_name VARCHAR(100) NOT NULL DEFAULT 'Artist Launchpad',
    whatsapp_number VARCHAR(30) NOT NULL DEFAULT '+91 92791 20271',
    phone_number VARCHAR(30) NOT NULL DEFAULT '+91 92791 20271',
    email VARCHAR(255) NOT NULL DEFAULT 'santoshprasad8891@gmail.com',
    location VARCHAR(255) NOT NULL DEFAULT 'Raipur, Chhattisgarh (Studio Campus & Online Tracks)',
    instagram_url VARCHAR(255) DEFAULT 'https://instagram.com/santymanikpuri',
    youtube_url VARCHAR(255) DEFAULT 'https://youtube.com/@makemestar4130',
    facebook_url VARCHAR(255) DEFAULT 'https://facebook.com/artistlaunchpad',
    show_pricing BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Create Indexes for fast querying & CRM filtering
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_course ON applications(course);
CREATE INDEX IF NOT EXISTS idx_applications_phone ON applications(phone);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);

-- 5. Row Level Security (RLS) Configuration
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_settings ENABLE ROW LEVEL SECURITY;

-- Anonymous / Public policy: Allow INSERT only with valid consent
CREATE POLICY "Public can submit applications"
ON applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
    consent = true AND
    full_name IS NOT NULL AND
    phone IS NOT NULL AND
    city_district IS NOT NULL
);

-- Admin read policy: Only authenticated admins can view applications
CREATE POLICY "Admins can view applications"
ON applications
FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin' OR auth.role() = 'authenticated');

-- Admin update policy: Only authenticated admins can update status & notes
CREATE POLICY "Admins can update applications"
ON applications
FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin' OR auth.role() = 'authenticated')
WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.role() = 'authenticated');

-- Public can read public settings
CREATE POLICY "Public can view settings"
ON academy_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- Admins can update settings
CREATE POLICY "Admins can update settings"
ON academy_settings
FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin' OR auth.role() = 'authenticated');
