'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Package {
  id: number;
  name: string;
  battery: string;
  without_solar: string;
  with_solar: string;
  featured: boolean;
}

export default function InverterSolutions() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    const defaultPackages = [
      {
        id: 1,
        name: '3.5KVA Inverter Package',
        battery: '200AH Battery',
        without_solar: '₦450,000',
        with_solar: '₦750,000',
        featured: false,
      },
      {
        id: 2,
        name: '5KVA Inverter Package',
        battery: '220AH Battery',
        without_solar: '₦650,000',
        with_solar: '₦1,100,000',
        featured: true,
      },
      {
        id: 3,
        name: '7.5KVA Inverter Package',
        battery: '2 × 220AH Batteries',
        without_solar: '₦950,000',
        with_solar: '₦1,650,000',
        featured: false,
      },
      {
        id: 4,
        name: '10KVA Inverter Package',
        battery: '4 × 220AH Batteries',
        without_solar: '₦1,500,000',
        with_solar: '₦2,400,000',
        featured: false,
      },
    ];

    try {
      // Try to fetch from Supabase only if configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.log('Supabase not configured, using default packages');
        setPackages(defaultPackages);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('inverter_packages')
        .select('*')
        .order('id');

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        throw error;
      }

      if (data && data.length > 0) {
        console.log('Packages fetched from Supabase');
        setPackages(data);
      } else {
        console.log('No packages found in database, using defaults');
        setPackages(defaultPackages);
      }
      
      setLoading(false);
    } catch (err: unknown) {
      console.error('Error fetching packages:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      // Use fallback packages
      setPackages(defaultPackages);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <section id="inverter" className="py-20 px-4 bg-hover">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary">Loading packages...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inverter" className="py-20 px-4 bg-hover">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Inverter Solutions
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-secondary text-lg mb-16 max-w-2xl mx-auto"
        >
          Premium inverter packages with professional installation
        </motion.p>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ Using cached prices. Database error: {error}
            </p>
          </div>
        )}
        
        {/* Premium Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative h-full rounded-3xl overflow-hidden group transition-all duration-300 ${
                pkg.featured 
                  ? 'bg-gradient-to-br from-primary via-primary to-primary/95 shadow-2xl ring-2 ring-accent' 
                  : 'bg-card border-2 border-border shadow-md hover:shadow-xl'
              }`}
            >
              {/* Background gradient overlay for non-featured */}
              {!pkg.featured && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
              )}
              
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-accent text-primary text-xs font-bold px-5 py-1.5 rounded-full shadow-lg"
                  >
                    MOST POPULAR
                  </motion.div>
                </div>
              )}
              
              <div className={`relative z-10 p-8 h-full flex flex-col ${pkg.featured ? 'text-white' : ''}`}>
                {/* Power Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`inline-flex items-center gap-2 mb-6 w-fit px-4 py-2 rounded-xl ${
                    pkg.featured 
                      ? 'bg-white/20 text-white' 
                      : 'bg-accent/10 text-accent'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                  <span className="text-xs font-semibold">{pkg.name.split('KVA')[0].trim()}KVA</span>
                </motion.div>
                
                {/* Title */}
                <h3 className={`text-2xl font-bold mb-2 ${pkg.featured ? 'text-white' : 'text-primary'}`}>
                  {pkg.name.replace(' Inverter Package', '')}
                </h3>
                
                {/* Battery spec */}
                <p className={`text-sm mb-6 ${pkg.featured ? 'text-white/80' : 'text-secondary'}`}>
                  {pkg.battery}
                </p>
                
                {/* Pricing Section */}
                <div className="flex-1">
                  <div className={`mb-6 pb-6 border-b ${pkg.featured ? 'border-white/20' : 'border-border'}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${pkg.featured ? 'text-white/70' : 'text-muted'}`}>
                      Without Solar
                    </div>
                    <motion.div 
                      className={`text-3xl font-bold ${pkg.featured ? 'text-white' : 'text-primary'}`}
                      whileHover={{ scale: 1.08 }}
                    >
                      {pkg.without_solar}
                    </motion.div>
                  </div>
                  
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${pkg.featured ? 'text-white/70' : 'text-muted'}`}>
                      With Solar
                    </div>
                    <motion.div 
                      className={`text-3xl font-bold ${pkg.featured ? 'text-white' : 'text-accent'}`}
                      whileHover={{ scale: 1.08 }}
                    >
                      {pkg.with_solar}
                    </motion.div>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="space-y-3 mt-8">
                  <motion.a
                    href="tel:08062284585"
                    className={`block w-full text-center px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden relative group/btn ${
                      pkg.featured
                        ? 'bg-white text-primary hover:bg-accent hover:text-white'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Call Now</span>
                    <div className={`absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity bg-white`} />
                  </motion.a>
                  
                  <motion.a
                    href="https://wa.me/2348062284585"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 border-2 ${
                      pkg.featured
                        ? 'border-white text-white hover:bg-white hover:text-primary'
                        : 'border-accent text-accent hover:bg-accent hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>WhatsApp</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-secondary max-w-2xl mx-auto"
        >
          <p className="text-sm">
            All packages include professional installation. Need a custom solution? 
            <a href="tel:08062284585" className="text-primary font-semibold hover:underline ml-1">
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
