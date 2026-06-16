import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePageTitle from '../hooks/usePageTitle';
import { useState } from 'react';

const processSteps = [
  {
    step: '01',
    title: 'Before',
    desc: 'The existing porch area before transformation — ready for a complete tiling overhaul.',
    image: '/images/tiled_porch_before.jpeg',
  },
  {
    step: '02',
    title: 'During',
    desc: 'Precision installation in progress — careful preparation and expert tile laying.',
    image: '/images/tiled_porch_during.jpeg',
  },
  {
    step: '03',
    title: 'After',
    desc: 'The finished result — a beautifully tiled porch that transforms the entrance.',
    image: '/images/tiled_porch_after.jpeg',
  },
];

export default function Process() {
  usePageTitle('Our Process');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      {/* PROCESS STEPS */}
      <section className="py-24 bg-[#0a0a0c]">
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
                  <img
                    src={item.image}
                    alt={`${item.title} - Porch tiling project`}
                    className="w-full h-[400px] object-cover"
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
