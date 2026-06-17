import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContentImage } from '../hooks/useContentImage';

function LogoImage({ className }: { className?: string }) {
  const { imageUrl } = useContentImage('logo_icon', '/images/logo_icon.png');
  return <img src={imageUrl} alt="JM2 TilingCo" className={className} />;
}

export default function Footer({ hideEnquiry = false }: { hideEnquiry?: boolean }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <footer className="bg-[#111110] border-t border-white/5">
      {!hideEnquiry && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Get In Touch</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[#f5f0e8] mb-6">
                Let's plan your<br /><em className="italic">project.</em>
              </h2>
              <p className="text-[#a8a39a] text-base leading-relaxed mb-8 max-w-sm">
                Tell us what you have in mind and we'll arrange a free, no-obligation consultation. Prefer to talk it through? Give us a call.
              </p>
              <div className="space-y-4">
                <a href="tel:+447738427208" className="flex items-center gap-3 text-[#d6d3cc] hover:text-[#c9a84c] transition-colors">
                  <Phone className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-0.5">Call</p>
                    <p className="text-sm font-medium">07738 427208</p>
                  </div>
                </a>
                <a href="mailto:Enquiries@jm2tilingco.com" className="flex items-center gap-3 text-[#d6d3cc] hover:text-[#c9a84c] transition-colors">
                  <Mail className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-0.5">Email</p>
                    <p className="text-sm font-medium">Enquiries@jm2tilingco.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-[#d6d3cc]">
                  <MapPin className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-0.5">Area</p>
                    <p className="text-sm font-medium">Surrey &amp; West Sussex</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="h-full flex items-center justify-center border border-white/10 p-12 text-center">
                  <div>
                    <div className="w-8 h-px bg-[#c9a84c] mx-auto mb-6" />
                    <p className="font-display text-2xl text-[#f5f0e8] mb-2">Thank you.</p>
                    <p className="text-[#a8a39a] text-sm">We'll be in touch within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Full Name</label>
                      <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#3a3730]" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Phone</label>
                      <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#3a3730]" placeholder="07700 000000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Email Address</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#3a3730]" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Service Needed</label>
                    <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors cursor-pointer">
                      <option value="" disabled>Select a service...</option>
                      <option>Floor Tiling</option>
                      <option>Wall Tiling</option>
                      <option>Bathroom Tiling</option>
                      <option>Re-grouting &amp; Repair</option>
                      <option>Bespoke Tile Countertops</option>
                      <option>Renovation &amp; Restoration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Your Project</label>
                    <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none placeholder-[#3a3730]" placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] text-xs font-semibold tracking-widest uppercase transition-all duration-300">
                    Request Your Free Quote
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="border-t border-white/5 bg-[#0c0b0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <LogoImage className="h-12 w-auto mb-4" />
              <p className="text-sm text-white/50 leading-relaxed">
                Your trusted tiling partner — tiling across Surrey &amp; West Sussex since 2022.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.instagram.com/jm2tilingco/" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-[#c9a84c]/40 text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#0c0b0a]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
                    <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                    <circle cx="12" cy="12" r="4"></circle>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"></circle>
                  </svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61589832512547" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center border border-[#c9a84c]/40 text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#0c0b0a]">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-display text-lg text-[#c9a84c] mb-4">Services</h4>
              <ul className="space-y-2">
                <li><Link to="/floor-tiling" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Floor Tiling</Link></li>
                <li><Link to="/wall-tiling" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Wall Tiling</Link></li>
                <li><Link to="/bathroom-tiling" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Bathroom Tiling</Link></li>
                <li><Link to="/regrouting" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Re-grouting &amp; Repair</Link></li>
                <li><Link to="/quote" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Bespoke Countertops</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-display text-lg text-[#c9a84c] mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/projects" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Projects</Link></li>
                <li><Link to="/quote" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Get a Quote</Link></li>
                <li><Link to="/contact" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Contact</Link></li>
                <li><a href="/#process" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Our Process</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-display text-lg text-[#c9a84c] mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
                  <div>
                    <a href="tel:+447738427208" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">07738 427208</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
                  <div>
                    <a href="mailto:Enquiries@jm2tilingco.com" className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors">Enquiries@jm2tilingco.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-sm text-white/50">Surrey &amp; West Sussex</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2026 JM2 TilingCo. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-xs text-white/30 hover:text-[#c9a84c] transition-colors">Privacy Policy</Link>
              <Link to="/" className="text-xs text-white/30 hover:text-[#c9a84c] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

