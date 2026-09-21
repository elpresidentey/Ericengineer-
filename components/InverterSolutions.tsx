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

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('inverter_packages')
        .select('*')
        .order('id');

      if (error) throw error;
      setPackages(data || []);
    } catch {
      setPackages([
        {
          id: 1,
          name: '3.5KVA',
          battery: '200AH Battery',
          without_solar: '₦450,000',
          with_solar: '₦750,000',
          featured: false,
        },
        {
          id: 2,
          name: '5KVA',
          battery: '220AH Battery',
          without_solar: '₦650,000',
          with_solar: '₦1,100,000',
          featured: true,
        },
        {
          id: 3,
          name: '7.5KVA',
          battery: '2 × 220AH Batteries',
          without_solar: '₦950,000',
          with_solar: '₦1,650,000',
          featured: false,
        },
        {
          id: 4,
          name: '10KVA',
          battery: '4 × 220AH Batteries',
          without_solar: '₦1,500,000',
          with_solar: '₦2,400,000',
          featured: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="inverter" className="section-padding bg-hover">
        <div className="section-container">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-10 h-10 border-2 border-border border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inverter" className="section-padding bg-hover">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="section-eyebrow">Power Solutions</span>
          <h2 className="section-title">Inverter Packages</h2>
          <p className="section-subtitle mx-auto">
            Premium inverter packages with professional installation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className={`relative bento-card p-6 flex flex-col hover:-translate-y-1 transition-all duration-300 ${
                pkg.featured ? 'border-2 border-primary shadow-md' : ''
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Popular
                </div>
              )}

              <div className="text-center mb-5">
                <h3 className="font-bold text-2xl text-primary mb-1">{pkg.name}</h3>
                <p className="text-xs text-muted">{pkg.battery}</p>
              </div>

              <div className="flex-1 space-y-3 mb-5">
                <div className="text-center">
                  <div className="text-[10px] font-medium text-muted uppercase tracking-wider mb-1">Without Solar</div>
                  <div className="text-xl font-bold text-primary">{pkg.without_solar}</div>
                </div>
                <div className="h-px bg-border" />
                <div className="text-center">
                  <div className="text-[10px] font-medium text-muted uppercase tracking-wider mb-1">With Solar</div>
                  <div className="text-xl font-bold text-accent">{pkg.with_solar}</div>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href="tel:08062284585"
                  className="block w-full text-center px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/2348062284585"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2.5 border border-border text-secondary rounded-xl text-sm font-medium hover:border-primary/20 hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-muted"
        >
          All packages include professional installation. Need a custom solution?{' '}
          <a href="tel:08062284585" className="text-primary font-medium hover:underline">
            Contact us
          </a>
        </motion.p>
      </div>
    </section>
  );
}
