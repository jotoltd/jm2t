import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '2,022', label: 'Tiling since' },
  { value: '100%', label: 'Satisfaction focused' },
  { value: '8+', label: 'Areas covered' },
  { value: '6', label: 'Specialist services' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0c0b0a]">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpeg"
          alt="Premium tiling work"
          className="w-full h-full object-cover object-center scale-110"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a]/85 via-[#0c0b0a]/45 to-[#0c0b0a]/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full flex flex-col justify-center min-h-screen pb-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <img src="/images/new_logo_trans.png" alt="JM² Tiling Co" className="w-72 sm:w-96 h-auto mb-10 opacity-95 mx-auto" />
          <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-6">
            Surrey &amp; West Sussex — Est. 2022
          </p>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-[88px] text-[#f5f0e8] leading-[1.0] mb-8 font-medium">
            Tiling crafted to a{' '}
            <span className="relative inline-block italic text-[#c9a84c]">
                flawless
                <svg className="absolute -bottom-2 left-0 w-full text-[#c9a84c]/60" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9C50 3 150 3 198 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </span>{' '}
            finish.
          </h1>
          <p className="text-[#a8a39a] text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
            Professional wall &amp; floor tiling in Surrey &amp; West Sussex. Porcelain and natural
            stone specialists delivering premium wall &amp; floor installations for discerning homes and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
          <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-[#a8a39a] text-xs font-mono tracking-wide">5-star rated locally</span>
            </div>
            {['Fully insured & qualified', 'Free no-obligation quotes'].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#c9a84c]" />
                <span className="text-[#a8a39a] text-xs font-mono tracking-wide">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pb-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-2xl sm:text-3xl text-[#f5f0e8] mb-0.5">{stat.value}</div>
            <div className="text-[10px] text-[#a8a39a] tracking-widest uppercase font-mono">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
