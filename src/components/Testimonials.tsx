import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "JM²TilingCo transformed my kitchen with stunning tile work! Highly recommend their services.",
      author: "The Johnson Family",
    },
    {
      quote: "Exceptional quality and professionalism. Our bathroom looks incredible!",
      author: "Sarah & Mike",
    },
    {
      quote: "JM²TilingCo was fantastic! They delivered beyond our expectations.",
      author: "Emily Turner",
    },
  ];

  return (
    <section className="py-24 bg-[#09090b] border-y border-white/10 relative overflow-hidden">
      {/* NEON BACKGROUND ICONS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large centred quote */}
        <Quote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] text-cyan-400 opacity-[0.06]" />
        {/* Corner quotes */}
        <Quote className="absolute -top-4 -left-4 w-52 h-52 text-cyan-400 opacity-[0.08] rotate-12" />
        <Quote className="absolute -bottom-4 -right-4 w-52 h-52 text-cyan-400 opacity-[0.08] -rotate-12" />
        {/* Stars scattered */}
        <Star className="absolute top-8 right-12 w-20 h-20 text-yellow-400 opacity-[0.08] rotate-12 fill-yellow-400" />
        <Star className="absolute top-16 left-1/3 w-10 h-10 text-yellow-400 opacity-[0.10] -rotate-6 fill-yellow-400" />
        <Star className="absolute bottom-12 left-12 w-16 h-16 text-yellow-400 opacity-[0.08] rotate-45 fill-yellow-400" />
        <Star className="absolute bottom-8 right-1/3 w-10 h-10 text-yellow-400 opacity-[0.10] rotate-12 fill-yellow-400" />
        <Star className="absolute top-1/2 right-8 w-24 h-24 text-cyan-300 opacity-[0.06] -rotate-12 fill-cyan-300" />
        <Star className="absolute top-1/3 left-8 w-12 h-12 text-cyan-300 opacity-[0.08] rotate-6 fill-cyan-300" />
        {/* Glow blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase mb-16"
        >
          Client Testimonials
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="bg-neutral-900 border-2 border-white/10 p-8 relative hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(77,238,255,0.15)] hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="absolute top-4 left-4 w-8 h-8 text-cyan-500/20" />
              <div className="flex gap-1 mb-4 pt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-neutral-300 text-lg italic leading-relaxed mb-6">
                "{item.quote}"
              </p>
              <p className="text-cyan-400 font-bold uppercase tracking-wider text-sm">
                — {item.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
