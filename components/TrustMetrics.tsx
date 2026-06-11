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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-card border-2 border-border rounded-2xl p-6 hover:border-accent/30 hover:shadow-lg transition-all group overflow-hidden relative cursor-pointer"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 to-transparent" />
              
              {/* Animated top border */}
              <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-accent transition-all duration-500" />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-4xl font-bold text-primary mb-3 group-hover:text-accent transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {metric.value}
                </motion.div>
                <div className="text-sm font-medium text-secondary leading-snug group-hover:text-foreground transition-colors">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
