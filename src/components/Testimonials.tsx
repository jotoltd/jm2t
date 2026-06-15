import { motion } from 'motion/react';

const reviews = [
  { name: 'The Johnson Family', location: 'Crawley', text: 'JM2 TilingCo transformed my kitchen with stunning tile work! Highly recommend their services.', rating: 5 },
  { name: 'Sarah & Mike', location: 'Horsham', text: 'Exceptional quality and professionalism. Our bathroom looks incredible!', rating: 5 },
  { name: 'Emily Turner', location: 'Reigate', text: 'JM2 TilingCo was fantastic! They delivered beyond our expectations.', rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#0c0b0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Client Words</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f5f0e8]">
            Trusted by homeowners<br />
            <em className="italic">who expect more.</em>
          </h2>
          <p className="text-[#a8a39a] mt-4 text-base max-w-xl"></p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-px bg-white/5">
          {reviews.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#0c0b0a] p-8 hover:bg-[#111110] transition-colors"
            >
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-[#c9a84c] text-sm">★</span>
                ))}
              </div>
              <p className="text-[#d6d3cc] text-sm leading-relaxed mb-6 italic font-display">&ldquo;{t.text}&rdquo;</p>
              <p className="text-[#f5f0e8] text-sm font-semibold">{t.name}</p>
              <p className="text-[#6b6560] text-xs tracking-wider uppercase font-mono mt-0.5">{t.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
