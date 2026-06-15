import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GalleryRow2 } from '../components/ImageGallery';
import usePageTitle from '../hooks/usePageTitle';

export default function BathroomTiling() {
  usePageTitle('Bathroom Tiling');
  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100">
      <Header />

      {/* HERO */}
      <section className="relative bg-[#050507] pt-32 pb-20 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cyan-400 font-mono text-xs font-bold tracking-[0.3em] uppercase"
          >
            JM²TilingCo
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase mt-4 leading-tight"
          >
            Bathroom <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-500">Tiling</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Surrey & West Sussex • Residential & Commercial
          </motion.p>
        </div>
      </section>

      <div className="h-1 bg-cyan-400 shadow-[0_0_12px_rgba(77,238,255,0.7)]" />

      {/* GALLERY STRIP */}
      <GalleryRow2 />

      <div className="h-1 bg-cyan-400 shadow-[0_0_12px_rgba(77,238,255,0.7)]" />

      {/* MAIN COPY */}
      <section className="py-20 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-[2fr_1fr] gap-12">
            {/* Copy */}
            <div className="space-y-6 text-neutral-300 text-base leading-relaxed">
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                At JM²TilingCo, we provide professional bathroom tiling services tailored to create clean, modern, and long-lasting spaces that add real value to your home. From full bathroom renovations to feature walls and bespoke shower enclosures, we deliver high-quality workmanship with exceptional attention to detail throughout every stage of the installation.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                We specialise in the installation of porcelain, ceramic, and natural stone tiles across walls and floors, working with everything from timeless traditional styles to contemporary large-format designs. Whether you're looking for a sleek minimalist finish, intricate feature patterns, or a luxury spa-inspired bathroom, we ensure every tile is installed with precision and care.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                Our bathroom tiling services are completed to the highest standards, with a strong focus on preparation, waterproofing, clean finishing, and durability. We understand that bathrooms are one of the most important spaces in any property, which is why we work closely with every client to achieve a finish that is both visually stunning and built to last.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                At JM²TilingCo, we pride ourselves on reliability, professionalism, and delivering results that exceed expectations. Every project is approached with the same level of care and craftsmanship, regardless of size or complexity.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-cyan-400 font-bold">
                Contact us today for a free quotation and let us help transform your bathroom with expertly installed tiling solutions.
              </motion.p>
            </div>

            {/* Pricing card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-900 border-2 border-cyan-500/30 p-6 self-start"
            >
              <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-2">Free Quote</p>
              <p className="font-display text-3xl font-black text-white leading-tight">Bespoke<br />Pricing</p>
              <p className="text-neutral-400 text-sm mt-2">Every bathroom is different — get in touch for a tailored quote.</p>
              <div className="h-px bg-white/10 my-4" />
              <ul className="space-y-2 text-sm text-neutral-400">
                {['Wall & floor tiling', 'Waterproofing included', 'Feature walls & niches', 'Shower enclosures', 'Free quotation'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/quote"
                className="mt-6 w-full block text-center bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest py-3 text-sm transition-all shadow-[0_0_20px_rgba(77,238,255,0.3)]"
              >
                Get Free Quote
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-cyan-400 shadow-[0_0_12px_rgba(77,238,255,0.7)]" />

      {/* WHAT WE OFFER */}
      <section className="py-20 bg-[#050507]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase mb-10 text-center">What We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Full bathroom renovations',
              'Shower enclosure tiling',
              'Feature wall installation',
              'Porcelain & ceramic tiles',
              'Natural stone installation',
              'Large-format tile fitting',
              'Waterproofing & tanking',
              'Grout & seal finishing',
              'Bespoke niche & recess work',
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 bg-neutral-900 border border-white/10 p-4 hover:border-cyan-500/50 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-white font-medium text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 bg-cyan-400 shadow-[0_0_12px_rgba(77,238,255,0.7)]" />

      <Footer />
    </div>
  );
}
