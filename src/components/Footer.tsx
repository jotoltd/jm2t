import React, { useState } from 'react';
import { Mail, Phone, MapPin, Shield, Star, Calendar, Hammer, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ hideEnquiry = false }: { hideEnquiry?: boolean }) {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const inputClass = "w-full bg-black/30 border-b-2 border-white/20 text-white placeholder-neutral-600 px-0 py-3 focus:outline-none focus:border-cyan-400 transition-all duration-300 text-sm font-sans";

  return (
    <footer id="contact" className="bg-[#070709] border-t border-white/10 text-slate-300 relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 via-transparent to-transparent opacity-20 pointer-events-none" />

      {/* SERVICE ENQUIRY FORM */}
      {!hideEnquiry && <div className="border-b border-white/10 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-cyan-400 font-mono text-xs font-bold tracking-[0.3em] uppercase">Get In Touch</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase mt-2">Service Enquiry</h2>
            <p className="text-neutral-500 mt-3 text-sm">Fill in your details and we'll get back to you with a free quote.</p>
          </div>
          <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-10">
            {/* Contact Details */}
            <div className="flex flex-col gap-4 justify-center">
              <a href="tel:07738427208" className="flex items-center gap-4 border border-white/5 bg-neutral-900/50 p-4 hover:border-cyan-500 transition-all group">
                <div className="w-12 h-12 bg-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(77,238,255,0.4)]">
                  <Phone className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-mono">Call Us</p>
                  <p className="text-white font-black text-lg group-hover:text-cyan-400 transition-colors">07738 427208</p>
                </div>
              </a>
              <a href="mailto:Enquiries@jm2tilingco.com" className="flex items-center gap-4 border border-white/5 bg-neutral-900/50 p-4 hover:border-cyan-500 transition-all group">
                <div className="w-12 h-12 bg-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(77,238,255,0.4)]">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-mono">Email Us</p>
                  <p className="text-white font-black group-hover:text-cyan-400 transition-colors">Enquiries@jm2tilingco.com</p>
                </div>
              </a>
              <div className="flex items-center gap-4 border border-white/5 bg-neutral-900/50 p-4">
                <div className="w-12 h-12 bg-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(77,238,255,0.4)]">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-mono">Service Areas</p>
                  <p className="text-white font-black text-sm">Surrey & West Sussex</p>
                  <p className="text-neutral-500 text-xs mt-0.5">Crawley • Horsham • Reigate • Redhill • Haywards Heath • South London</p>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent self-stretch" />
            {/* Form */}
            <div>
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-8">
                  <div className="w-16 h-16 bg-cyan-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(77,238,255,0.5)]">
                    <Send className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-white uppercase">Enquiry Sent!</h3>
                  <p className="text-neutral-400 text-sm">We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">Your Name</label>
                      <input type="text" placeholder="John Smith" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">Phone</label>
                      <input type="tel" placeholder="07700 000000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">Email</label>
                    <input type="email" placeholder="you@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">Service Required</label>
                    <select required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className={inputClass + " bg-transparent cursor-pointer"}>
                      <option value="" disabled>Select a service...</option>
                      <option>Wall Tiling</option>
                      <option>Floor Tiling</option>
                      <option>Bespoke Tile Countertops</option>
                      <option>Tile Installation & Repair</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">Project Details</label>
                    <textarea placeholder="Tell us about your project..." rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className={inputClass + " resize-none"} />
                  </div>
                  <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-[0.2em] py-4 transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(77,238,255,0.3)] hover:shadow-[0_0_35px_rgba(77,238,255,0.5)]">
                    <Send className="w-4 h-4" /> Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full pt-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          
          {/* Brand/Slogan Side (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/trans_logo.png"
                alt="JM²TilingCo Logo"
                className="w-14 h-14 object-contain drop-shadow-[0_0_10px_rgba(77,238,255,0.5)]"
              />
              <span className="font-display text-lg font-black text-white tracking-widest uppercase">
                JM2<span className="text-cyan-400">TILINGCO</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed font-light">
              Professional wall and floor tiling services across Surrey and West Sussex. Specialising in porcelain, natural stone, and bespoke tile installations for residential and commercial projects since 2022.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
              <Star className="w-3.5 h-3.5 fill-cyan-400" />
              <span>Fully Insured & Qualified Tilers</span>
            </div>
          </div>

          {/* Quick links & Service Area (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-display text-sm font-bold tracking-wider uppercase text-white">
              Our Services
            </h4>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs text-slate-400 font-sans">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <Link to="/projects" className="hover:text-cyan-400 transition-colors">Our Projects</Link>
              <Link to="/wall-tiling" className="hover:text-cyan-400 transition-colors">Wall Tiling</Link>
              <Link to="/floor-tiling" className="hover:text-cyan-400 transition-colors">Floor Tiling</Link>
              <Link to="/bathroom-tiling" className="hover:text-cyan-400 transition-colors">Bathroom Tiling</Link>
              <Link to="/regrouting" className="hover:text-cyan-400 transition-colors">Re-grouting & Repair</Link>
              <a href="#contact" className="hover:text-white transition-colors">Bespoke Countertops</a>
              <Link to="/quote" className="hover:text-cyan-400 transition-colors">Get a Quote</Link>
              <span className="text-cyan-400 font-mono text-[10px] bg-cyan-950/40 border border-cyan-800/20 px-2 py-0.5 rounded-none w-fit uppercase">
                Surrey & West Sussex
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] text-zinc-550 font-mono block uppercase tracking-wider font-extrabold">
                Areas Covered:
              </span>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Crawley, Horsham, Haywards Heath, Reigate, Redhill, South London, Surrey &amp; West Sussex.
              </p>
            </div>
          </div>

          {/* Address & Direct Connection (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h4 className="font-display text-sm font-bold tracking-wider uppercase text-white">
              Get in Touch
            </h4>

            <div className="space-y-4">
              {/* Address */}
              <div
                className="flex items-start gap-3.5 text-xs text-slate-400 group"
              >
                <div className="p-2 bg-neutral-900 rounded-none group-hover:bg-neutral-800 transition-colors mt-0.5 border border-white/5 shrink-0">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-0.5">JM²TilingCo</h5>
                  <p>Serving Surrey & West Sussex</p>
                  <p>Available across Crawley, Horsham & surrounding areas</p>
                  <p className="text-cyan-400 text-[10px] font-mono mt-0.5">United Kingdom</p>
                </div>
              </div>

              {/* Telephone Contact */}
              <a 
                href="tel:+4407738427208" 
                className="flex items-center gap-3.5 text-xs text-slate-400 hover:text-white transition-colors group"
              >
                <div className="p-2 bg-neutral-900 rounded-none group-hover:bg-neutral-800 transition-colors border border-white/5 shrink-0">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="text-zinc-500 text-[9px] uppercase font-mono block">Call Now</span>
                  <a href="tel:+4407738427208" className="font-bold text-white font-mono hover:text-cyan-400 transition-colors">07738 427208</a>
                </div>
              </a>

              {/* Email Connection */}
              <a 
                href="mailto:Enquiries@jm2tilingco.com" 
                className="flex items-center gap-3.5 text-xs text-slate-400 hover:text-white transition-colors group"
              >
                <div className="p-2 bg-neutral-900 rounded-none group-hover:bg-neutral-800 transition-colors border border-white/5 shrink-0">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="text-zinc-500 text-[9px] uppercase font-mono block">Email Us</span>
                  <span className="font-bold text-white font-mono">Enquiries@jm2tilingco.com</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-4 text-center md:text-left">
            <span>&copy; {currentYear} JM²TilingCo. All rights reserved.</span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span className="flex items-center gap-1 justify-center">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-zinc-650">Surrey & West Sussex</span>
            <span className="px-2.5 py-1 bg-neutral-900 rounded-none border border-white/10 text-[10.5px] text-cyan-400 font-mono tracking-wider font-extrabold uppercase">
              Your Trusted Tiling Partner
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

