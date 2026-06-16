import { motion } from 'motion/react';

const reviews = [
  { name: 'The Johnson Family', location: 'Crawley', text: 'JM2 TilingCo transformed my kitchen with stunning tile work! Highly recommend their services.', rating: 5 },
  { name: 'Sarah & Mike', location: 'Horsham', text: 'Exceptional quality and professionalism. Our bathroom looks incredible!', rating: 5 },
  { name: 'Emily Turner', location: 'Reigate', text: 'JM2 TilingCo was fantastic! They delivered beyond our expectations.', rating: 5 },
];

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a84c]">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a84c]/40">
      <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
      <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative border-t border-white/10 bg-[#0a0a0c] py-24 lg:py-32 overflow-hidden">
      {/* Background illustrations */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Large faded quote marks */}
        <svg className="absolute top-12 left-8 w-32 h-32 text-[#c9a84c]/[0.03]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
        <svg className="absolute bottom-24 right-12 w-40 h-40 text-[#c9a84c]/[0.03]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
        {/* Faded stars scattered */}
        <svg className="absolute top-32 right-1/4 w-12 h-12 text-[#c9a84c]/[0.06]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <svg className="absolute bottom-40 left-1/4 w-16 h-16 text-[#c9a84c]/[0.05]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <svg className="absolute top-1/2 right-8 w-10 h-10 text-[#c9a84c]/[0.08]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <svg className="absolute top-20 left-1/3 w-14 h-14 text-[#c9a84c]/[0.04]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <svg className="absolute bottom-20 right-1/3 w-20 h-20 text-[#c9a84c]/[0.04]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#c9a84c]">
            <span className="h-px w-8 bg-[#c9a84c]/60"></span>
            <span className="mx-auto">Client Words</span>
          </span>
          <h2 className="mt-5 font-display text-4xl text-[#f5f0e8] sm:text-5xl lg:text-6xl">
            Trusted by homeowners who expect more.
          </h2>
        </motion.div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative border border-white/10 bg-[#101012] p-9"
            >
              <QuoteIcon />
              <div className="mt-5 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <blockquote className="mt-5 text-lg leading-relaxed text-white/80">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-5">
                <span className="block text-sm uppercase tracking-[0.18em] text-[#c9a84c]">{t.name}</span>
                <span className="text-sm text-white/40">{t.location}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
