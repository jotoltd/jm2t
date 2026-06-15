import { motion } from 'motion/react';

const reviews = [
  { name: 'James R.', location: 'Crawley', text: 'Exceptional work throughout — the bathroom looks like something from a luxury hotel. Meticulous attention to detail and left the place spotless.', rating: 5 },
  { name: 'Sarah M.', location: 'Horsham', text: 'Transformed our tired kitchen with beautiful floor tiles. Professional, punctual and the finish is perfect. Would recommend without hesitation.', rating: 5 },
  { name: 'David & Claire T.', location: 'Reigate', text: 'Used JM² for a full bathroom renovation. The quality of work is outstanding — exactly what we wanted. Very knowledgeable throughout.', rating: 5 },
  { name: 'Emily P.', location: 'Haywards Heath', text: 'The re-grouting has made such a difference — tiles look brand new. Quick, tidy and very reasonably priced. Will definitely use again.', rating: 5 },
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
          <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Client reviews</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f5f0e8]">
            Trusted by homeowners<br />
            <em className="italic">who expect more.</em>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
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
