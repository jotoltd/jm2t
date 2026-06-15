import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ hideEnquiry = false }: { hideEnquiry?: boolean }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <footer className="bg-[#111110] border-t border-white/5">
      {!hideEnquiry && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Get in touch</p>
              <h2 className="font-display text-4xl sm:text-5xl text-[#f5f0e8] mb-6">
                Let's plan your<br /><em className="italic">project.</em>
              </h2>
              <p className="text-[#a8a39a] text-base leading-relaxed mb-8 max-w-sm">
                Tell us what you have in mind and we'll arrange a free, no-obligation consultation. Prefer to talk it through? Give us a call.
              </p>
              <div className="space-y-4">
                <a href="tel:+4407738427208" className="flex items-center gap-3 text-[#d6d3cc] hover:text-[#c9a84c] transition-colors">
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
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Name</label>
                      <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#3a3730]" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Phone</label>
                      <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#3a3730]" placeholder="07700 000000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#3a3730]" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Message</label>
                    <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none placeholder-[#3a3730]" placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] text-xs font-semibold tracking-widest uppercase transition-all duration-300">
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/trans_logo.png" alt="JM2 Tiling Co" className="h-10 w-auto opacity-80" />
            <p className="text-[#6b6560] text-xs font-mono">Your trusted tiling partner — tiling across Surrey &amp; West Sussex since 2022.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {([['Services', '/'], ['Projects', '/projects'], ['Quote', '/quote'], ['Contact', '/contact']] as [string, string][]).map(([label, href]) => (
              <Link key={href} to={href} className="text-xs text-[#6b6560] hover:text-[#c9a84c] transition-colors uppercase tracking-wider font-mono">{label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

