'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Engr. Michael Adebayo',
    position: 'Facility Manager, Lagos State Government',
    message: 'Eric Ohiol delivered exceptional work on our government facility electrical installations. Professional, reliable, and high quality.',
  },
  {
    name: 'Mrs. Chioma Okonkwo',
    position: 'Homeowner, Lekki',
    message: 'The solar installation exceeded our expectations. No more power issues and the team was professional throughout.',
  },
  {
    name: 'Mr. Ibrahim Yusuf',
    position: 'Operations Director, Manufacturing Company',
    message: 'Outstanding automation and security systems. The CCTV and fire alarm have greatly improved our facility safety.',
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="section-eyebrow">Client Voices</span>
          <h2 className="section-title">Testimonials</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bento-card p-6 flex flex-col group cursor-pointer overflow-hidden relative"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 to-transparent" />
              
              {/* Animated top accent line */}
              <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent to-transparent transition-all duration-500" />
              
              <div className="relative z-10">
                <p className="text-secondary text-sm leading-relaxed flex-1 mb-5 group-hover:text-foreground transition-colors">
                  &ldquo;{testimonial.message}&rdquo;
                </p>

                <footer>
                  <motion.div 
                    className="font-semibold text-sm text-primary group-hover:text-accent transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {testimonial.name}
                  </motion.div>
                  <div className="text-xs text-muted mt-0.5 group-hover:text-secondary transition-colors">{testimonial.position}</div>
                </footer>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
