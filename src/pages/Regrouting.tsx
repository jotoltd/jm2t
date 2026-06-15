import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GalleryRow2 } from '../components/ImageGallery';
import usePageTitle from '../hooks/usePageTitle';

export default function Regrouting() {
  usePageTitle('Re-grouting & Repair');
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
            Re-grouting <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-500">&amp; Repair</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-neutral-400 mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            Surrey & West Sussex • Restore & Refresh
          </motion.p>
        </div>
      </section>

      <div className="h-1 bg-cyan-400 shadow-[0_0_12px_rgba(77,238,255,0.7)]" />
      <GalleryRow2 />
      <div className="h-1 bg-cyan-400 shadow-[0_0_12px_rgba(77,238,255,0.7)]" />

      {/* MAIN COPY */}
      <section className="py-20 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-[2fr_1fr] gap-12">
            <div className="space-y-6 text-neutral-300 text-base leading-relaxed">
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                At JM²TilingCo, we provide professional re-grouting, tile repair, and tile replacement services designed to restore tired, damaged, or worn tiled surfaces back to their best condition. Whether your grout has become discoloured, cracked, or mouldy, or you have loose, chipped, or broken tiles that need attention, we offer reliable solutions that improve both the appearance and longevity of your space without the need for a complete reinstallation.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                Our re-grouting service is ideal for refreshing bathrooms, kitchens, showers, and tiled floors, helping to create a cleaner, more modern finish while also protecting surfaces from moisture penetration and further damage. We carefully remove deteriorated grout and replace it with high-quality new grout applied with precision and attention to detail.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                Alongside re-grouting, we also carry out tile repairs and tile replacements, matching and replacing damaged tiles wherever possible to restore a seamless and professional appearance. From cracked floor tiles to loose wall tiles and damaged grout lines, we take pride in delivering clean, high-quality repair work that extends the life of your existing tiling.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                At JM²TilingCo, we are committed to delivering dependable workmanship, honest service, and lasting results that help bring your tiled surfaces back to life.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-cyan-400 font-bold">
                Contact us today for a free quotation and expert advice on restoring your tiles with our professional re-grouting and repair services.
              </motion.p>
            </div>

            {/* Pricing card */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-neutral-900 border-2 border-cyan-500/30 p-6 self-start">
              <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-2">Day Rate</p>
              <p className="font-display text-4xl font-black text-white">£200</p>
              <p className="text-neutral-400 text-sm mt-1">per day</p>
              <div className="h-px bg-white/10 my-4" />
              <p className="text-neutral-500 text-xs leading-relaxed mb-4">Charged per day rather than m² — each repair project varies depending on condition, preparation, and extent of work required.</p>
              <ul className="space-y-2 text-sm text-neutral-400">
                {['Re-grouting included', 'Tile repair & replacement', 'Transparent day rate', 'Free quotation'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/quote" className="mt-6 w-full block text-center bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest py-3 text-sm transition-all shadow-[0_0_20px_rgba(77,238,255,0.3)]">
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
              'Full re-grouting service',
              'Mould & discolouration removal',
              'Cracked grout replacement',
              'Loose tile re-fixing',
              'Chipped tile replacement',
              'Tile matching & sourcing',
              'Bathroom & kitchen repairs',
              'Shower enclosure restoration',
              'Floor & wall tile repairs',
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
