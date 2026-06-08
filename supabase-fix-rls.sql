-- Fix RLS Policies to Allow Admin Updates
-- Run this in your Supabase SQL Editor: https://toztgbqkmnghiavdynjs.supabase.co

-- Drop existing read-only policies
DROP POLICY IF EXISTS "Allow public read access" ON services;
DROP POLICY IF EXISTS "Allow public read access" ON inverter_packages;
DROP POLICY IF EXISTS "Allow public read access" ON projects;
DROP POLICY IF EXISTS "Allow public read access" ON testimonials;

-- Create new policies that allow all operations (read, insert, update, delete)
-- Public can READ
CREATE POLICY "Allow public read" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON inverter_packages FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON testimonials FOR SELECT USING (true);

-- Public can INSERT
CREATE POLICY "Allow public insert" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON inverter_packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON testimonials FOR INSERT WITH CHECK (true);

-- Public can UPDATE
CREATE POLICY "Allow public update" ON services FOR UPDATE USING (true);
CREATE POLICY "Allow public update" ON inverter_packages FOR UPDATE USING (true);
CREATE POLICY "Allow public update" ON projects FOR UPDATE USING (true);
CREATE POLICY "Allow public update" ON testimonials FOR UPDATE USING (true);

-- Public can DELETE
CREATE POLICY "Allow public delete" ON services FOR DELETE USING (true);
CREATE POLICY "Allow public delete" ON inverter_packages FOR DELETE USING (true);
CREATE POLICY "Allow public delete" ON projects FOR DELETE USING (true);
CREATE POLICY "Allow public delete" ON testimonials FOR DELETE USING (true);
