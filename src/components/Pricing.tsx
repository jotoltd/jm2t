import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    title: 'Wall Tiling',
    desc: 'Splashbacks, feature walls and full-height installs.',
  },
  {
    title: 'Floor Tiling',
    desc: 'Porcelain, ceramic & natural stone, any pattern.',
  },
  {
    title: 'Re-grouting & Repair',
    desc: 'Tile repair, replacement and grout renewal.',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 bg-[#0c0b0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f5f0e8]">
            Honest rates,<br />
            <em className="italic">no surprises.</em>
          </h2>
          <p className="text-[#a8a39a] mt-4 text-base max-w-xl">
            Indicative pricing — every quote is tailored to your tiles, surface and layout.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-px bg-white/5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0c0b0a] p-10 hover:bg-[#111110] transition-colors"
            >
              <h3 className="font-display text-2xl text-[#f5f0e8] mb-3">{t.title}</h3>
              <p className="text-[#a8a39a] text-sm leading-relaxed mb-8">{t.desc}</p>
              <Link
                to="/quote"
                className="inline-flex items-center text-xs text-[#c9a84c] tracking-widest uppercase hover:text-[#e2c97e] transition-colors border-b border-[#c9a84c]/30 pb-0.5"
              >
                Get a quote &rarr;
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
