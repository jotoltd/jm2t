import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePageTitle from '../hooks/usePageTitle';

const projects = [
  {
    title: 'The Luxe Apartment',
    description:
      'This stunning apartment features an elegant metro wall tile backsplash and a porcelain marble style floor in the bathroom. A sleek design that enhances the overall aesthetic. The unique tile layout creates a modern and sophisticated ambiance, perfect for urban living.',
    images: [
      '/images/luxe_apartment_01.jpg',
      '/images/luxe_apartment_02.jpg',
      '/images/luxe_apartment_03.jpg',
      '/images/luxe_apartment_04.jpg',
    ],
    tags: ['Bathroom', 'Wall Tiling', 'Floor Tiling', 'Porcelain'],
  },
  {
    title: 'Luxury Kitchen',
    description:
      'In this project, we transformed a traditional kitchen with clean floor tiling that combines style and functionality. The durable tiles are perfect for high-traffic areas and add a touch of luxury with their 33% offset.',
    images: [
      '/images/luxe_kitchen01.jpg',
      '/images/luxe_kitchen02.jpg',
      '/images/luxe_kitchen03.jpg',
      '/images/luxe_kitchen04.jpg',
    ],
    tags: ['Kitchen', 'Floor Tiling', 'Porcelain'],
  },
];

export default function Projects() {
  usePageTitle('Our Projects');
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox(l => l ? { ...l, index: (l.index - 1 + l.images.length) % l.images.length } : l), []);
  const next = useCallback(() => setLightbox(l => l ? { ...l, index: (l.index + 1) % l.images.length } : l), []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, close, prev, next]);

  return (
    <div className="min-h-screen bg-[#0c0b0a]">
      <Header />

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={close}
          >
            {/* Close */}
            <button onClick={close} className="absolute top-4 right-4 text-white hover:text-[#c9a84c] transition-colors z-10">
              <X className="w-8 h-8" />
            </button>

            {/* Counter */}
            <p className="absolute top-5 left-1/2 -translate-x-1/2 text-neutral-400 font-mono text-xs uppercase tracking-widest">
              {lightbox.index + 1} / {lightbox.images.length}
            </p>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white hover:text-[#c9a84c] transition-colors z-10 bg-black/40 p-2"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightbox.images[lightbox.index]}
              alt=""
              className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white hover:text-[#c9a84c] transition-colors z-10 bg-black/40 p-2"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {lightbox.images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(l => l ? { ...l, index: i } : l); }}
                  className={`w-12 h-12 overflow-hidden border-2 transition-all ${i === lightbox.index ? 'border-[#c9a84c]' : 'border-white/20 opacity-50 hover:opacity-80'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Selected Work</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#f5f0e8] font-medium leading-tight mb-6">
              Recent projects<br /><em className="italic">across the South East.</em>
            </h1>
            <p className="text-[#a8a39a] text-lg max-w-xl leading-relaxed">A selection of our completed tiling projects across Surrey &amp; West Sussex.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0b0a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24">
          {projects.map((project, pIdx) => (
            <motion.div
              key={pIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {/* Project header */}
              <div className="mb-8">
                <p className="text-[#c9a84c] font-mono text-xs uppercase tracking-[0.3em] mb-2">Project {String(pIdx + 1).padStart(2, '0')}</p>
                <h2 className="font-display text-4xl sm:text-5xl text-[#f5f0e8] font-medium">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] border border-[#c9a84c]/20 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mb-8">
                {project.images.map((img, iIdx) => (
                  <div
                    key={iIdx}
                    onClick={() => img && setLightbox({ images: project.images.filter(Boolean) as string[], index: iIdx })}
                    className={`relative aspect-square bg-[#111110] border border-white/5 flex items-center justify-center overflow-hidden group ${img ? 'cursor-zoom-in' : ''}`}
                  >
                    {img ? (
                      <>
                        <img src={img} alt={`${project.title} ${iIdx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">View</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[#3a3730]">
                        <div className="w-10 h-10 border border-dashed border-[#3a3730] flex items-center justify-center">
                          <span className="text-lg">{iIdx + 1}</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest">Coming soon</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-[#a8a39a] text-base leading-relaxed max-w-3xl">
                {project.description}
              </p>

              {/* Divider between projects */}
              {pIdx < projects.length - 1 && (
                <div className="mt-24 h-px bg-white/5" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
