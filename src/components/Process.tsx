import { motion } from 'motion/react';

const steps = [
  { num: '01', title: 'Free Consultation', desc: 'We visit, measure up and listen to exactly what you want — no obligation, no pressure.' },
  { num: '02', title: 'Quote & Tile Advice', desc: 'A clear written quote, plus honest guidance on the right tiles, layout and materials.' },
  { num: '03', title: 'Surface Preparation', desc: 'Substrates levelled, primed and waterproofed properly — the unseen work that makes tiling last.' },
  { num: '04', title: 'Expert Installation', desc: 'Precise setting-out and craftsmanship from a fully qualified tiler who treats your home with care.' },
  { num: '05', title: 'Finish & Clean Down', desc: 'Grouted, sealed, polished and left spotless — we do not leave until you are delighted.' },
];

export default function Process() {
  return (
    <section id="process" className="py-28 bg-[#111110] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">How it works</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f5f0e8]">
            Five steps to a finish<br />
            <em className="italic">you'll love.</em>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#111110] p-8 hover:bg-[#1a1917] transition-colors"
            >
              <p className="font-mono text-[#c9a84c] text-xs tracking-widest mb-6">{step.num}</p>
              <h3 className="font-display text-xl text-[#f5f0e8] mb-3">{step.title}</h3>
              <p className="text-[#6b6560] text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
