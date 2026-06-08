# Supabase Database Setup

## Database Tables

Run these SQL commands in your Supabase SQL Editor to create the required tables:

### 1. Services Table

```sql
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default services
INSERT INTO services (title, description) VALUES
  ('Electrical Installation', 'Complete electrical solutions for residential, commercial, and industrial properties with certified installations.'),
  ('Solar & Inverter Systems', 'Premium solar panels and inverter installations with warranty and professional maintenance support.'),
  ('CCTV & Security Systems', 'Advanced surveillance systems with remote monitoring capabilities for complete security coverage.'),
  ('Fire Alarm Systems', 'Professional fire detection and alarm systems compliant with safety regulations and standards.'),
  ('Automation Systems', 'Smart building automation and industrial control systems for efficiency and modern facility management.'),
  ('Gas Suppression Systems', 'Advanced fire suppression systems using clean agents for sensitive equipment protection.'),
  ('Facility Management', 'Comprehensive facility management services including maintenance, repairs, and system optimization.'),
  ('Road Construction', 'Professional road construction and infrastructure development for government and private projects.');
```

### 2. Inverter Packages Table

```sql
CREATE TABLE inverter_packages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  battery TEXT NOT NULL,
  without_solar TEXT NOT NULL,
  with_solar TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default packages
INSERT INTO inverter_packages (name, battery, without_solar, with_solar, featured) VALUES
  ('3.5KVA Inverter Package', '200AH Battery', '₦450,000', '₦750,000', false),
  ('5KVA Inverter Package', '220AH Battery', '₦650,000', '₦1,100,000', true),
  ('7.5KVA Inverter Package', '2 × 220AH Batteries', '₦950,000', '₦1,650,000', false),
  ('10KVA Inverter Package', '4 × 220AH Batteries', '₦1,500,000', '₦2,400,000', false);
```

### 3. Projects Table

```sql
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  year TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default projects
INSERT INTO projects (title, category, description, year) VALUES
  ('Lagos State Government Building', 'Government Project', 'Complete electrical installation and automation systems for state government facility', '2025'),
  ('Industrial Complex Security', 'Security Systems', 'Comprehensive CCTV surveillance and fire alarm system installation across 5 buildings', '2025'),
  ('Lekki Residential Solar', 'Solar Installation', '10KVA solar and inverter system with complete home automation', '2026'),
  ('Corporate Office Facility', 'Facility Management', 'Ongoing facility management and electrical maintenance for corporate headquarters', '2026'),
  ('Gas Suppression System', 'Fire Safety', 'Advanced clean agent fire suppression system for data center protection', '2025'),
  ('Road Construction Project', 'Infrastructure', 'Road construction and street lighting installation for government infrastructure project', '2024');
```

### 4. Testimonials Table

```sql
CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default testimonials
INSERT INTO testimonials (name, position, message) VALUES
  ('Engr. Michael Adebayo', 'Facility Manager, Lagos State Government', 'Eric Ohiol delivered exceptional work on our government facility electrical installations. Professional, reliable, and high quality work.'),
  ('Mrs. Chioma Okonkwo', 'Homeowner, Lekki', 'The solar installation exceeded our expectations. No more power issues and the team was professional throughout the project.'),
  ('Mr. Ibrahim Yusuf', 'Operations Director, Manufacturing Company', 'Outstanding automation systems installation. The CCTV and fire alarm systems have greatly improved our facility security and safety.');
```

## Row Level Security (RLS)

Enable RLS and set up policies for public read access and authenticated write access:

```sql
-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE inverter_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON inverter_packages FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);

-- Allow authenticated users to manage content
CREATE POLICY "Allow authenticated users to manage" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage" ON inverter_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
```

## Environment Setup

1. Create a `.env.local` file in the project root
2. Copy the contents from `.env.local.example`
3. Fill in your Supabase project URL and anon key from your Supabase dashboard

## Next Steps

After setting up the database:
1. Update the components to fetch data from Supabase
2. Build the admin dashboard for content management
3. Set up authentication for the admin panel
