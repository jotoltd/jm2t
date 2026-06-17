import { motion } from 'motion/react';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Send email to enquiries@jm2tilingco.com
    const subject = encodeURIComponent(`Contact Form: ${form.service || 'General'} - ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email}\n` +
      `Service: ${form.service}\n` +
      `Message: ${form.message}`
    );
    
    window.location.href = `mailto:enquiries@jm2tilingco.com?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0c0b0a] py-24 lg:py-32">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-white/[0.04]">
        <defs>
          <pattern id="tilegrid-contact" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="currentColor" strokeWidth="1"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tilegrid-contact)"></rect>
      </svg>
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#c9a84c]">
            <span className="h-px w-8 bg-[#c9a84c]/60"></span>
            Get In Touch
          </span>
          <h2 className="mt-5 font-display text-4xl text-[#f5f0e8] sm:text-5xl lg:text-6xl">
            Let's plan your project.
          </h2>
          <p className="mt-5 max-w-md text-white/55">
            Tell us what you have in mind and we'll arrange a free, no-obligation consultation. Prefer to talk it through? Give us a call.
          </p>
          <div className="mt-10 space-y-5">
            <a href="tel:+447738427208" className="group flex items-center gap-4 text-white/80 hover:text-[#c9a84c]">
              <span className="flex h-12 w-12 items-center justify-center border border-[#c9a84c]/40 text-[#c9a84c] transition-colors group-hover:bg-[#c9a84c] group-hover:text-[#0c0b0a]">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-white/40">Call</span>
                07738 427208
              </span>
            </a>
            <a href="mailto:enquiries@jm2tilingco.com" className="group flex items-center gap-4 text-white/80 hover:text-[#c9a84c]">
              <span className="flex h-12 w-12 items-center justify-center border border-[#c9a84c]/40 text-[#c9a84c] transition-colors group-hover:bg-[#c9a84c] group-hover:text-[#0c0b0a]">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-white/40">Email</span>
                Enquiries@jm2tilingco.com
              </span>
            </a>
          </div>
          <div className="mt-10 flex gap-3">
            <a href="https://www.instagram.com/jm2tilingco/" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-[#c9a84c] hover:text-[#c9a84c]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
                <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"></circle>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61589832512547" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-[#c9a84c] hover:text-[#c9a84c]">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"></path>
              </svg>
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-white/10 bg-[#101012]/80 p-8 backdrop-blur lg:p-10"
        >
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="w-8 h-px bg-[#c9a84c] mx-auto mb-6" />
              <p className="font-display text-2xl text-[#f5f0e8] mb-2">Thank you.</p>
              <p className="text-white/55 text-sm">We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-[0.18em] text-white/50">Full name</label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="John Smith"
                    className="w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/70 outline-none transition-colors focus:border-[#c9a84c]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs uppercase tracking-[0.18em] text-white/50">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="07738 000000"
                    className="w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/70 outline-none transition-colors focus:border-[#c9a84c]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-[0.18em] text-white/50">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="you@example.com"
                  className="w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/70 outline-none transition-colors focus:border-[#c9a84c]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="service" className="text-xs uppercase tracking-[0.18em] text-white/50">Service needed</label>
                <select
                  id="service"
                  required
                  value={form.service}
                  onChange={e => setForm({...form, service: e.target.value})}
                  className="w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-white outline-none transition-colors focus:border-[#c9a84c] cursor-pointer"
                >
                  <option value="">Select a service...</option>
                  <option value="Floor Tiling">Floor Tiling</option>
                  <option value="Bathroom Tiling">Bathroom Tiling</option>
                  <option value="Wall Tiling">Wall Tiling</option>
                  <option value="Re-grouting & Repair">Re-grouting & Repair</option>
                  <option value="Bespoke Tile Countertops">Bespoke Tile Countertops</option>
                  <option value="Renovation & Restoration">Renovation & Restoration</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-white/50">Your project</label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="Tell us about the room, tiles and timescale..."
                  className="w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/70 outline-none transition-colors focus:border-[#c9a84c] resize-none"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 bg-[#c9a84c] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-[#0c0b0a] transition-colors hover:bg-[#e2c97e]"
              >
                Request your free quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
