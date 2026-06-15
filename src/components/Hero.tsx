import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '2022', label: 'Tiling since' },
  { value: '5★', label: 'Satisfaction focused' },
  { value: '20+', label: 'Areas covered' },
  { value: '4', label: 'Specialist services' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#0c0b0a]">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/Hero_1.jpeg"
          alt="Premium tiling work"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/60 to-[#0c0b0a]/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pb-20 pt-40 sm:pt-48">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-6">
            Surrey &amp; West Sussex — Est. 2022
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#f5f0e8] leading-[1.0] mb-8">
            Tiling crafted to a{' '}
            <em className="italic text-[#c9a84c]">flawless</em>{' '}
            finish.
          </h1>
          <p className="text-[#a8a39a] text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
            Professional wall &amp; floor tiling in Surrey &amp; West Sussex. Porcelain and natural
            stone specialists delivering premium wall &amp; floor installations for discerning homes and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] text-sm font-semibold tracking-widest uppercase transition-all duration-300"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+4407738427208"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-white/40 text-[#f5f0e8] text-sm tracking-widest uppercase transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl sm:text-4xl text-[#f5f0e8] mb-1">{stat.value}</div>
              <div className="text-xs text-[#a8a39a] tracking-wider uppercase font-mono">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
