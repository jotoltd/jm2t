import { motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import usePageTitle from '../hooks/usePageTitle';
import { CheckCircle2, Send, Phone, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function Quote() {
  usePageTitle('Free Quote');
  console.log('Quote page loaded!');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', area: '', description: '', timeline: '', budget: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Save to Supabase database
    const { error } = await supabase.from('submissions').insert({
      type: 'quote',
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      area: form.area,
      description: form.description,
      timeline: form.timeline,
      budget: form.budget,
      status: 'new'
    });
    
    if (error) {
      console.error('Error saving submission:', error);
    }
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          to: 'enquiries@jm2tilingco.com',
          subject: `Quote Request: ${form.service || 'General'} - ${form.name}`,
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to send quote request');
      }
    } catch (error) {
      // Fallback to mailto if API fails
      const subject = encodeURIComponent(`Quote Request: ${form.service || 'General'} - ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\n` +
        `Phone: ${form.phone}\n` +
        `Email: ${form.email}\n` +
        `Service: ${form.service}\n` +
        `Area: ${form.area} m²\n` +
        `Description: ${form.description}\n` +
        `Timeline: ${form.timeline}\n` +
        `Budget: ${form.budget}`
      );
      
      window.location.href = `mailto:enquiries@jm2tilingco.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0b0a] font-sans text-[#f5f0e8]">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* HERO */}
      <section className="relative bg-[#0a0a0c] pt-32 pb-20 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#c9a84c] font-mono text-xs font-bold tracking-[0.3em] uppercase">
            JM² Tiling Co
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-[#f5f0e8] uppercase mt-4 leading-tight"
          >
            Free <span className="text-[#c9a84c]">Quote</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/55 mt-6 text-lg max-w-xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours — no obligation.
          </motion.p>
        </div>
      </section>

      <div className="h-1 bg-[#c9a84c] shadow-[0_0_12px_rgba(201,168,76,0.5)]" />

      <section className="py-20 bg-[#0c0b0a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1.6fr] gap-10 lg:gap-16">

            {/* LEFT — WHY GET A QUOTE */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-black text-[#f5f0e8] uppercase mb-5">What's Included</h2>
                <ul className="space-y-3">
                  {[
                    'Full site assessment if needed',
                    'Transparent itemised pricing',
                    'No hidden costs or surprises',
                    'Material & labour breakdown',
                    'Honest project timeline',
                    'Free advice on tile choices',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70">
                      <CheckCircle2 className="w-5 h-5 text-[#c9a84c] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-white/10" />

              <div className="space-y-3">
                <h3 className="font-display text-lg font-black text-[#f5f0e8] uppercase">Prefer to call?</h3>
                <a href="tel:07738427208" className="flex items-center gap-3 bg-[#101012] border border-white/10 p-4 hover:border-[#c9a84c]/50 transition-all group">
                  <div className="w-10 h-10 bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Call us</p>
                    <p className="text-white font-bold group-hover:text-[#c9a84c] transition-colors">07738 427208</p>
                  </div>
                </a>
                <a href="mailto:admin@jm2tilingco.com" className="flex items-center gap-3 bg-[#101012] border border-white/10 p-4 hover:border-[#c9a84c]/50 transition-all group">
                  <div className="w-10 h-10 bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Email us</p>
                    <p className="text-white font-bold text-sm group-hover:text-[#c9a84c] transition-colors">admin@jm2tilingco.com</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/447738427208?text=Hi%2C%20I%27d%20like%20a%20free%20quote%20for%20tiling%20work."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 p-4 hover:border-[#25D366] transition-all group"
                >
                  <div className="w-10 h-10 bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">WhatsApp</p>
                    <p className="text-[#25D366] font-bold group-hover:text-green-300 transition-colors">Message us directly</p>
                  </div>
                </a>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent shadow-[0_0_8px_rgba(201,168,76,0.5)]" />

            {/* RIGHT — FORM */}
            <div>
              <h2 className="font-display text-2xl font-black text-[#f5f0e8] uppercase mb-6">Project Details</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 p-10 text-center"
                >
                  <CheckCircle2 className="w-14 h-14 text-[#c9a84c] mx-auto mb-4" />
                  <p className="text-white font-black text-2xl uppercase">Quote Request Sent!</p>
                  <p className="text-white/55 mt-3">We'll be in touch within 24 hours with your free quote.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Full Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Smith" className="w-full bg-[#101012] border border-white/10 text-white px-4 py-3 text-base placeholder-white/40 focus:outline-none focus:border-[#c9a84c] focus:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Phone *</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="07700 000000" className="w-full bg-[#101012] border border-white/10 text-white px-4 py-3 text-base placeholder-white/40 focus:outline-none focus:border-[#c9a84c] focus:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@example.com" className="w-full bg-[#101012] border border-white/10 text-white px-4 py-3 text-base placeholder-white/40 focus:outline-none focus:border-[#c9a84c] focus:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Service Required *</label>
                      <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full bg-[#101012] border border-white/10 text-white px-4 py-3 text-base focus:outline-none focus:border-[#c9a84c] transition-all">
                        <option value="">Select...</option>
                        <option>Wall Tiling</option>
                        <option>Floor Tiling</option>
                        <option>Bathroom Tiling</option>
                        <option>Re-grouting & Repair</option>
                        <option>Multiple Services</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Approx. Area (m²)</label>
                      <input type="text" value={form.area} onChange={e => setForm({...form, area: e.target.value})} placeholder="e.g. 10m²" className="w-full bg-[#101012] border border-white/10 text-white px-4 py-3 text-base placeholder-white/40 focus:outline-none focus:border-[#c9a84c] focus:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Ideal Start Date</label>
                      <input type="text" value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})} placeholder="e.g. ASAP / August" className="w-full bg-[#101012] border border-white/10 text-white px-4 py-3 text-base placeholder-white/40 focus:outline-none focus:border-[#c9a84c] focus:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Budget (optional)</label>
                      <input type="text" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} placeholder="e.g. £500 – £1000" className="w-full bg-[#101012] border border-white/10 text-white px-4 py-3 text-base placeholder-white/40 focus:outline-none focus:border-[#c9a84c] focus:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Project Description *</label>
                    <textarea required rows={5} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe your project — room type, tile style, any specific requirements..." className="w-full bg-[#101012] border border-white/10 text-white px-4 py-3 text-base placeholder-white/40 focus:outline-none focus:border-[#c9a84c] focus:shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-all resize-none" />
                  </div>

                  <button type="submit" className="w-full bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] font-black uppercase tracking-widest py-4 text-base transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_35px_rgba(201,168,76,0.5)] flex items-center justify-center gap-3">
                    <Send className="w-5 h-5" />
                    Request Free Quote
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-[#c9a84c] shadow-[0_0_12px_rgba(201,168,76,0.5)]" />
      <Footer hideEnquiry={true} />
    </div>
  );
}
