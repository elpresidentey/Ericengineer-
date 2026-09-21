'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Service {
  title: string;
  description: string;
  colSpan: string;
  rowSpan: string;
  fullDescription: string;
  features: string[];
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: 'Electrical Installation',
    description: 'Complete electrical solutions for residential, commercial, and industrial properties.',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    fullDescription: 'Our electrical installation services cover everything from basic wiring to complex industrial setups. We handle residential homes, commercial buildings, and large-scale industrial facilities. All installations are done by certified electricians following international safety standards.',
    features: ['Certified Installations', 'Safety Compliance', 'Full Documentation', '24/7 Support', 'Warranty Included'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Solar & Inverter Systems',
    description: 'Premium solar panels and inverter installations with warranty and maintenance.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Transform your energy consumption with our premium solar and inverter solutions. We design custom systems tailored to your power needs, from small residential setups to large commercial installations.',
    features: ['Custom System Design', 'Premium Components', 'Professional Installation', 'Maintenance Support', '5-Year Warranty'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'CCTV & Security',
    description: 'Advanced surveillance systems with remote monitoring capabilities.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Protect your property with state-of-the-art CCTV and security systems. We install high-definition cameras with night vision, motion detection, and remote monitoring capabilities.',
    features: ['HD Cameras', 'Night Vision', 'Remote Monitoring', 'Motion Detection', 'Mobile App Access'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: 'Fire Alarm Systems',
    description: 'Professional fire detection and alarm systems compliant with safety regulations.',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Ensure the safety of your property and occupants with our comprehensive fire alarm systems. We install smoke detectors, heat sensors, manual call points, and alarm panels that meet all safety regulations.',
    features: ['Smoke & Heat Detection', 'Manual Call Points', 'Regulatory Compliance', 'Emergency Integration', 'Regular Maintenance'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    title: 'Automation Systems',
    description: 'Smart building automation and industrial control systems.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Modernize your facility with intelligent automation systems. From smart lighting and climate control to complex industrial process automation.',
    features: ['Smart Lighting', 'Climate Control', 'Industrial Automation', 'Energy Management', 'Remote Control'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Gas Suppression',
    description: 'Advanced fire suppression systems using clean agents.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Protect sensitive equipment and valuable assets with clean agent fire suppression systems. Ideal for data centers, server rooms, and archives.',
    features: ['Clean Agent Technology', 'No Residue', 'Equipment Protection', 'Automatic Detection', 'Environmentally Safe'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Facility Management',
    description: 'Comprehensive facility management including maintenance and repairs.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Keep your facilities running smoothly with our comprehensive management services. We handle preventive maintenance, emergency repairs, and system upgrades.',
    features: ['Preventive Maintenance', 'Emergency Response', 'System Optimization', 'Regular Inspections', 'Cost Reduction'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 3v18" />
      </svg>
    ),
  },
  {
    title: 'Road Construction',
    description: 'Professional road construction and infrastructure development.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Quality road construction and infrastructure development for government and private projects including drainage systems and street lighting.',
    features: ['Complete Construction', 'Drainage Systems', 'Street Lighting', 'Quality Surfacing', 'Project Management'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <section id="services" className="section-padding bg-hover">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <span className="section-eyebrow">What We Do</span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Professional engineering solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4 auto-rows-[200px]">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className={`${service.colSpan} ${service.rowSpan} bento-card p-6 flex flex-col justify-between group cursor-pointer`}
                onClick={() => setSelectedService(service)}
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-accent-muted text-accent flex items-center justify-center mb-3">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-primary mb-1.5 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-muted group-hover:text-accent transition-colors">
                  <span>View details</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-t-3xl sm:rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-muted text-accent flex items-center justify-center shrink-0">
                    {selectedService.icon}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-primary">{selectedService.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 rounded-full bg-hover flex items-center justify-center text-muted hover:text-primary transition-colors shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-secondary text-sm leading-relaxed mb-6">
                {selectedService.fullDescription}
              </p>

              <div className="mb-6">
                <h4 className="text-[11px] font-semibold uppercase text-muted mb-3 tracking-wider">Key Features</h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-secondary">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <a
                  href="tel:08062284585"
                  className="flex-1 text-center py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/2348062284585"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 border border-border text-secondary rounded-xl text-sm font-medium hover:border-primary/20 hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
