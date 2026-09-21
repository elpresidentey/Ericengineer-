'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Engr. Michael Adebayo',
    position: 'Facility Manager, Lagos State Government',
    message: 'Eric Ohiol delivered exceptional work on our government facility electrical installations. Professional, reliable, and high quality.',
    initials: 'MA',
  },
  {
    name: 'Mrs. Chioma Okonkwo',
    position: 'Homeowner, Lekki',
    message: 'The solar installation exceeded our expectations. No more power issues and the team was professional throughout.',
    initials: 'CO',
  },
  {
    name: 'Mr. Ibrahim Yusuf',
    position: 'Operations Director, Manufacturing Company',
    message: 'Outstanding automation and security systems. The CCTV and fire alarm have greatly improved our facility safety.',
    initials: 'IY',
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

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bento-card p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  {testimonial.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-primary truncate">{testimonial.name}</div>
                  <div className="text-xs text-muted leading-snug">{testimonial.position}</div>
                </div>
              </div>

              <p className="text-secondary text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.message}&rdquo;
              </p>

              <div className="flex items-center gap-0.5 mt-5 pt-4 border-t border-border">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.218 4.324a1 1 0 001.168 0l4.032-2.29a1 1 0 00.424-1.301l-2.352-3.662a1 1 0 00-1.025-.86l-2.352 3.662a1 1 0 00-.424 1.301l4.032 2.29a1 1 0 001.168 0l1.218-4.324a1 1 0 00-.363-1.118l-3.976-2.888a1 1 0 00-.588-1.81h-4.915a1 1 0 00-.95-.69l-1.519-4.674z" />
                  </svg>
                ))}
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
