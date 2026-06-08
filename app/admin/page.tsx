'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const adminCards = [
    {
      title: 'Services',
      description: 'Manage service offerings',
      href: '/admin/services',
      backInfo: 'Add, edit, or remove services. Update descriptions and pricing.',
      stats: '8 Services'
    },
    {
      title: 'Inverter Packages',
      description: 'Update pricing and packages',
      href: '/admin/inverters',
      backInfo: 'Configure inverter packages with custom pricing and features.',
      stats: '6 Packages'
    },
    {
      title: 'Projects',
      description: 'Add and edit projects',
      href: '/admin/projects',
      backInfo: 'Showcase completed projects with images and descriptions.',
      stats: '12 Projects'
    },
    {
      title: 'Testimonials',
      description: 'Manage client testimonials',
      href: '/admin/testimonials',
      backInfo: 'Add client reviews and ratings to build trust.',
      stats: '24 Reviews'
    },
    {
      title: 'Contact Info',
      description: 'Update contact details',
      href: '/admin/contact',
      backInfo: 'Update phone numbers, email, and business hours.',
      stats: 'Active'
    },
    {
      title: 'Hero Section',
      description: 'Edit hero text',
      href: '/admin/hero',
      backInfo: 'Customize the main banner text and call-to-action.',
      stats: 'Live'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password protection - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="bg-card rounded-xl p-8 shadow-lg border border-border max-w-md w-full">
          <h1 className="font-serif text-3xl font-bold mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="Enter admin password"
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-accent hover:text-accent/80 text-sm">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
              <Link href="/" className="text-accent hover:text-accent/80">
                View Website
              </Link>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-secondary hover:text-primary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/services" className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all">
            <h2 className="font-semibold text-2xl mb-3">Services</h2>
            <p className="text-secondary">Manage service offerings</p>
          </Link>
          
          <Link href="/admin/inverters" className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all">
            <h2 className="font-semibold text-2xl mb-3">Inverter Packages</h2>
            <p className="text-secondary">Update pricing and packages</p>
          </Link>
          
          <Link href="/admin/projects" className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all">
            <h2 className="font-semibold text-2xl mb-3">Projects</h2>
            <p className="text-secondary">Add and edit projects</p>
          </Link>
          
          <Link href="/admin/testimonials" className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all">
            <h2 className="font-semibold text-2xl mb-3">Testimonials</h2>
            <p className="text-secondary">Manage client testimonials</p>
          </Link>
          
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <h2 className="font-semibold text-2xl mb-3">Contact Info</h2>
            <p className="text-secondary">Update contact details</p>
          </div>
          
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <h2 className="font-semibold text-2xl mb-3">Hero Section</h2>
            <p className="text-secondary">Edit hero text</p>
          </div>
        </div>
        
        <div className="mt-12 bg-accent/10 border border-accent/20 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">Setup Instructions</h3>
          <p className="text-secondary mb-4">
            To enable full database functionality, please set up your Supabase database following the instructions in SUPABASE_SETUP.md
          </p>
          <ul className="list-disc list-inside text-secondary space-y-1">
            <li>Create a Supabase project</li>
            <li>Run the SQL commands to create tables</li>
            <li>Update your .env.local file with Supabase credentials</li>
            <li>Restart the development server</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
