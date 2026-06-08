# Admin Dashboard Setup Guide

## Step 1: Configure Supabase

### 1.1 Get Your Supabase Keys

1. Go to: https://toztgbqkmnghiavdynjs.supabase.co
2. Navigate to **Settings** → **API**
3. Copy your **anon public** key

### 1.2 Update Environment Variables

Edit `.env.local` and add your Supabase anon key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://toztgbqkmnghiavdynjs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Step 2: Bootstrap Database

### 2.1 Run Bootstrap Script

1. Go to your Supabase dashboard: https://toztgbqkmnghiavdynjs.supabase.co
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-bootstrap.sql`
5. Paste into the SQL editor
6. Click **Run** (or press Ctrl+Enter)

This will create:
- ✅ All 4 tables (services, inverter_packages, projects, testimonials)
- ✅ Default data for all tables
- ✅ Row Level Security policies

### 2.2 Verify Tables

1. Click **Table Editor** in the left sidebar
2. You should see 4 tables:
   - `services` (8 rows)
   - `inverter_packages` (4 rows)
   - `projects` (6 rows)
   - `testimonials` (3 rows)

## Step 3: Access Admin Dashboard

### 3.1 Restart Dev Server

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

### 3.2 Login to Admin

1. Visit: http://localhost:3000/admin
2. Default password: `admin123`
3. Browse the admin dashboard

**⚠️ Important:** Change the default password before deploying to production!

## Step 4: Manage Content

### Option A: Use Supabase Dashboard (Easiest)

1. Go to **Table Editor** in Supabase
2. Select a table (e.g., `inverter_packages`)
3. Click on any row to edit
4. Make changes and click **Save**
5. Changes appear on website immediately!

### Option B: Build Full Admin UI (Advanced)

The admin UI at `/admin` is a starting point. To make it fully functional:

1. Set up Supabase Auth
2. Create admin UI pages for each table
3. Add forms for CRUD operations
4. Implement proper authentication

## Current Admin Features

✅ **Password-protected access**
✅ **Navigation to manage:**
- Services
- Inverter packages  
- Projects
- Testimonials

⏳ **Coming soon:**
- Edit forms for each content type
- Image uploads
- User management

## Quick Content Updates

### Update Inverter Pricing

```sql
-- In Supabase SQL Editor
UPDATE inverter_packages 
SET without_solar = '₦500,000', with_solar = '₦800,000'
WHERE name = '3.5KVA Inverter Package';
```

### Add New Service

```sql
INSERT INTO services (title, description) 
VALUES ('New Service', 'Description of new service');
```

### Update Project

```sql
UPDATE projects 
SET description = 'Updated description'
WHERE id = 1;
```

## Security Notes

1. **Change default password** - Current password is `admin123`
2. **Set up proper auth** - Implement Supabase Auth for production
3. **Use environment variables** - Never commit `.env.local` to git
4. **Enable RLS** - Already done in bootstrap script
5. **HTTPS only** - Vercel handles this automatically

## Troubleshooting

### Tables not showing?
- Re-run the bootstrap SQL script
- Check Supabase dashboard → Table Editor

### Changes not appearing?
- Check browser console for errors
- Verify `.env.local` has correct Supabase URL and key
- Restart dev server

### Can't login to admin?
- Password is case-sensitive: `admin123`
- Check browser console for errors

## Next Steps

1. ✅ Run bootstrap SQL script
2. ✅ Update `.env.local` with your anon key
3. ✅ Restart dev server
4. ✅ Test admin dashboard
5. ✅ Update content via Supabase dashboard
6. 🚀 Deploy to Vercel!

## Support

For Supabase questions: https://supabase.com/docs
For Next.js questions: https://nextjs.org/docs
