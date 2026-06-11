'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const heroSlides = [
  {
    title: 'Solar & Inverter Systems',
    subtitle: 'Premium installations with warranty',
    image: '/images/solar-panels.jpg',
  },
  {
    title: 'Electrical Installation',
    subtitle: 'Professional certified solutions',
    image: '/images/electrician.jpg',
  },
  {
    title: 'Power Infrastructure',
    subtitle: 'Industrial & commercial projects',
    image: '/images/power-lines.jpg',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-5">
              <span className="section-eyebrow inline-block px-3 py-1.5 bg-accent-muted rounded-full">
                30+ Years of Excellence
              </span>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-[4.25rem] text-primary leading-[1.02]">
                Eric Ohiol
              </h1>

              <p className="text-lg md:text-xl text-secondary font-medium">
                Electrical Engineering Professional
              </p>

              <p className="text-base text-muted leading-relaxed max-w-md">
                Premium electrical, solar, and security solutions for government,
                corporate, and residential clients across Nigeria.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#services"
                className="px-6 py-3.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors overflow-hidden relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View Services</span>
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity" />
              </motion.a>
              <motion.a
                href="tel:08062284585"
                className="px-6 py-3.5 bg-card text-primary border border-border rounded-xl text-sm font-medium hover:border-primary/30 transition-colors overflow-hidden relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Call Now</span>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />
              </motion.a>
              <motion.a
                href="https://wa.me/2348062284585"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-accent border border-accent/30 rounded-xl text-sm font-medium hover:bg-accent-muted transition-colors overflow-hidden relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">WhatsApp</span>
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity" />
              </motion.a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
              {[
                { value: '150+', label: 'Projects' },
                { value: '30+', label: 'Years' },
                { value: '100%', label: 'Quality' },
              ].map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                >
                  <motion.div 
                    className="text-2xl md:text-3xl font-semibold text-primary"
                    whileHover={{ scale: 1.1, color: '#C17A2E' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-muted mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bento grid: 3 cols × 2 rows — hero spans left 2 cols, side cards stack right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[340px] sm:h-[400px] lg:h-[460px]">
              {/* Main carousel — 2 cols × 2 rows */}
              <div className="col-span-2 row-span-2 relative bento-card rounded-3xl">
                {heroSlides.map((slide, index) => (
                  <motion.div
                    key={slide.title}
                    initial={false}
                    animate={{ opacity: currentSlide === index ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    {!imageError ? (
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/80 to-accent/60" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <h3 className="text-white font-semibold text-lg md:text-xl mb-1">{slide.title}</h3>
                      <p className="text-white/80 text-sm">{slide.subtitle}</p>
                      <div className="flex gap-1.5 mt-4">
                        {heroSlides.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1 rounded-full transition-all ${
                              currentSlide === idx ? 'w-6 bg-white' : 'w-3 bg-white/40'
                            }`}
                            aria-label={`View slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Side bento tiles */}
              <motion.div 
                className="rounded-2xl bg-primary p-6 flex flex-col justify-between group hover:bg-primary/95 transition-colors border-2 border-primary overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
                
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-accent/30 flex items-center justify-center mb-4 relative z-10 group-hover:bg-accent/50 transition-colors"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </motion.div>
                <div className="relative z-10">
                  <div className="text-white font-bold text-xl group-hover:text-accent transition-colors">Solar</div>
                  <div className="text-white/80 text-sm mt-2 group-hover:text-white/90 transition-colors">Installation</div>
                </div>
              </motion.div>

              <motion.div 
                className="rounded-2xl bg-accent p-6 flex flex-col justify-between group hover:bg-accent/90 transition-colors border-2 border-accent overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4 relative z-10 group-hover:bg-white/30 transition-colors"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </motion.div>
                <div className="relative z-10">
                  <div className="text-white font-bold text-xl group-hover:text-white transition-colors">Security</div>
                  <div className="text-white text-sm mt-2 group-hover:text-white/90 transition-colors">Systems</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
