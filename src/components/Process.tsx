import { motion } from 'motion/react';

export default function Process() {
  return (
    <section className="py-24 bg-[#09090b] border-y border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase mb-16">
          The Process
        </h2>
        
        <div className="grid md:grid-cols-5 gap-6">
          {[
            { step: '1', title: 'Free Consultation' },
            { step: '2', title: 'Quotation & Tile Advice' },
            { step: '3', title: 'Surface Preparation' },
            { step: '4', title: 'Professional Installation' },
            { step: '5', title: 'Final Finish & Clean Down' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center bg-neutral-900 border border-white/10 p-6 hover:border-cyan-500 transition-all"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-cyan-500 text-black font-black text-2xl sm:text-3xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(77,238,255,0.4)]">
                {item.step}
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
