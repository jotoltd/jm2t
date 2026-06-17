import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full bg-neutral-950 border-b-2 border-white/20 text-white placeholder-neutral-600 px-0 py-3 focus:outline-none focus:border-cyan-400 transition-all duration-300 text-base font-sans";

  return (
    <section id="contact" className="py-24 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-mono text-xs font-bold tracking-[0.3em] uppercase">Get In Touch</span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase mt-3">
            Service Enquiry
          </h2>
          <p className="text-neutral-500 mt-4 text-sm max-w-lg mx-auto tracking-wide">
            Fill in your details and we'll get back to you with a free quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-16 lg:gap-12">

          {/* LEFT — CONTACT DETAILS */}
          <div className="flex flex-col gap-5 justify-center">
            <a href="tel:07738427208" className="flex items-center gap-5 border border-white/5 bg-neutral-900/50 p-5 hover:border-cyan-500 hover:bg-neutral-900 hover:shadow-[0_0_20px_rgba(77,238,255,0.1)] transition-all group">
              <div className="w-14 h-14 bg-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(77,238,255,0.4)]">
                <Phone className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-mono">Call Us</p>
                <p className="text-white font-black text-xl mt-0.5 group-hover:text-cyan-400 transition-colors tracking-wide">07738 427208</p>
              </div>
            </a>

            <a href="mailto:enquiries@jm2tilingco.com" className="flex items-center gap-5 border border-white/5 bg-neutral-900/50 p-5 hover:border-cyan-500 hover:bg-neutral-900 hover:shadow-[0_0_20px_rgba(77,238,255,0.1)] transition-all group">
              <div className="w-14 h-14 bg-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(77,238,255,0.4)]">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-mono">Email Us</p>
                <p className="text-white font-black mt-0.5 group-hover:text-cyan-400 transition-colors">enquiries@jm2tilingco.com</p>
              </div>
            </a>

            <div className="flex items-center gap-5 border border-white/5 bg-neutral-900/50 p-5">
              <div className="w-14 h-14 bg-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(77,238,255,0.4)]">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-mono">Service Areas</p>
                <p className="text-white font-black mt-0.5">Surrey & West Sussex</p>
                <p className="text-neutral-500 text-xs mt-1 leading-relaxed">Crawley • Horsham • Reigate • Redhill<br />Haywards Heath • South London</p>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent self-stretch" />

          {/* RIGHT — FORM */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-6 py-12"
              >
                <div className="w-20 h-20 bg-cyan-500 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(77,238,255,0.6)]">
                  <Send className="w-9 h-9 text-black" />
                </div>
                <h3 className="font-display text-3xl font-black text-white uppercase">Enquiry Sent!</h3>
                <p className="text-neutral-400">Thank you! We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-7"
              >
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">Your Name</label>
                    <input type="text" name="name" placeholder="John Smith" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">Phone Number</label>
                    <input type="tel" name="phone" placeholder="07700 000000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">Email Address</label>
                  <input type="email" name="email" placeholder="you@example.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">Service Required</label>
                  <select name="service" required value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} className={inputClass + " bg-neutral-950 cursor-pointer"}>
                    <option value="" disabled>Select a service...</option>
                    <option>Wall Tiling</option>
                    <option>Floor Tiling</option>
                    <option>Bespoke Tile Countertops</option>
                    <option>Tile Installation & Repair</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">Project Details</label>
                  <textarea name="message" placeholder="Tell us about your project, room size, tile preference..." rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className={inputClass + " resize-none"} />
                </div>

                <button type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-[0.2em] px-8 py-5 transition-all duration-300 flex items-center justify-center gap-3 text-sm shadow-[0_0_20px_rgba(77,238,255,0.3)] hover:shadow-[0_0_35px_rgba(77,238,255,0.5)]"
                >
                  <Send className="w-4 h-4" />
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
