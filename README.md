# Eric Electrical Tech Website

A premium, modern website for Eric Ohiol Engineering showcasing electrical engineering services, inverter solutions, and project portfolio.

## Features

- 🎨 Premium modern design with custom color palette
- 📱 Mobile-first responsive layout
- ⚡ Fast performance with Next.js 15
- 🎭 Smooth animations with Framer Motion
- 🔒 Secure admin dashboard for content management
- 🗄️ Supabase backend for dynamic content
- 📞 Direct call and WhatsApp integration
- 🎯 SEO optimized

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Database**: Supabase
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (for database features)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the Supabase database by following instructions in `SUPABASE_SETUP.md`

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Dashboard

Access the admin dashboard at `/admin` with the default password: `admin123`

**Important**: Change the default password in production by implementing proper authentication with Supabase Auth.

### Admin Features

- Manage services
- Update inverter pricing
- Add/edit projects
- Manage testimonials
- Update contact information
- Edit hero section

## Project Structure

```
eric-electrical-tech/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── InverterSolutions.tsx
│   └── ...
├── lib/
│   └── supabase.ts     # Supabase client
├── types/
│   └── database.ts     # TypeScript types
└── public/             # Static assets
```

## Color Palette

- Background: `#F7F5F2`
- Card: `#FFFFFF`
- Primary Text: `#111111`
- Secondary Text: `#666666`
- Accent: `#C79A63`
- Border: `#E7E2DA`
- Hover: `#EFE9E2`

## Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## Contact Integration

The website includes direct integration for:
- Phone calls: `tel:08062284585`
- WhatsApp: `https://wa.me/2348062284585`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
npm run build
```

## Performance

The website is optimized for:
- Fast loading times
- Mobile performance
- SEO
- Accessibility

Target Lighthouse scores: 90+

## Security Notes

- Change default admin password
- Implement proper authentication with Supabase Auth
- Set up Row Level Security (RLS) policies in Supabase
- Use environment variables for sensitive data
- Enable HTTPS in production

## License

© 2026 Eric Ohiol Engineering. All rights reserved.

## Support

For support or inquiries:
- Phone: 0806 228 4585
- Email: info@ericohiol.com
- WhatsApp: [Message Us](https://wa.me/2348062284585)
