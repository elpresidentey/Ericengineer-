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
}

const services: Service[] = [
  {
    title: 'Electrical Installation',
    description: 'Complete electrical solutions for residential, commercial, and industrial properties.',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    fullDescription: 'Our electrical installation services cover everything from basic wiring to complex industrial setups. We handle residential homes, commercial buildings, and large-scale industrial facilities. All installations are done by certified electricians following international safety standards.',
    features: ['Certified Installations', 'Safety Compliance', 'Full Documentation', '24/7 Support', 'Warranty Included'],
  },
  {
    title: 'Solar & Inverter Systems',
    description: 'Premium solar panels and inverter installations with warranty and maintenance.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Transform your energy consumption with our premium solar and inverter solutions. We design custom systems tailored to your power needs, from small residential setups to large commercial installations.',
    features: ['Custom System Design', 'Premium Components', 'Professional Installation', 'Maintenance Support', '5-Year Warranty'],
  },
  {
    title: 'CCTV & Security',
    description: 'Advanced surveillance systems with remote monitoring capabilities.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Protect your property with state-of-the-art CCTV and security systems. We install high-definition cameras with night vision, motion detection, and remote monitoring capabilities.',
    features: ['HD Cameras', 'Night Vision', 'Remote Monitoring', 'Motion Detection', 'Mobile App Access'],
  },
  {
    title: 'Fire Alarm Systems',
    description: 'Professional fire detection and alarm systems compliant with safety regulations.',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Ensure the safety of your property and occupants with our comprehensive fire alarm systems. We install smoke detectors, heat sensors, manual call points, and alarm panels that meet all safety regulations.',
    features: ['Smoke & Heat Detection', 'Manual Call Points', 'Regulatory Compliance', 'Emergency Integration', 'Regular Maintenance'],
  },
  {
    title: 'Automation Systems',
    description: 'Smart building automation and industrial control systems.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Modernize your facility with intelligent automation systems. From smart lighting and climate control to complex industrial process automation.',
    features: ['Smart Lighting', 'Climate Control', 'Industrial Automation', 'Energy Management', 'Remote Control'],
  },
  {
    title: 'Gas Suppression',
    description: 'Advanced fire suppression systems using clean agents.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Protect sensitive equipment and valuable assets with clean agent fire suppression systems. Ideal for data centers, server rooms, and archives.',
    features: ['Clean Agent Technology', 'No Residue', 'Equipment Protection', 'Automatic Detection', 'Environmentally Safe'],
  },
  {
    title: 'Facility Management',
    description: 'Comprehensive facility management including maintenance and repairs.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Keep your facilities running smoothly with our comprehensive management services. We handle preventive maintenance, emergency repairs, and system upgrades.',
    features: ['Preventive Maintenance', 'Emergency Response', 'System Optimization', 'Regular Inspections', 'Cost Reduction'],
  },
  {
    title: 'Road Construction',
    description: 'Professional road construction and infrastructure development.',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    fullDescription: 'Quality road construction and infrastructure development for government and private projects including drainage systems and street lighting.',
    features: ['Complete Construction', 'Drainage Systems', 'Street Lighting', 'Quality Surfacing', 'Project Management'],
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
                  <h3 className="font-semibold text-lg md:text-xl text-primary mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-muted group-hover:text-accent transition-colors">
                  <span>View details</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="fixed inset-0 bg-primary/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-t-3xl sm:rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-start mb-5">
                <h3 className="font-serif text-2xl md:text-3xl text-primary pr-4">{selectedService.title}</h3>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="p-1 text-muted hover:text-primary transition-colors shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-secondary text-sm leading-relaxed mb-6">
                {selectedService.fullDescription}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase text-muted mb-3" style={{ letterSpacing: '0.06em' }}>Key Features</h4>
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
                  className="flex-1 text-center py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/2348062284585"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 border border-border text-primary rounded-xl text-sm font-medium hover:border-primary/30 transition-colors"
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
