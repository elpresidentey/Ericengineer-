'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding bg-hover">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <span className="section-eyebrow">Reach Out</span>
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bento-card p-6 md:p-8 space-y-6 group hover:shadow-lg transition-shadow"
          >
            <div>
              <motion.h3 
                className="font-semibold text-primary mb-4 group-hover:text-accent transition-colors"
                whileHover={{ x: 4 }}
              >
                Contact Information
              </motion.h3>
              <div className="space-y-4">
                {[
                  { label: 'Phone', value: '0806 228 4585', href: 'tel:08062284585' },
                  { label: 'Email', value: 'ericonline@rocketmail.com', href: 'mailto:ericonline@rocketmail.com' },
                  { label: 'WhatsApp', value: 'Message on WhatsApp', href: 'https://wa.me/2348062284585' },
                ].map((item, idx) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="text-xs text-muted mb-0.5">{item.label}</div>
                    <motion.a
                      href={item.href}
                      target={item.label === 'WhatsApp' ? '_blank' : undefined}
                      rel={item.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                      className="text-sm font-medium text-primary hover:text-accent transition-colors inline-block group relative"
                      whileHover={{ x: 4 }}
                    >
                      {item.value}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                      />
                    </motion.a>
                  </motion.div>
                ))}
                <div>
                  <div className="text-xs text-muted mb-0.5">Coverage</div>
                  <div className="text-sm font-medium text-primary">Lagos & Nationwide</div>
                </div>
              </div>
            </div>

            <motion.a
              href="https://wa.me/2348062284585"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors overflow-hidden relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="relative z-10">Chat on WhatsApp</span>
              <motion.div 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
              />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-3 bento-card p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label htmlFor="name" className="block text-xs font-medium text-muted mb-1.5">
                  Full Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-accent transition-all"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label htmlFor="phone" className="block text-xs font-medium text-muted mb-1.5">
                  Phone Number
                </label>
                <motion.input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-accent transition-all"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="message" className="block text-xs font-medium text-muted mb-1.5">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-accent transition-all resize-none"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-all overflow-hidden relative group disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
