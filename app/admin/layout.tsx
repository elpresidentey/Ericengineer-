'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { LogoIcon } from '@/components/Logo';

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
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <LogoIcon className="h-10 w-10 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-xl font-bold text-primary leading-tight">
                  Eric Electrical
                </h2>
                <p className="text-xs text-secondary mt-0.5">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-secondary hover:bg-background hover:text-primary'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-secondary hover:text-primary transition-colors"
            >
              <span>🌐</span>
              <span className="text-sm">View Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <span>🚪</span>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-background"
            >
              <svg
                className="w-6 h-6"
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
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-lg font-semibold text-primary lg:hidden">
                Admin
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-primary">Administrator</p>
                <p className="text-xs text-secondary">admin@eric.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
