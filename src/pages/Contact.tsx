import { motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import usePageTitle from '../hooks/usePageTitle';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function Contact() {
  usePageTitle('Contact Us');
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Save to Supabase database
    const { error } = await supabase.from('submissions').insert({
      type: 'contact',
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      message: form.message,
      status: 'new'
    });
    
    if (error) {
      console.error('Error saving submission:', error);
    }
    
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0b0a]">
      <Header />

      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Get In Touch</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#f5f0e8] font-medium leading-tight mb-6">
              Let's plan your<br /><em className="italic">project.</em>
            </h1>
            <p className="text-[#a8a39a] text-lg max-w-xl leading-relaxed">Free quotations — no obligation. We'll get back to you within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0b0a]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16">

            <div className="space-y-10">
              <div className="space-y-4">
                {[
                  { icon: Phone, label: 'Call', value: '07738 427208', href: 'tel:+4407738427208' },
                  { icon: Mail, label: 'Email', value: 'Enquiries@jm2tilingco.com', href: 'mailto:Enquiries@jm2tilingco.com' },
                  { icon: MapPin, label: 'Area', value: 'Surrey & West Sussex', href: null },
                  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 7am – 6pm', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.div key={label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <Icon className="w-4 h-4 text-[#c9a84c] shrink-0" />
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-[#d6d3cc] text-sm hover:text-[#c9a84c] transition-colors">{value}</a>
                      ) : (
                        <p className="text-[#d6d3cc] text-sm">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <p className="text-[#c9a84c] text-xs font-mono tracking-widest uppercase mb-4">What To Expect</p>
                <div className="space-y-3">
                  {['Free no-obligation quotation', 'Response within 24 hours', 'Fully insured & qualified', 'Transparent pricing upfront', 'Clean & professional service'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-[#a8a39a] text-sm">
                      <span className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0" />{item}
                    </div>
                  ))}
                </div>
              </div>

              <a href="https://wa.me/447738427208?text=Hi%2C%20I%27d%20like%20a%20free%20quote%20for%20tiling%20work."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-[#c9a84c]/30 hover:border-[#c9a84c] text-[#c9a84c] text-xs font-mono tracking-widest uppercase px-6 py-4 transition-all w-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Message on WhatsApp
              </a>
            </div>

            <div>
              <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-6">Send An Enquiry</p>
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border border-white/10 p-12 text-center">
                  <div className="w-8 h-px bg-[#c9a84c] mx-auto mb-6" />
                  <p className="font-display text-2xl text-[#f5f0e8] mb-2">Thank you.</p>
                  <p className="text-[#a8a39a] text-sm">We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Full Name</label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#3a3730]" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Phone</label>
                      <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#3a3730]" placeholder="07700 000000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Email Address</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors placeholder-[#3a3730]" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6b6560] mb-2">Service Needed</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors cursor-pointer">
                      <option value="">Select a service...</option>
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
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#1a1917] border border-white/10 text-[#f5f0e8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none placeholder-[#3a3730]"
                      placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] text-xs font-semibold tracking-widest uppercase transition-all">
                    Request Your Free Quote
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer hideEnquiry />
    </div>
  );
}
