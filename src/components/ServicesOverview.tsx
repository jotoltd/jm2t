import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Grid3X3, Bath, LayoutGrid, Brush, Table2, Hammer, ArrowRight, ShieldCheck, FileText, Gem, Layers, Building2, GraduationCap } from 'lucide-react';

const services = [
  { title: 'Floor Tiling', price: '£80–95 / m²', desc: 'Porcelain, ceramic and natural stone floors for homes and commercial spaces — straight-lay, herringbone and large-format, laid dead-level.', bullets: ['Herringbone & large-format', 'Residential & commercial', 'Built to last decades'], href: '/floor-tiling', image: '/images/luxe_kitchen02_floor_tiling.jpg', icon: Grid3X3 },
  { title: 'Bathroom Tiling', price: 'Full renovations', desc: 'Full bathroom renovations, feature walls and custom shower enclosures — properly waterproofed and finished to a spa-quality standard.', bullets: ['Wet rooms & showers', 'Waterproofing focus', 'Luxury, spa-inspired'], href: '/bathroom-tiling', image: '/images/bathroom_tiling.jpeg', icon: Bath },
  { title: 'Wall Tiling', price: '£50–60 / m²', desc: 'Kitchen splashbacks, feature walls and full-height installs set out perfectly square — from contemporary to decorative patterns.', bullets: ['Kitchen splashbacks', 'Feature walls', 'Flawless symmetry'], href: '/wall-tiling', image: '/images/luxe_kitchen04wall_tiling.jpeg', icon: LayoutGrid },
  { title: 'Re-grouting & Repair', price: '£200 / day', desc: 'Discoloured, cracked or mouldy grout renewed and loose, chipped or broken tiles replaced — restoring tired surfaces and sealing out moisture.', bullets: ['Tile repair & replacement', 'Mould & moisture sealing', 'A fresh, modern finish'], href: '/regrouting', image: '/images/IMG_4110.jpeg', icon: Brush },
  { title: 'Bespoke Tile Countertops', price: 'Bespoke quote', desc: 'Made-to-measure tiled worktops and surfaces — a hard-wearing statement piece designed around your kitchen or bathroom.', bullets: ['Custom worktops', 'Statement surfaces', 'Premium materials'], href: '/quote', image: '/images/luxe_kitchen02_floor_tiling.jpg', icon: Table2 },
  { title: 'Renovation & Restoration', price: 'From £200 / day', desc: 'Older tiled areas brought back to life with modern techniques and materials — from single-room refreshes to full property transformations.', bullets: ['Full transformations', 'Modern techniques', 'Sympathetic restoration'], href: '/quote', image: '/images/luxe_apartment_01.jpg', icon: Hammer },
];

export default function ServicesOverview() {
  return (
    <section id="services" className="bg-[#0a0a0c] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#c9a84c]">
            <span className="h-px w-8 bg-[#c9a84c]/60"></span>
            What We Do
          </span>
          <h2 className="mt-5 font-display text-4xl text-[#f5f0e8] sm:text-5xl lg:text-6xl">
            A complete tiling service, finished to perfection.
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link
                  to={s.href}
                  className="group block overflow-hidden border border-white/10 bg-[#101012] transition-all hover:border-[#c9a84c]/40 hover:shadow-[0_0_30px_-10px_rgba(201,168,76,0.2)]"
                >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/20 to-transparent"></div>
                  <span className="absolute right-4 top-4 bg-[#0c0b0a]/75 px-3 py-1 font-display text-lg text-[#c9a84c] backdrop-blur">
                    {s.price}
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-[#c9a84c]/30 text-[#c9a84c] transition-colors group-hover:bg-[#c9a84c] group-hover:text-[#0c0b0a]">
                      <Icon className="h-6 w-6" strokeWidth={1.4} />
                    </span>
                    <h3 className="font-display text-2xl text-[#f5f0e8]">{s.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-white/60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-[#c9a84c]">
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-24 border-y border-white/10 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShieldCheck, title: 'Fully Insured', desc: 'Complete public liability cover on every project, large or small.' },
              { icon: FileText, title: 'Free Quotes', desc: 'Transparent, no-obligation quotations with honest pricing.' },
              { icon: Gem, title: 'Premium Finishes', desc: 'Meticulous attention to detail for a flawless, lasting result.' },
              { icon: Layers, title: 'Stone Specialists', desc: 'Porcelain and natural stone expertise across every surface.' },
              { icon: Building2, title: 'Residential & Commercial', desc: 'Trusted in homes and businesses across the South East.' },
              { icon: GraduationCap, title: 'Fully Qualified', desc: 'Time-served, accredited workmanship you can rely on.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4"
              >
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-[#c9a84c]/30 text-[#c9a84c]">
                  <item.icon className="h-6 w-6" strokeWidth={1.4} />
                </span>
                <div>
                  <h4 className="font-display text-lg text-[#f5f0e8]">{item.title}</h4>
                  <p className="mt-1 text-base text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transparent Pricing */}
        <motion.div
          id="pricing"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#c9a84c]">
            <span className="h-px w-8 bg-[#c9a84c]/60"></span>
            Transparent Pricing
            <span className="h-px w-8 bg-[#c9a84c]/60"></span>
          </span>
          <h2 className="mt-5 font-display text-4xl text-[#f5f0e8] sm:text-5xl">
            Honest rates, no surprises.
          </h2>
          <p className="mt-4 text-white/55 max-w-2xl mx-auto">
            Indicative pricing — every quote is tailored to your tiles, surface and layout.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'WALL TILING', price: '£50–60', unit: 'per m²', desc: 'Splashbacks, feature walls and full-height installs.', href: '/quote' },
            { title: 'FLOOR TILING', price: '£80–95', unit: 'per m²', desc: 'Porcelain, ceramic & natural stone, any pattern.', href: '/quote', popular: true },
            { title: 'RE-GRouting & REPAIR', price: '£200', unit: 'per day', desc: 'Tile repair, replacement and grout renewal.', href: '/quote' },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group border p-8 transition-colors ${card.popular ? 'border-[#c9a84c]/60 bg-[#c9a84c]/[0.03] animate-pulse-glow' : 'border-white/10 bg-[#101012] hover:border-white/20'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">{card.title}</span>
                {card.popular && (
                  <span className="bg-[#c9a84c] px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#0c0b0a]">
                    Most Popular
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span className="text-sm text-white/40 mr-1">From</span>
                <span className="font-display text-4xl text-[#c9a84c]">{card.price}</span>
                <span className="ml-2 text-sm text-white/50">{card.unit}</span>
              </div>
              <p className="mt-4 text-sm text-white/55 leading-relaxed">{card.desc}</p>
              <Link
                to={card.href}
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#c9a84c] transition-colors group-hover:text-[#e2c97e]"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
