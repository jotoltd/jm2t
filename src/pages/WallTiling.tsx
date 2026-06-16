import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePageTitle from '../hooks/usePageTitle';

const offers = [
  'Kitchen splashback tiling',
  'Bathroom wall tiling',
  'Feature wall installation',
  'Porcelain & ceramic tiles',
  'Natural stone wall tiling',
  'Contemporary & pattern layouts',
  'Surface preparation & boarding',
  'Grout & seal finishing',
  'Residential & commercial projects',
];

export default function WallTiling() {
  usePageTitle('Wall Tiling');
  return (
    <div className="min-h-screen bg-[#0c0b0a]">
      <Header />

      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Wall Tiling — Surrey &amp; West Sussex</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#f5f0e8] font-medium leading-tight mb-6">
              Wall tiling,<br /><em className="italic">perfectly square.</em>
            </h1>
            <p className="text-[#a8a39a] text-lg max-w-xl leading-relaxed">Kitchen splashbacks, feature walls and full-height installs set out precisely — from contemporary to decorative patterns.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src="/images/luxe_apartment_02.jpg" alt="Wall tiling feature" className="w-full h-80 object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <img src="/images/IMG_4117.jpeg" alt="Kitchen splashback tiling" className="w-full h-80 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0b0a]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-[2fr_1fr] gap-16">
            <div className="space-y-5 text-[#a8a39a] text-base leading-relaxed">
              {[
                'At JM² Tiling Co, we offer professional wall tiling services designed to enhance the appearance, durability, and value of your home or commercial space. Whether you\'re updating a kitchen splashback, renovating a bathroom, or creating a bespoke feature wall, we deliver high-quality finishes with precision and attention to detail.',
                'We work with porcelain, ceramic, and natural stone tiles — installing everything from clean contemporary layouts to more detailed decorative patterns. Every project is carefully prepared and completed to ensure a flawless finish that is visually impressive and built to last.',
                'Customer satisfaction and quality workmanship are at the centre of everything we do. We take pride in delivering expertly tiled walls that combine durability, precision, and modern design to transform any space.',
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>{p}</motion.p>
              ))}
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#c9a84c] text-sm">Get in touch today for a free quotation and let us bring your vision to life.</motion.p>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="border border-white/10 p-8 self-start">
              <p className="text-[#c9a84c] text-xs font-mono tracking-widest uppercase mb-3">Pricing Guide</p>
              <p className="font-display text-5xl text-[#f5f0e8] font-medium">£50–60</p>
              <p className="text-[#6b6560] text-sm mt-1 mb-6">per m²</p>
              <div className="space-y-2 mb-8">
                {['Tile size dependent', 'Layout complexity', 'Surface prep included', 'Transparent pricing', 'Free quotation'].map((item) => (
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
