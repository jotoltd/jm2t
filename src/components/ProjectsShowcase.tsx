import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Crawley Family Bathroom',
    location: 'West Sussex',
    image: '/images/bathroom_tiling.jpeg',
    desc: 'Complete bathroom renovation with floor-to-ceiling porcelain tiles and custom shower enclosure.',
  },
  {
    id: 2,
    title: 'Horsham Kitchen Floor',
    location: 'West Sussex',
    image: '/images/luxe_kitchen02_floor_tiling.jpg',
    desc: 'Large-format porcelain tiles in herringbone pattern with underfloor heating.',
  },
  {
    id: 3,
    title: 'Reigate Wet Room',
    location: 'Surrey',
    image: '/images/bahtroom_tiling_2.jpeg',
    desc: 'Level-access wet room with anti-slip flooring and full waterproofing system.',
  },
  {
    id: 4,
    title: 'Redhill Feature Wall',
    location: 'Surrey',
    image: '/images/IMG_3880.jpeg',
    desc: 'Statement kitchen splashback with handmade artisan tiles.',
  },
];

export default function ProjectsShowcase() {
  return (
    <section id="projects" className="border-t border-white/10 bg-[#0a0a0c] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#c9a84c]">
            <span className="h-px w-8 bg-[#c9a84c]/60"></span>
            Recent Work
          </span>
          <h2 className="mt-5 font-display text-4xl text-[#f5f0e8] sm:text-5xl lg:text-6xl">
            Projects that speak for themselves.
          </h2>
        </motion.div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden border border-white/10 bg-[#101012]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-[#0c0b0a]/0 transition-colors duration-300 group-hover:bg-[#0c0b0a]/20"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl text-[#f5f0e8]">{project.title}</h3>
                  <span className="flex items-center gap-1.5 text-xs text-[#c9a84c]">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.location}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {project.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
