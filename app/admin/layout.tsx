'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { LogoIcon } from '@/components/Logo';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Services', href: '/admin/services', icon: '⚡' },
  { name: 'Inverters', href: '/admin/inverters', icon: '🔋' },
  { name: 'Projects', href: '/admin/projects', icon: '🏗️' },
  { name: 'Testimonials', href: '/admin/testimonials', icon: '💬' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't wrap login page
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-card to-card/95 border-r border-border/80 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-border/50">
            <motion.div className="flex items-center gap-3" whileHover={{ x: 4 }}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center flex-shrink-0 shadow-lg">
                <LogoIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-primary leading-tight">
                  Eric Admin
                </h2>
                <p className="text-xs text-secondary mt-0.5">Control Panel</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {navigation.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 relative group ${
                      isActive
                        ? 'bg-gradient-to-r from-accent to-accent/90 text-white shadow-lg'
                        : 'text-secondary hover:text-primary hover:bg-background'
                    }`}
                  >
                    <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/50 space-y-2">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-4 py-2.5 text-secondary hover:text-primary hover:bg-background rounded-lg transition-all"
              >
                <span>🌐</span>
                <span className="text-sm font-medium">View Website</span>
              </Link>
            </motion.div>
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium group"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="group-hover:rotate-180 transition-transform duration-300">🚪</span>
              <span className="text-sm">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border/50"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-background transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-lg font-semibold text-primary lg:hidden">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-4 px-4 py-2 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-white font-semibold shadow-md">
                  A
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary leading-tight">Administrator</p>
                  <p className="text-xs text-secondary">admin@eric.com</p>
                </div>
              </div>

              {/* Mobile user icon */}
              <div className="sm:hidden w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page content */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
