import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePageTitle from '../hooks/usePageTitle';
import { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import EditableImage from '../components/EditableImage';

const processSteps = [
  {
    step: '01',
    title: 'Before',
    desc: 'The existing porch area before transformation — ready for a complete tiling overhaul.',
    contentKey: 'process_before',
    fallback: '/images/tiled_porch_before.jpeg',
  },
  {
    step: '02',
    title: 'During',
    desc: 'Precision installation in progress — careful preparation and expert tile laying.',
    contentKey: 'process_during',
    fallback: '/images/tiled_porch_during.jpeg',
  },
  {
    step: '03',
    title: 'After',
    desc: 'The finished result — a beautifully tiled porch that transforms the entrance.',
    contentKey: 'process_after',
    fallback: '/images/tiled_porch_after.jpeg',
  },
];

export default function Process() {
  usePageTitle('Our Process');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useAdmin();

  return (
    <div className="min-h-screen bg-[#0c0b0a]">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* HERO */}
      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">How We Work</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#f5f0e8] font-medium leading-tight mb-6">
              From start to<br /><em className="italic text-[#c9a84c]">flawless</em> finish.
            </h1>
            <p className="text-[#a8a39a] text-lg max-w-xl leading-relaxed">
              See how we transform spaces with precision craftsmanship, from initial preparation to the final polished result.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5 STEP PROCESS */}
      <section className="py-24 bg-[#111110] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#c9a84c]">
              <span className="h-px w-8 bg-[#c9a84c]/60"></span>
              How it works
            </span>
            <h2 className="mt-5 font-display text-4xl text-[#f5f0e8] sm:text-5xl lg:text-6xl">
              Five steps to a finish<br />
              <em className="italic">you'll love.</em>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
            {[
              { num: '01', title: 'Free Consultation', desc: 'We visit, measure up and listen to exactly what you want to achieve — no obligation, no pressure.' },
              { num: '02', title: 'Quote & Tile Advice', desc: 'A clear written quote, plus honest guidance on the right tiles, layout and materials for your project.' },
              { num: '03', title: 'Surface Preparation', desc: 'Substrates levelled, primed and waterproofed properly — the unseen work that makes tiling last.' },
              { num: '04', title: 'Expert Installation', desc: 'Precise setting-out and craftsmanship from a fully qualified tiler who treats your home with care.' },
              { num: '05', title: 'Finish & Clean Down', desc: "Grouted, sealed, polished and left spotless — we don't leave until you're delighted with the result." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#111110] p-8 hover:bg-[#1a1917] transition-colors"
              >
                <p className="font-mono text-[#c9a84c] text-xs tracking-widest mb-6">{step.num}</p>
                <h3 className="font-display text-xl text-[#f5f0e8] mb-3">{step.title}</h3>
                <p className="text-[#6b6560] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORCH GALLERY */}
      <section className="py-24 bg-[#0a0a0c] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="space-y-24">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="text-5xl font-display text-[#c9a84c]/30">{item.step}</span>
                    <span className="h-px w-12 bg-[#c9a84c]/40"></span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl text-[#f5f0e8] mb-4">{item.title}</h2>
                  <p className="text-[#a8a39a] text-lg leading-relaxed">{item.desc}</p>
                </div>
                <motion.div
                  className={`relative overflow-hidden border border-white/10 ${i % 2 === 1 ? 'md:order-1' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <EditableImage
                    contentKey={item.contentKey}
                    fallback={item.fallback}
                    alt={`${item.title} - Porch tiling project`}
                    className={`w-full object-cover ${item.step === '03' ? 'h-[600px] object-bottom' : 'h-[400px]'}`}
                    isAdmin={isAdmin}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[#c9a84c] text-xs font-mono tracking-[0.2em] uppercase">
                      Porch Transformation
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl text-[#f5f0e8] mb-4">
              Ready to transform your space?
            </h2>
            <p className="text-[#a8a39a] mb-8">
              Get a free quote and see your project through from start to finish.
            </p>
            <a
              href="/quote"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] text-sm uppercase tracking-[0.18em] px-8 py-4 transition-all"
            >
              Get a Free Quote
            </a>
          </motion.div>
        </div>
      </section>

      <Footer hideEnquiry={true} />
    </div>
  );
}
