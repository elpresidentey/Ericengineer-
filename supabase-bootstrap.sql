-- Eric Electrical Tech - Supabase Bootstrap Script
-- Run this in your Supabase SQL Editor: https://toztgbqkmnghiavdynjs.supabase.co

-- 1. Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- 2. Create Services Table
CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Inverter Packages Table
CREATE TABLE IF NOT EXISTS inverter_packages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  battery TEXT NOT NULL,
  without_solar TEXT NOT NULL,
  with_solar TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  year TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Default Admin User (email: admin@eric.com, password: admin123)
-- Password hash is bcrypt hash of "admin123"
INSERT INTO admin_users (email, password_hash, name) VALUES
  ('admin@eric.com', '$2a$10$rKZJz7H/fZVRqh2YvF6XKOqJLkX8wL6y8nNl5YqDQXh8.gW6J9.3m', 'Administrator')
ON CONFLICT (email) DO NOTHING;

-- Insert Default Services
INSERT INTO services (title, description) VALUES
  ('Electrical Installation', 'Complete electrical solutions for residential, commercial, and industrial properties with certified installations.'),
  ('Solar & Inverter Systems', 'Premium solar panels and inverter installations with warranty and professional maintenance support.'),
  ('CCTV & Security', 'Advanced surveillance systems with remote monitoring capabilities.'),
  ('Fire Alarm Systems', 'Professional fire detection and alarm systems compliant with safety regulations.'),
  ('Automation Systems', 'Smart building automation and industrial control systems for efficiency.'),
  ('Gas Suppression', 'Advanced fire suppression systems using clean agents.'),
  ('Facility Management', 'Comprehensive facility management services including maintenance and repairs.'),
  ('Road Construction', 'Professional road construction and infrastructure development.')
ON CONFLICT DO NOTHING;

-- Insert Default Inverter Packages
INSERT INTO inverter_packages (name, battery, without_solar, with_solar, featured) VALUES
  ('3.5KVA Inverter Package', '200AH Battery', '₦450,000', '₦750,000', false),
  ('5KVA Inverter Package', '220AH Battery', '₦650,000', '₦1,100,000', true),
  ('7.5KVA Inverter Package', '2 × 220AH Batteries', '₦950,000', '₦1,650,000', false),
  ('10KVA Inverter Package', '4 × 220AH Batteries', '₦1,500,000', '₦2,400,000', false)
ON CONFLICT DO NOTHING;

-- Insert Default Projects
INSERT INTO projects (title, category, description, year) VALUES
  ('Lagos State Government Building', 'Government Project', 'Complete electrical installation and automation systems for state government facility', '2025'),
  ('Industrial Complex Security', 'Security Systems', 'Comprehensive CCTV surveillance and fire alarm system installation across 5 buildings', '2025'),
  ('Lekki Residential Solar', 'Solar Installation', '10KVA solar and inverter system with complete home automation', '2026'),
  ('Corporate Office Facility', 'Facility Management', 'Ongoing facility management and electrical maintenance for corporate headquarters', '2026'),
  ('Gas Suppression System', 'Fire Safety', 'Advanced clean agent fire suppression system for data center protection', '2025'),
  ('Road Construction Project', 'Infrastructure', 'Road construction and street lighting installation for government infrastructure project', '2024')
ON CONFLICT DO NOTHING;

-- Insert Default Testimonials
INSERT INTO testimonials (name, position, message) VALUES
  ('Engr. Michael Adebayo', 'Facility Manager, Lagos State Government', 'Eric Ohiol delivered exceptional work on our government facility electrical installations. Professional, reliable, and high quality work.'),
  ('Mrs. Chioma Okonkwo', 'Homeowner, Lekki', 'The solar installation exceeded our expectations. No more power issues and the team was professional throughout the project.'),
  ('Mr. Ibrahim Yusuf', 'Operations Director, Manufacturing Company', 'Outstanding automation systems installation. The CCTV and fire alarm systems have greatly improved our facility security and safety.')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE inverter_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON services;
DROP POLICY IF EXISTS "Allow public read access" ON inverter_packages;
DROP POLICY IF EXISTS "Allow public read access" ON projects;
DROP POLICY IF EXISTS "Allow public read access" ON testimonials;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON inverter_packages FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);

-- Admin users table is protected - no public access
-- Admin authentication will be handled through API routes
