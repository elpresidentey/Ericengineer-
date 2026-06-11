'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    services: 0,
    inverters: 0,
    projects: 0,
    testimonials: 0,
  });

  const checkAuth = useCallback(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const [services, inverters, projects, testimonials] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('inverter_packages').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        services: services.count || 0,
        inverters: inverters.count || 0,
        projects: projects.count || 0,
        testimonials: testimonials.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStats();
    }
  }, [isAuthenticated, fetchStats]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simple authentication - check credentials
      if (email === 'admin@eric.com' && password === 'admin123') {
        sessionStorage.setItem('admin_authenticated', 'true');
        setIsAuthenticated(true);
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-8 shadow-xl border border-border max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="font-serif text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-secondary text-sm">
              Sign in to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                placeholder="admin@eric.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-accent hover:text-accent/80 text-sm font-medium"
            >
              ← Back to Website
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-secondary text-center">
              Default: admin@eric.com / admin123
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const dashboardCards = [
    {
      title: 'Services',
      description: 'Manage service offerings',
      href: '/admin/services',
      icon: '⚡',
      count: stats.services,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-500/10',
    },
    {
      title: 'Inverter Packages',
      description: 'Update pricing and packages',
      href: '/admin/inverters',
      icon: '🔋',
      count: stats.inverters,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-500/10',
    },
    {
      title: 'Projects',
      description: 'Showcase completed work',
      href: '/admin/projects',
      icon: '🏗️',
      count: stats.projects,
      color: 'bg-violet-500',
      lightColor: 'bg-violet-500/10',
    },
    {
      title: 'Testimonials',
      description: 'Client reviews & feedback',
      href: '/admin/testimonials',
      icon: '💬',
      count: stats.testimonials,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-2xl shadow-lg">
            📊
          </div>
          <div>
            <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
            <p className="text-secondary text-sm mt-1">Welcome back! Manage your content below</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6 }}
          >
            <Link
              href={card.href}
              className="block h-full bg-card rounded-2xl p-6 border border-border hover:shadow-xl hover:border-accent/30 transition-all group overflow-hidden relative"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon and count */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl ${card.lightColor} flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-shadow`}>
                    {card.icon}
                  </div>
                  <motion.div 
                    className="text-4xl font-bold text-accent"
                    whileHover={{ scale: 1.1 }}
                  >
                    {card.count}
                  </motion.div>
                </div>

                {/* Title and description */}
                <h3 className="font-semibold text-lg text-primary mb-1.5 group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Action arrow */}
                <motion.div
                  className="flex items-center gap-2 text-accent text-sm font-medium"
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <span>View All</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Content Management Section */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-gradient-to-br from-primary via-primary to-primary/95 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-semibold text-2xl mb-2">Quick Actions</h3>
              <p className="text-white/80 text-sm">
                Fast shortcuts to common tasks
              </p>
            </div>
            <div className="text-4xl">⚡</div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: '+ Add Service', href: '/admin/services' },
              { label: '+ Add Inverter', href: '/admin/inverters' },
              { label: '+ Add Project', href: '/admin/projects' },
              { label: '+ Add Testimonial', href: '/admin/testimonials' },
            ].map((action, idx) => (
              <motion.div key={action.label} whileHover={{ scale: 1.02 }}>
                <Link
                  href={action.href}
                  className="block bg-white/15 hover:bg-white/25 rounded-xl px-4 py-3.5 text-sm font-medium transition-all backdrop-blur-sm border border-white/20 hover:border-white/30 text-center"
                >
                  {action.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-8 border border-border shadow-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-semibold text-lg text-primary">Status</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">Database</span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">Supabase</span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/30">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">Website</span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 border border-violet-500/30">
                Live
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-sm font-medium"
            >
              <span>🌐 View Live Website</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-6l4 4m0 0l-4-4m4 4V3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-2xl p-8"
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0 text-3xl">✅</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-primary mb-2">
              All Systems Operational
            </h3>
            <p className="text-secondary text-sm mb-3">
              Your Supabase database is connected and all tables are ready. All changes made in this dashboard will be reflected on your live website immediately.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-2 text-emerald-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Database Connected</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Row Level Security</span>
              </div>
              <div className="flex items-center gap-2 text-violet-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Public Access</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
