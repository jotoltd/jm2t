import { motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import usePageTitle from '../hooks/usePageTitle';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  usePageTitle('Contact Us');
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100">
      <Header />

      {/* HERO */}
      <section className="relative bg-[#050507] pt-32 pb-20 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-400 font-mono text-xs font-bold tracking-[0.3em] uppercase">
            JM²TilingCo
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase mt-4 leading-tight"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-500">Touch</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-neutral-400 mt-6 text-lg max-w-xl mx-auto">
            Free quotations — no obligation. We'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      <div className="h-1 bg-cyan-400 shadow-[0_0_12px_rgba(77,238,255,0.7)]" />

      {/* MAIN CONTENT */}
      <section className="py-20 bg-[#09090b]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1px_1.4fr] gap-12 lg:gap-16">

            {/* LEFT — CONTACT INFO */}
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-3xl font-black text-white uppercase mb-6">Contact Details</h2>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: 'Phone', value: '07738 427208', href: 'tel:+4407738427208' },
                    { icon: Mail, label: 'Email', value: 'admin@jm2tilingco.com', href: 'mailto:admin@jm2tilingco.com' },
                    { icon: MapPin, label: 'Area', value: 'Surrey & West Sussex', href: null },
                    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 7am – 6pm', href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 bg-neutral-900 border border-white/10 p-4 hover:border-cyan-500/40 transition-all"
                    >
                      <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-white font-bold text-base hover:text-cyan-400 transition-colors">{value}</a>
                        ) : (
                          <p className="text-white font-bold text-base">{value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div>
                <h3 className="font-display text-xl font-black text-white uppercase mb-4">What To Expect</h3>
                <ul className="space-y-3">
                  {[
                    'Free no-obligation quotation',
                    'Response within 24 hours',
                    'Fully insured & qualified',
                    'Transparent pricing upfront',
                    'Clean & professional service',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-neutral-400 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/447738427208?text=Hi%2C%20I%27d%20like%20a%20free%20quote%20for%20tiling%20work."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-black font-black uppercase tracking-widest px-6 py-4 transition-all w-full justify-center shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Message on WhatsApp
              </a>
            </div>

            {/* DIVIDER */}
            <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(77,238,255,0.8)]" />

            {/* RIGHT — FORM */}
            <div>
              <h2 className="font-display text-3xl font-black text-white uppercase mb-6">Send An Enquiry</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cyan-500/10 border border-cyan-500/30 p-8 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <p className="text-white font-black text-xl uppercase">Message Sent!</p>
                  <p className="text-neutral-400 mt-2">We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 text-base placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_12px_rgba(77,238,255,0.2)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="07700 000000"
                        className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 text-base placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_12px_rgba(77,238,255,0.2)] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 text-base placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_12px_rgba(77,238,255,0.2)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Service Required</label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 text-base focus:outline-none focus:border-cyan-500 transition-all"
                    >
                      <option value="">Select a service...</option>
                      <option>Wall Tiling</option>
                      <option>Floor Tiling</option>
                      <option>Bathroom Tiling</option>
                      <option>Re-grouting & Repair</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Message / Project Details *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project, size, tile type, location..."
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 text-base placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_12px_rgba(77,238,255,0.2)] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest py-4 text-base transition-all shadow-[0_0_20px_rgba(77,238,255,0.3)] hover:shadow-[0_0_30px_rgba(77,238,255,0.6)] flex items-center justify-center gap-3"
                  >
                    <Send className="w-5 h-5" />
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <div className="h-1 bg-cyan-400 shadow-[0_0_12px_rgba(77,238,255,0.7)]" />

      <Footer hideEnquiry />
    </div>
  );
}
