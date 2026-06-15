import { motion } from 'motion/react';
import { Layers, Grid2x2, Hammer, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Layers,
    emoji: '🧱',
    title: 'Wall Tiling',
    desc: 'Kitchens, bathrooms & splashbacks — precise, clean, lasting.',
    href: '/wall-tiling',
    price: 'From £50/m²',
  },
  {
    icon: Grid2x2,
    emoji: '🏠',
    title: 'Floor Tiling',
    desc: 'Bathrooms, kitchens & hallways — durable & stylish.',
    href: '/floor-tiling',
    price: 'From £60/m²',
  },
  {
    icon: Hammer,
    emoji: '🚿',
    title: 'Bathroom Tiling',
    desc: 'Full renovations to feature walls & shower enclosures.',
    href: '/bathroom-tiling',
    price: 'Bespoke quote',
  },
  {
    icon: Wrench,
    emoji: '🔧',
    title: 'Re-grouting & Repair',
    desc: 'Restore tired tiles — re-grout, fix & replace.',
    href: '/regrouting',
    price: '£200/day',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-[#050507] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase mb-16"
        >
          Our Tiling Services
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={service.href}
                className="group flex flex-col bg-neutral-900 border-2 border-white/10 p-8 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(77,238,255,0.25)] hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Icon area */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
                    <service.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="text-4xl">{service.emoji}</span>
                </div>

                <h3 className="font-display text-2xl font-black text-white uppercase mb-3 leading-tight group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed flex-1">{service.desc}</p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">{service.price}</span>
                  <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest group-hover:text-cyan-400 transition-colors">View →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
