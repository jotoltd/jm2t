import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    title: 'Wall Tiling',
    price: '£60+',
    unit: 'per m²',
    desc: 'Splashbacks, feature walls and full-height installs.',
    popular: false,
  },
  {
    title: 'Floor Tiling',
    price: '£80+',
    unit: 'per m²',
    desc: 'Porcelain, ceramic & natural stone, any pattern.',
    popular: true,
  },
  {
    title: 'Re-grouting & Repair',
    price: '£200',
    unit: 'per day',
    desc: 'Tile repair, replacement and grout renewal.',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-5">Transparent Pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] text-[#f5f0e8] font-medium">
            Honest rates, no surprises.
          </h2>
          <p className="text-[#6b6560] mt-4 text-sm max-w-xl mx-auto">
            Indicative pricing — every quote is tailored to your tiles, surface and layout.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {tiers.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative border p-8 ${t.popular ? 'border-[#c9a84c]/60 bg-[#c9a84c]/5' : 'border-white/10 bg-transparent'}`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#0a0a0a] text-[10px] font-semibold tracking-widest uppercase px-3 py-1">
                  Most Popular
                </span>
              )}
              <p className="text-[#6b6560] text-xs font-mono tracking-widest uppercase mb-4">{t.title}</p>
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="font-display text-4xl sm:text-5xl text-[#f5f0e8] font-medium">{t.price}</span>
                <span className="text-[#6b6560] text-xs font-mono">{t.unit}</span>
              </div>
              <p className="text-[#6b6560] text-sm leading-relaxed mb-8">{t.desc}</p>
              <Link
                to="/quote"
                className="text-xs text-[#c9a84c] tracking-widest uppercase hover:text-[#e2c97e] transition-colors font-mono"
              >
                Get a Quote &rarr;
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
