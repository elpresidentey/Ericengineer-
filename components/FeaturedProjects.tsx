'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Lagos State Government Building',
    category: 'Government',
    description: 'Complete electrical installation and automation for a state government facility',
    year: '2025',
    span: 'md:col-span-2',
  },
  {
    title: 'Industrial Complex Security',
    category: 'Security',
    description: 'CCTV surveillance and fire alarm across 5 buildings',
    year: '2025',
    span: 'md:col-span-1',
  },
  {
    title: 'Lekki Residential Solar',
    category: 'Solar',
    description: '10KVA solar and inverter system with home automation',
    year: '2026',
    span: 'md:col-span-1',
  },
  {
    title: 'Corporate Office Facility',
    category: 'Facility Mgmt',
    description: 'Ongoing facility management for corporate headquarters',
    year: '2026',
    span: 'md:col-span-1',
  },
  {
    title: 'Gas Suppression System',
    category: 'Fire Safety',
    description: 'Clean agent fire suppression for data center protection',
    year: '2025',
    span: 'md:col-span-1',
  },
  {
    title: 'Road Construction Project',
    category: 'Infrastructure',
    description: 'Road construction and street lighting for government project',
    year: '2024',
    span: 'md:col-span-2',
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section-padding bg-hover">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <span className="section-eyebrow">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className={`${project.span} bento-card p-6 group min-h-[180px]`}
            >
              <span className="inline-block text-[10px] font-semibold uppercase text-accent bg-accent-muted px-2 py-0.5 rounded mb-3" style={{ letterSpacing: '0.06em' }}>
                {project.category}
              </span>

              <h3 className="font-semibold text-base md:text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>

              <p className="text-secondary text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="text-xs text-muted">{project.year}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
