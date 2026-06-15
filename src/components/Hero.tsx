import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, MapPin, Grid2x2, Hammer, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageError, setImageError] = useState<boolean[]>([false, false]);
  const [isHovered, setIsHovered] = useState(false);
  const heroImages = ['/images/Hero_1.jpeg', '/images/Hero_2.jpeg'];

  useEffect(() => {
    if (imageError.every(e => e)) return; // Stop if all images failed
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [imageError]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-neutral-100 overflow-hidden">
      {/* FULL BACKGROUND IMAGE SLIDESHOW */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            alt="Tiling work"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageError(prev => { const e = [...prev]; e[currentImage] = true; return e; })}
          />
        </AnimatePresence>
      </div>

      {/* OVERLAY — light at centre, dark at edges so text stays readable */}
      <div className="absolute inset-0 bg-black/45 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 z-10" />


      {/* CONTENT ON TOP */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20 w-full text-center pt-28 sm:pt-32 lg:pt-24">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-display text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] text-center select-none"
          >
            Professional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-500">
              Wall & Floor Tiling
            </span>
            <br />
            <span className="text-white text-3xl sm:text-5xl lg:text-6xl xl:text-7xl">
              in Surrey & West Sussex
            </span>
          </motion.h1>

          {/* SURREY • WEST SUSSEX • PROFESSIONAL TILING TAG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-8 sm:py-4 rounded-none bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 text-base sm:text-2xl lg:text-3xl font-mono font-bold tracking-[0.2em] uppercase backdrop-blur-sm mx-auto"
          >
            <Grid2x2 className="w-8 h-8 text-cyan-400" />
            <span>JM² Tiling Co</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-sans text-base sm:text-lg text-neutral-200 max-w-xl mx-auto font-normal leading-relaxed pt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Professional tiling across Surrey & West Sussex — precision, quality, lasting results.
          </motion.p>
        </div>

        {/* CTA BUTTONS - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 pt-8 justify-center px-4 sm:px-0"
        >
          {/* Our Services — subtle glow pulse */}
          <motion.a
            href="#services"
            animate={{ boxShadow: ['0 0 0px rgba(77,238,255,0)', '0 0 25px rgba(77,238,255,0.5)', '0 0 0px rgba(77,238,255,0)'] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-none px-10 py-4 text-sm uppercase tracking-widest text-center transition-colors"
          >
            Our Services
          </motion.a>
          {/* WhatsApp — bounce */}
          <motion.a
            href="https://wa.me/447738427208?text=Hi%2C%20I%27d%20like%20a%20free%20quote%20for%20tiling%20work."
            target="_blank"
            rel="noopener noreferrer"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-black font-bold rounded-none px-10 py-4 text-sm uppercase tracking-widest shadow-lg shadow-green-500/25 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </motion.a>
          {/* Get Quote — border pulse */}
          <motion.a
            href="/quote"
            animate={{ borderColor: ['rgba(255,255,255,0.6)', 'rgba(77,238,255,1)', 'rgba(255,255,255,0.6)'] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: 0.5 }}
            className="border-2 hover:bg-white hover:text-black transition-colors text-white font-bold rounded-none px-10 py-4 text-sm uppercase tracking-widest text-center backdrop-blur-sm"
          >
            Get Free Quote
          </motion.a>
        </motion.div>

        {/* SLIDE INDICATORS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-2 justify-center pt-12"
        >
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-8 h-1 rounded-full transition-all duration-300 ${
                currentImage === idx ? 'bg-cyan-400' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </motion.div>

        {/* SCROLL DOWN */}
        <motion.a
          href="#services-section"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-1 pt-8 text-white/50 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.a>
      </div>

      {/* SCROLL DOWN HINT */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
          />
        </div>
      </motion.div>

      {/* MARQUEE - LOCATIONS SCROLLING ABOVE */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-cyan-400 h-1" />
        <div className="flex flex-col bg-neutral-950">
          <motion.div 
            className="flex whitespace-nowrap py-4 md:py-5 cursor-pointer transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={isHovered ? {} : { x: ["0%", "-50%"] }}
            transition={isHovered ? {} : { repeat: Infinity, duration: 25, ease: "linear" }}
          >
            <span className={`font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] font-mono mx-6 sm:mx-10 transition-all duration-300 ${isHovered ? 'text-cyan-400 text-lg sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_0_15px_rgba(77,238,255,0.8)]' : 'text-white text-base sm:text-xl md:text-2xl lg:text-3xl'}`}>
              CRAWLEY • HORSHAM • HAYWARDS HEATH • SOUTH LONDON • SURREY • WEST SUSSEX • REIGATE • REDHILL •
            </span>
            <span className={`font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] font-mono mx-6 sm:mx-10 transition-all duration-300 ${isHovered ? 'text-cyan-400 text-lg sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_0_15px_rgba(77,238,255,0.8)]' : 'text-white text-base sm:text-xl md:text-2xl lg:text-3xl'}`}>
              CRAWLEY • HORSHAM • HAYWARDS HEATH • SOUTH LONDON • SURREY • WEST SUSSEX • REIGATE • REDHILL •
            </span>
          </motion.div>
          <div className="flex justify-center border-t border-white/10 py-3 md:py-4">
            <a href="tel:+4407738427208" className="text-cyan-400 hover:text-cyan-300 font-black text-xs sm:text-base md:text-xl uppercase tracking-[0.08em] sm:tracking-[0.15em] font-mono text-center px-4 transition-colors">
              📞 07738 427208 • PROFESSIONAL TILING • FREE QUOTES • FULLY INSURED
            </a>
          </div>
        </div>
        <div className="bg-cyan-400 h-1" />
      </div>
    </section>
  );
}
