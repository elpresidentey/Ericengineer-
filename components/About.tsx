'use client';

import { motion } from 'framer-motion';

const credentials = [
  {
    title: 'Electrical Engineering',
    description: 'Complete installations for residential, commercial, and industrial facilities',
  },
  {
    title: 'Solar Installation',
    description: 'Premium solar and inverter systems with professional support',
  },
  {
    title: 'Fire & Security Systems',
    description: 'Advanced fire alarm and CCTV solutions for complete protection',
  },
  {
    title: 'Automation & Control',
    description: 'Smart automation for modern facilities and industrial processes',
  },
  {
    title: 'Facility Management',
    description: 'Comprehensive facility management and maintenance services',
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <span className="section-eyebrow">Who We Are</span>
          <h2 className="section-title">About Eric Ohiol Engineering</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            <p className="text-secondary leading-relaxed">
              With over 30 years of experience in electrical engineering, Eric Ohiol has established
              a reputation for delivering exceptional solutions across Nigeria.
            </p>
            <p className="text-secondary leading-relaxed">
              Our expertise spans government projects, corporate installations, and residential services —
              consistently delivering quality that exceeds expectations.
            </p>
            <p className="text-secondary leading-relaxed">
              From complex industrial automation to residential solar installations, we bring
              professional excellence to every project.
            </p>
          </motion.div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-3">
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bento-card p-5 ${index === 0 ? 'sm:col-span-2' : ''}`}
              >
                <h3 className="font-semibold text-sm text-primary mb-1.5">{credential.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{credential.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
