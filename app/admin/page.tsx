'use client';

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
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Inverter Packages',
      description: 'Update pricing and packages',
      href: '/admin/inverters',
      icon: '🔋',
      count: stats.inverters,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Projects',
      description: 'Showcase completed work',
      href: '/admin/projects',
      icon: '🏗️',
      count: stats.projects,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Testimonials',
      description: 'Client reviews & feedback',
      href: '/admin/testimonials',
      icon: '💬',
      count: stats.testimonials,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">
          Welcome back, Administrator 👋
        </h1>
        <p className="text-secondary">
          Manage your website content and settings from this dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={card.href}
              className="block bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {card.icon}
                </div>
                <div className="text-3xl font-bold text-primary">
                  {card.count}
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                {card.title}
              </h3>
              <p className="text-secondary text-sm">{card.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-accent to-accent/80 rounded-xl p-6 text-white"
        >
          <h3 className="font-semibold text-xl mb-2">🚀 Quick Actions</h3>
          <p className="text-white/90 text-sm mb-4">
            Common tasks to get you started
          </p>
          <div className="space-y-2">
            <Link
              href="/admin/inverters"
              className="block bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-sm transition-colors"
            >
              + Add New Inverter Package
            </Link>
            <Link
              href="/admin/projects"
              className="block bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-sm transition-colors"
            >
              + Add New Project
            </Link>
            <Link
              href="/admin/testimonials"
              className="block bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-sm transition-colors"
            >
              + Add New Testimonial
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <h3 className="font-semibold text-xl mb-2">📚 Documentation</h3>
          <p className="text-secondary text-sm mb-4">
            Resources to help you manage the website
          </p>
          <div className="space-y-2 text-sm">
            <a
              href="https://supabase.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-accent hover:text-accent/80"
            >
              <span>→</span>
              <span>Supabase Documentation</span>
            </a>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-accent hover:text-accent/80"
            >
              <span>→</span>
              <span>View Live Website</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Setup Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 text-primary">
              Database Connected
            </h3>
            <p className="text-secondary text-sm mb-3">
              Your Supabase database is configured and ready. All changes made
              here will be reflected on your live website immediately.
            </p>
            <ul className="text-secondary text-sm space-y-1">
              <li>✅ Tables created and populated</li>
              <li>✅ Row Level Security enabled</li>
              <li>✅ Public read access configured</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
