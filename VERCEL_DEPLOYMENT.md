# 🚀 Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

Your build is working! Here's how to successfully deploy to Vercel:

### 1. Fix Package.json Scripts

The `--webpack` flag is not needed and can cause issues. Update your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 2. Environment Variables in Vercel

You MUST add these environment variables in Vercel:

**Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Add these:**
```
NEXT_PUBLIC_SUPABASE_URL=https://toztgbqkmnghiavdynjs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**Important:** Replace `your_actual_anon_key_here` with your real key from Supabase!

### 3. Get Your Supabase Keys

1. Go to: https://toztgbqkmnghiavdynjs.supabase.co
2. Click **Settings** → **API**
3. Copy your **anon public** key
4. Paste it in Vercel as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Common Deployment Issues & Fixes

#### Issue 1: Build Fails on Vercel (Works Locally)
**Cause:** Missing environment variables
**Fix:** Add all `NEXT_PUBLIC_*` variables in Vercel settings

#### Issue 2: "outputFileTracingRoot" Warning
**Cause:** Multiple lockfiles detected
**Fix:** Add to `next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: undefined, // Let Next.js auto-detect
};

export default nextConfig;
```

#### Issue 3: TypeScript Errors in Production
**Cause:** Strict TypeScript checking
**Fix:** Your TypeScript compiles fine! No issues here.

#### Issue 4: Admin Pages Not Working After Deploy
**Cause:** sessionStorage + server-side rendering
**Fix:** Already handled with 'use client' directives

## 📋 Step-by-Step Deployment

### Option A: Deploy via Git (Recommended)

1. **Initialize Git (if not done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click **Deploy**

4. **Add Environment Variables**
   - Before deploying, add environment variables
   - Or add them after first deploy and redeploy

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

## 🔧 Post-Deployment Configuration

### 1. Verify Environment Variables

In Vercel Dashboard:
- Go to **Settings** → **Environment Variables**
- Ensure both variables are set for **Production, Preview, and Development**

### 2. Test Your Deployment

Visit your deployed URL and test:
- ✅ Homepage loads
- ✅ Services section displays
- ✅ Inverter packages show
- ✅ Admin login works (`/admin`)
- ✅ Admin CRUD operations work

### 3. Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

## 🐛 Troubleshooting

### "Build Failed" Error

**Check Build Logs:**
1. Go to Vercel Dashboard → Deployments
2. Click on failed deployment
3. View logs to see exact error

**Common Fixes:**
- Missing environment variables → Add them in Settings
- TypeScript errors → Run `npm run build` locally to debug
- Dependency issues → Delete `node_modules` and reinstall

### "Cannot Read Environment Variables"

**Symptoms:** Admin pages can't connect to Supabase

**Fix:**
1. Verify variables start with `NEXT_PUBLIC_`
2. Redeploy after adding variables
3. Hard refresh browser (Ctrl+Shift+R)

### Admin Login Not Working

**Symptoms:** Can't login to `/admin`

**Possible Causes:**
1. sessionStorage not available (rare)
2. JavaScript disabled in browser
3. Need to refresh after deployment

**Fix:**
- Clear browser cache
- Try incognito/private window
- Check browser console for errors

### Supabase Connection Errors

**Symptoms:** "Error loading [content]" messages

**Fix:**
1. Check Supabase is not paused (free tier pauses after inactivity)
2. Verify RLS policies allow public read access
3. Check network tab for API errors
4. Verify environment variables are correct

## 📝 Vercel Configuration File (Optional)

Create `vercel.json` in root:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

## 🎯 Production Checklist

Before going live:

### Security
- [ ] Change admin password from default `admin123`
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Check Supabase RLS policies are correct
- [ ] Ensure no sensitive data in code

### Performance
- [ ] Test page load speeds
- [ ] Check mobile responsiveness
- [ ] Verify images load correctly
- [ ] Test all admin CRUD operations

### Content
- [ ] Update all placeholder content
- [ ] Add real services
- [ ] Add actual inverter packages with pricing
- [ ] Add completed projects
- [ ] Add genuine testimonials

### SEO (Future Enhancement)
- [ ] Add meta descriptions
- [ ] Add Open Graph tags
- [ ] Submit sitemap to Google
- [ ] Set up analytics

## 🔄 Continuous Deployment

Once connected to Git:

1. **Make Changes Locally**
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

2. **Vercel Auto-Deploys**
   - Detects push to main branch
   - Runs build
   - Deploys automatically
   - No manual steps needed!

3. **Preview Deployments**
   - Every push to any branch gets a preview URL
   - Test before merging to production
   - Share preview with clients

## 📞 Support Resources

### Vercel Docs
- https://vercel.com/docs
- https://vercel.com/docs/deployments/troubleshoot

### Next.js Deployment
- https://nextjs.org/docs/deployment

### Supabase
- https://supabase.com/docs

## 🎉 Success Indicators

Your deployment is successful when:

1. ✅ Build completes without errors
2. ✅ Site loads at your Vercel URL
3. ✅ All content displays correctly
4. ✅ Admin panel accessible at `/admin`
5. ✅ Can create/edit content in admin
6. ✅ Changes reflect on public site immediately

---

**Need Help?** Check the build logs in Vercel Dashboard for specific error messages.

**Current Status:** Your local build works perfectly! ✅
**Next Step:** Follow Option A or B above to deploy.
