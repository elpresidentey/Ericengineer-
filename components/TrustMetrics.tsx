'use client';

import { motion } from 'framer-motion';

const metrics = [
  {
    label: 'Projects Completed',
    value: '150+',
  },
  {
    label: 'Years Experience',
    value: '30+',
  },
  {
    label: 'Sector Experience',
    value: 'Gov & Private',
  },
  {
    label: 'Specialization',
    value: 'Solar & Electrical',
  },
];

export default function TrustMetrics() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bg-card border-2 border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-lg transition-all"
            >
              <div className="text-4xl font-bold text-primary mb-3">{metric.value}</div>
              <div className="text-sm font-medium text-secondary leading-snug">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
