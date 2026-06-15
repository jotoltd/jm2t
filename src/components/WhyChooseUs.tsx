import { motion } from 'motion/react';

const features = [
  { title: 'Fully Insured', desc: 'Complete public liability cover on every project, large or small.' },
  { title: 'Free Quotes', desc: 'Transparent, no-obligation quotations with honest pricing.' },
  { title: 'Premium Finishes', desc: 'Meticulous attention to detail for a flawless, lasting result.' },
  { title: 'Stone Specialists', desc: 'Porcelain and natural stone expertise across every surface.' },
  { title: 'Residential & Commercial', desc: 'Trusted in homes and businesses across the South East.' },
  { title: 'Fully Qualified', desc: 'Time-served, accredited workmanship you can rely on.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 bg-[#111110] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Why choose us</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f5f0e8]">
              The standard you<br />
              <em className="italic">deserve.</em>
            </h2>
            <p className="text-[#a8a39a] mt-6 text-base leading-relaxed max-w-md">
              Every project is handled personally — from the first consultation to the final clean-down.
              No subcontractors, no shortcuts.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-px bg-white/5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#111110] p-6 hover:bg-[#1a1917] transition-colors"
              >
                <div className="w-6 h-px bg-[#c9a84c] mb-4" />
                <h3 className="font-display text-lg text-[#f5f0e8] mb-2">{f.title}</h3>
                <p className="text-[#6b6560] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
