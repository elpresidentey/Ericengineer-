-- Clean up duplicate inverter packages
-- Run this in Supabase SQL Editor

-- Delete all existing packages
DELETE FROM inverter_packages;

-- Reset the ID sequence
ALTER SEQUENCE inverter_packages_id_seq RESTART WITH 1;

-- Re-insert the correct packages (only once)
INSERT INTO inverter_packages (name, battery, without_solar, with_solar, featured) VALUES
  ('3.5KVA Inverter Package', '200AH Battery', '₦450,000', '₦750,000', false),
  ('5KVA Inverter Package', '220AH Battery', '₦650,000', '₦1,100,000', true),
  ('7.5KVA Inverter Package', '2 × 220AH Batteries', '₦950,000', '₦1,650,000', false),
  ('10KVA Inverter Package', '4 × 220AH Batteries', '₦1,500,000', '₦2,400,000', false);

-- Verify the cleanup
SELECT * FROM inverter_packages ORDER BY id;
