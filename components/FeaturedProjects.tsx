'use client';

import { motion } from 'framer-motion';

interface Project {
  title: string;
  category: string;
  description: string;
  year: string;
  span: string;
}

const projects: Project[] = [
  {
    title: 'ABB FIFA Nigeria 99 — National Stadium, Surulere',
    category: 'Government',
    description: 'Stadia rehabilitation and maintenance crew for FIFA Nigeria 99 at the National Stadium, Surulere, Lagos — part of ASEA Brown Boveri (ABB) power and infrastructure team.',
    year: '1999',
    span: 'md:col-span-2',
  },
  {
    title: 'AMA Greenfield Brewery — 9th Mile, Enugu',
    category: 'Industrial',
    description: 'Electrical installation and commissioning for Africa\'s largest brewery at Ameke, 9th Mile, Enugu State — AMA Greenfield project.',
    year: '2003',
    span: 'md:col-span-1',
  },
  {
    title: 'CBN Glass House — Head Office Complex, Abuja',
    category: 'Government',
    description: 'Complete electrical and automation systems for the Central Bank of Nigeria Glass House Head Office Complex, Abuja.',
    year: '2008',
    span: 'md:col-span-1',
  },
  {
    title: 'Lekki Residential Solar Installation',
    category: 'Solar',
    description: '10KVA solar and inverter system with full home automation for a luxury residence in Lekki, Lagos.',
    year: '2026',
    span: 'md:col-span-1',
  },
  {
    title: 'Industrial Complex Security Systems',
    category: 'Security',
    description: 'CCTV surveillance, fire alarm detection, and access control across 5 buildings for a major industrial client.',
    year: '2025',
    span: 'md:col-span-1',
  },
  {
    title: 'Government Road Construction & Street Lighting',
    category: 'Infrastructure',
    description: 'Road construction, drainage systems, and street lighting infrastructure for a federal government project.',
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
          <span className="section-eyebrow">500+ Projects Nationwide</span>
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
              className={`${project.span} bento-card p-6 group min-h-[200px] hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className="flex flex-col items-start space-y-2">
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
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
