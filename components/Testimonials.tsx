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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bento-card p-6 flex flex-col"
            >
              <p className="text-secondary text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{testimonial.message}&rdquo;
              </p>

              <footer>
                <div className="font-semibold text-sm text-primary">{testimonial.name}</div>
                <div className="text-xs text-muted mt-0.5">{testimonial.position}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
