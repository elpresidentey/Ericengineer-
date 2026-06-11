'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section id="projects" className="section-padding bg-hover" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="section-eyebrow">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`${project.span} bento-card p-6 group min-h-[180px] cursor-pointer overflow-hidden relative`}
            >
              {/* Animated border gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
              
              {/* Gradient accent line */}
              <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent to-transparent transition-all duration-500" />
              
              <div className="relative z-10">
                <motion.span 
                  className="inline-block text-[10px] font-semibold uppercase text-accent bg-accent-muted px-2 py-0.5 rounded mb-3 group-hover:bg-accent group-hover:text-white transition-colors duration-300" 
                  style={{ letterSpacing: '0.06em' }}
                  whileHover={{ scale: 1.05 }}
                >
                  {project.category}
                </motion.span>

                <motion.h3 
                  className="font-semibold text-base md:text-lg text-primary mb-2 group-hover:text-accent transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {project.title}
                </motion.h3>

                <p className="text-secondary text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <motion.div 
                  className="text-xs text-muted font-medium"
                  whileHover={{ x: 2 }}
                >
                  {project.year}
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
