import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Floor Tiling', desc: 'Porcelain, ceramic and natural stone floors — herringbone and large-format, laid dead-level.', bullets: ['Herringbone & large-format', 'Residential & commercial', 'Built to last decades'], href: '/floor-tiling' },
  { title: 'Bathroom Tiling', desc: 'Full bathroom renovations and custom shower enclosures — properly waterproofed to a spa-quality standard.', bullets: ['Wet rooms & showers', 'Waterproofing focus', 'Luxury, spa-inspired'], href: '/bathroom-tiling' },
  { title: 'Wall Tiling', desc: 'Kitchen splashbacks, feature walls and full-height installs set out perfectly square.', bullets: ['Kitchen splashbacks', 'Feature walls', 'Flawless symmetry'], href: '/wall-tiling' },
  { title: 'Re-grouting & Repair', desc: 'Discoloured grout renewed and loose tiles replaced — restoring surfaces and sealing out moisture.', bullets: ['Tile repair & replacement', 'Mould & moisture sealing', 'A fresh, modern finish'], href: '/regrouting' },
  { title: 'Bespoke Countertops', desc: 'Made-to-measure tiled worktops and surfaces — a hard-wearing statement piece for your space.', bullets: ['Custom worktops', 'Statement surfaces', 'Premium materials'], href: '/quote' },
  { title: 'Renovation & Restoration', desc: 'Older tiled areas brought back to life — from single-room refreshes to full property transformations.', bullets: ['Full transformations', 'Modern techniques', 'Sympathetic restoration'], href: '/quote' },
];

export default function ServicesOverview() {
  return (
    <section id="services" className="py-28 bg-[#0c0b0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">What we do</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f5f0e8]">
            A complete tiling service,<br />
            <em className="italic">finished to perfection.</em>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-[#0c0b0a] p-8 group hover:bg-[#111110] transition-colors"
            >
              <p className="text-[#c9a84c] text-xs font-mono tracking-[0.2em] uppercase mb-4">0{i + 1}</p>
              <h3 className="font-display text-2xl text-[#f5f0e8] mb-3">{s.title}</h3>
              <p className="text-[#a8a39a] text-sm leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-1.5 mb-6">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-[#6b6560]">
                    <span className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0" />{b}
                  </li>
                ))}
              </ul>
              <Link to={s.href} className="text-xs text-[#c9a84c] tracking-widest uppercase hover:text-[#e2c97e] transition-colors">
                Learn more &rarr;
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
