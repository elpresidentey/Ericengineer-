# Deployment Guide

## Windows Build Issue

There's a known issue with Next.js 16.2.7 and Turbopack on some Windows systems. The build fails because Turbopack native bindings aren't loading properly.

### Solutions:

#### Option 1: Deploy to Vercel (Recommended)
The easiest solution is to deploy directly to Vercel, which handles the build process:

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

Vercel's build environment will compile the project successfully.

#### Option 2: Downgrade Next.js
If you need to build locally on Windows:

```bash
npm install next@15.1.5
npm run build
```

Next.js 15.x has better Windows compatibility.

#### Option 3: Use WSL (Windows Subsystem for Linux)
Build the project inside WSL:

```bash
wsl
cd /mnt/c/Users/hp/eric engineer/eric-electrical-tech
npm run build
```

#### Option 4: Build in Docker
Use Docker to build in a Linux environment:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Vercel Deployment Steps

1. **Prepare Your Repository**
   ```bash
   cd eric-electrical-tech
   git init
   git add .
   git commit -m "Initial commit: Eric Ohiol Engineering website"
   ```

2. **Push to GitHub**
   ```bash
   gh repo create eric-electrical-tech --public --source=. --remote=origin --push
   ```
   Or create manually on GitHub and push.

3. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Next.js
     - Build Command: `next build`
     - Output Directory: `.next`
   - Add Environment Variables
   - Click Deploy

4. **Configure Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

## Environment Variables

Add these in Vercel dashboard or `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Post-Deployment

1. Set up Supabase database using `SUPABASE_SETUP.md`
2. Test admin login at `your-domain.com/admin`
3. Change default admin password
4. Add your content through the admin dashboard

## Performance Optimization

After deployment, verify:
- ✅ Images are optimized
- ✅ Fonts are loading properly
- ✅ Mobile responsiveness
- ✅ Page load speed
- ✅ SEO meta tags
- ✅ WhatsApp/Call links work

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Check Supabase connection
4. Review browser console for errors
