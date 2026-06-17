import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import EditableImage from './EditableImage';
import { useAdmin } from '../contexts/AdminContext';

export default function Hero() {
  const { isAdmin } = useAdmin();
  
  // Debug: Log admin state
  React.useEffect(() => {
    console.log('Hero - Admin state:', isAdmin);
  }, [isAdmin]);
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0c0b0a]">
      <div className="absolute inset-0 z-0">
        <EditableImage
          contentKey="hero_image"
          fallback="/images/hero.jpeg"
          alt="Premium tiling work"
          className="w-full h-full object-cover object-center scale-110"
          isAdmin={isAdmin}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a]/70 via-[#0c0b0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/40 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 45%, black 65%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 45%, black 65%, black 100%)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#c9a84c]/40 to-transparent origin-center"
          />
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#c9a84c]/20 to-transparent origin-center"
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#c9a84c]/30 via-transparent to-[#c9a84c]/20 origin-center"
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent origin-center"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full flex flex-col justify-center min-h-screen pb-32 pt-56">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl ml-4 [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#c9a84c]/60"></span>
            <span className="text-[#c9a84c] text-xs font-mono tracking-[0.32em] uppercase">
              Surrey &amp; West Sussex — Est. 2022
            </span>
          </div>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-[88px] text-[#f5f0e8] leading-[1.0] mb-8 font-medium">
            Tiling crafted to a
            <br />
            <span className="relative inline-block italic text-[#c9a84c]">
              flawless
              <svg className="absolute -bottom-2 left-0 w-full text-[#c9a84c]/60" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 9C50 3 150 3 198 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </span>{' '}
            finish.
          </h1>
          <p className="text-[#a8a39a] text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
            Expert tiling services across Surrey & West Sussex
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/quote"
              className="group inline-flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] text-sm uppercase tracking-[0.18em] px-8 py-4 shadow-[0_0_40px_-8px_rgba(201,168,76,0.6)] hover:shadow-[0_0_60px_-6px_rgba(201,168,76,0.8)] transition-all"
            >
              Get Your Free Quote
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </Link>
            <a
              href="tel:+447738427208"
              className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-[#c9a84c] hover:text-[#c9a84c] text-[#f5f0e8] text-sm uppercase tracking-[0.18em] px-8 py-4 backdrop-blur transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
              </svg>
              Call Now
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-white/70">5-star rated locally</span>
            </div>
            <span className="hidden h-4 w-px bg-white/20 sm:block"></span>
            <span className="text-sm text-white/60">Fully insured & qualified</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block"></span>
            <span className="text-sm text-white/60">Free, no-obligation quotes</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 animate-bounce">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </motion.div>
    </section>
  );
}
