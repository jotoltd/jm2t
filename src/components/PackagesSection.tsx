import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { TILING_PACKAGES } from '../data/packages';
import { TileFormat, PatternType } from '../types';

interface PackagesSectionProps {
  selectedFormat: TileFormat;
  setSelectedFormat: (type: TileFormat) => void;
  selectedPattern: PatternType;
  setSelectedPattern: (type: PatternType) => void;
  onSelectPackage: (packageId: string) => void;
}

export default function PackagesSection({
  selectedFormat,
  setSelectedFormat,
  selectedPattern,
  setSelectedPattern,
  onSelectPackage,
}: PackagesSectionProps) {
  const isPattern = selectedPattern === 'pattern';

  // Simple price lookup based on format + pattern
  const getPrice = (format: TileFormat, pattern: PatternType) => {
    const prices = {
      large: { standard: 60, pattern: 75 },
      medium: { standard: 65, pattern: 80 },
      small: { standard: 70, pattern: 85 },
    };
    return prices[format][pattern];
  };

  return (
    <section id="packages" className="py-20 bg-[#050507] border-y border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-mono text-sm font-bold tracking-widest uppercase">
            Simple Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white uppercase mt-2">
            Transparent Pricing
          </h2>
          <p className="text-neutral-400 text-base mt-4 max-w-2xl mx-auto">
            Wall & floor tiling. One simple price per m². Choose your tile size and pattern below.
          </p>
        </div>

        {/* TWO SIMPLE CONTROLS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {/* Tile Size */}
          <div className="bg-neutral-900 p-1 rounded-none border border-white/10">
            <span className="text-neutral-500 text-xs uppercase font-mono px-3 py-2 block">Tile Size</span>
            <div className="flex">
              {(['large', 'medium', 'small'] as TileFormat[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedFormat(size)}
                  className={`px-4 py-2 text-sm font-bold uppercase transition-all ${
                    selectedFormat === size
                      ? 'bg-cyan-500 text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {size === 'large' ? 'Large' : size === 'medium' ? 'Medium' : 'Small'}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern */}
          <div className="bg-neutral-900 p-1 rounded-none border border-white/10">
            <span className="text-neutral-500 text-xs uppercase font-mono px-3 py-2 block">Layout</span>
            <div className="flex">
              <button
                onClick={() => setSelectedPattern('standard')}
                className={`px-4 py-2 text-sm font-bold uppercase transition-all ${
                  selectedPattern === 'standard'
                    ? 'bg-cyan-500 text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setSelectedPattern('pattern')}
                className={`px-4 py-2 text-sm font-bold uppercase transition-all ${
                  selectedPattern === 'pattern'
                    ? 'bg-cyan-500 text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Pattern
              </button>
            </div>
          </div>
        </div>

        {/* BIG PRICE DISPLAY */}
        <div className="text-center mb-12">
          <div className="inline-block bg-neutral-900 border border-cyan-500/30 px-8 py-6">
            <span className="text-neutral-400 text-sm uppercase tracking-widest block mb-1">
              {selectedFormat} Tiles • {selectedPattern} Layout
            </span>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl sm:text-7xl font-black text-white">
                £{getPrice(selectedFormat, selectedPattern)}
              </span>
              <span className="text-xl text-cyan-400 font-bold">/m²</span>
            </div>
          </div>
        </div>

        {/* THREE SERVICE CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Wall Tiling',
              desc: 'Kitchens, bathrooms, splashbacks',
              price: getPrice(selectedFormat, selectedPattern),
              features: ['Surface prep', 'Adhesive & grout', 'Cutting & fitting', 'Clean finish'],
              id: 'wall',
            },
            {
              title: 'Floor Tiling',
              desc: 'Bathrooms, kitchens, hallways',
              price: getPrice(selectedFormat, selectedPattern) + 20,
              features: ['Floor prep', 'Leveling', 'Underlay if needed', 'Grout & seal'],
              id: 'floor',
              featured: true,
            },
            {
              title: 'Bespoke Work',
              desc: 'Countertops, niches, custom cuts',
              price: 'Quote',
              features: ['Custom design', 'Precise cuts', 'Specialist adhesives', 'Premium finish'],
              id: 'bespoke',
            },
          ].map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`bg-neutral-900 border p-6 ${
                service.featured
                  ? 'border-cyan-500 ring-2 ring-cyan-500/20'
                  : 'border-white/10'
              }`}
            >
              {service.featured && (
                <span className="bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest px-2 py-1">
                  Most Popular
                </span>
              )}
              
              <h3 className="font-display text-2xl font-black text-white uppercase mt-4">
                {service.title}
              </h3>
              <p className="text-neutral-400 text-sm mt-1">{service.desc}</p>

              <div className="my-5 py-4 border-y border-white/10">
                <span className="text-neutral-500 text-xs uppercase">From</span>
                <div className="text-3xl font-black text-white">
                  {typeof service.price === 'number' ? `£${service.price}/m²` : service.price}
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-cyan-400" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPackage(service.id)}
                className={`w-full py-3 font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  service.featured
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-black'
                    : 'bg-white hover:bg-cyan-500 text-black'
                }`}
              >
                Get Quote <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Extras Note */}
        <p className="text-center text-neutral-500 text-sm mt-8">
          Extras available: Waterproofing +£15/m² • Underfloor heating prep +£20/m² • Natural stone sealing +£10/m²
        </p>
      </div>
    </section>
  );
}
