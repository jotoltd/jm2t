import { motion } from 'motion/react';
import { Shield, FileText, Sparkles, Clock, Brush, Gem, Building, GraduationCap } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    { icon: Shield, text: 'Fully Insured' },
    { icon: FileText, text: 'Free Quotes' },
    { icon: Sparkles, text: 'Premium Finishes' },
    { icon: Clock, text: 'Reliable & Professional' },
    { icon: Brush, text: 'Clean & Tidy Workmanship' },
    { icon: Gem, text: 'Porcelain & Natural Stone Specialists' },
    { icon: Building, text: 'Residential & Commercial Projects' },
    { icon: GraduationCap, text: 'Fully Qualified' },
  ];

  return (
    <section className="py-24 bg-[#050507] border-y border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-10 items-center">

          {/* LEFT — LOGO on white bg */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <div className="bg-white p-8 shadow-[0_0_40px_rgba(77,238,255,0.4)] border-b-4 border-cyan-400 w-full max-w-sm lg:max-w-md flex items-center justify-center">
              <img
                src="/images/trans_logo.png"
                alt="JM²TilingCo Logo"
                className="w-full object-contain"
              />
            </div>
          </motion.div>

          {/* DIVIDER */}
          <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(77,238,255,0.8)]" />

          {/* RIGHT — CONTENT */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-5xl sm:text-6xl font-black text-white uppercase mb-2"
            >
              Why choose us?
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07, duration: 0.4 }}
                  className="flex items-center gap-3 bg-neutral-900 border border-white/10 p-4 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(77,238,255,0.1)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <feature.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="font-sans text-white font-bold uppercase tracking-wide text-sm">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
