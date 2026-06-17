import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Grid3X3, Bath, LayoutGrid, Brush, Table2, Hammer, ArrowRight, ShieldCheck, FileText, Gem, Layers, Building2, GraduationCap } from 'lucide-react';
import { useServices } from '../hooks/useContent';
import EditableImage from './EditableImage';
import { useAdmin } from '../contexts/AdminContext';

// Icon mapping
const iconMap: { [key: string]: any } = {
  Grid3X3,
  Bath,
  LayoutGrid,
  Brush,
  Table2,
  Hammer,
};

export default function ServicesOverview() {
  const { isAdmin } = useAdmin();
  const { services, loading, error } = useServices(true); // Get featured services
  
  // Debug: Log admin state and services
  React.useEffect(() => {
    console.log('ServicesOverview - Admin state:', isAdmin);
    console.log('ServicesOverview - Services:', services);
    console.log('ServicesOverview - Loading:', loading);
    console.log('ServicesOverview - Error:', error);
  }, [isAdmin, services, loading, error]);
  return (
    <section id="services" className="bg-[#0a0a0c] py-24 lg:py-32">
      {isAdmin && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Admin Mode Active - Click images to edit
        </div>
      )}
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
            const Icon = iconMap[s.icon_name] || Grid3X3;
            return (
              <motion.div
                key={s.id}
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
                  <EditableImage
                    contentKey={`service_${s.id}_image`}
                    fallback={s.image_url}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    isAdmin={isAdmin}
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
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{s.description}</p>
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
