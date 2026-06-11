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
        
        {/* Simple Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-card rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                pkg.featured ? 'border-primary shadow-lg' : 'border-border shadow-sm'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  POPULAR
                </div>
              )}
              
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="font-bold text-3xl text-primary mb-2">
                  {pkg.name.replace(' Inverter Package', '')}
                </h3>
                <p className="text-secondary text-sm">{pkg.battery}</p>
              </div>
              
              {/* Pricing */}
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <div className="text-xs text-secondary mb-1 uppercase tracking-wide">Without Solar</div>
                  <div className="text-2xl font-bold text-primary">{pkg.without_solar}</div>
                </div>
                
                <div className="h-px bg-border"></div>
                
                <div className="text-center">
                  <div className="text-xs text-secondary mb-1 uppercase tracking-wide">With Solar</div>
                  <div className="text-2xl font-bold text-primary">{pkg.with_solar}</div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="space-y-2">
                <a
                  href="tel:08062284585"
                  className="block w-full text-center px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/2348062284585"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2.5 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors text-sm"
                >
                  WhatsApp
                </a>
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
