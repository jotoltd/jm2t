import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePageTitle from '../hooks/usePageTitle';

const offers = [
  'Full bathroom renovations',
  'Shower enclosure tiling',
  'Feature wall installation',
  'Porcelain & ceramic tiles',
  'Natural stone installation',
  'Large-format tile fitting',
  'Waterproofing & tanking',
  'Grout & seal finishing',
  'Bespoke niche & recess work',
];

export default function BathroomTiling() {
  usePageTitle('Bathroom Tiling');
  return (
    <div className="min-h-screen bg-[#0c0b0a]">
      <Header />

      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Bathroom Tiling — Surrey &amp; West Sussex</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#f5f0e8] font-medium leading-tight mb-6">
              Bathrooms finished<br /><em className="italic">to perfection.</em>
            </h1>
            <p className="text-[#a8a39a] text-lg max-w-xl leading-relaxed">Full renovations, feature walls and custom shower enclosures — properly waterproofed and finished to a spa-quality standard.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src="/images/luxe_apartment_01.jpg" alt="Bathroom tiling" className="w-full h-80 object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <img src="/images/IMG_3880.jpeg" alt="Shower enclosure tiling" className="w-full h-80 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0b0a]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-[2fr_1fr] gap-16">
            <div className="space-y-5 text-[#a8a39a] text-base leading-relaxed">
              {[
                'At JM² Tiling Co, we provide professional bathroom tiling services tailored to create clean, modern, and long-lasting spaces that add real value to your home. From full bathroom renovations to feature walls and bespoke shower enclosures, we deliver high-quality workmanship with exceptional attention to detail throughout every stage of the installation.',
                'We specialise in porcelain, ceramic, and natural stone tiles across walls and floors — from timeless traditional styles to contemporary large-format designs. Whether you want a sleek minimalist finish, intricate feature patterns, or a luxury spa-inspired bathroom, every tile is installed with precision and care.',
                'Our bathroom tiling is completed with a strong focus on preparation, waterproofing, and durability — because bathrooms are one of the most important spaces in your home.',
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>{p}</motion.p>
              ))}
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#c9a84c] text-sm">Contact us today for a free quotation and let us transform your bathroom.</motion.p>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="border border-white/10 p-8 self-start">
              <p className="text-[#c9a84c] text-xs font-mono tracking-widest uppercase mb-3">Bespoke Quote</p>
              <p className="font-display text-4xl text-[#f5f0e8] font-medium leading-tight">Tailored<br />Pricing</p>
              <p className="text-[#6b6560] text-sm mt-2 mb-6">Every bathroom is different — get in touch for a tailored quote.</p>
              <div className="space-y-2 mb-8">
                {['Wall & floor tiling', 'Waterproofing included', 'Feature walls & niches', 'Shower enclosures', 'Free quotation'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#a8a39a]">
                    <span className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0" />{item}
                  </div>
                ))}
              </div>
              <Link to="/quote" className="block w-full text-center py-3.5 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] text-xs font-semibold tracking-widest uppercase transition-all">
                Get Free Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111110] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-[#f5f0e8] font-medium mb-10">What We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {offers.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                className="bg-[#111110] p-5 hover:bg-[#1a1917] transition-colors flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0" />
                <span className="text-[#d6d3cc] text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
