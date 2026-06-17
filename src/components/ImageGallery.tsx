import { motion } from 'motion/react';

const images = [
  '/images/IMG_3876.jpeg',
  '/images/IMG_3878.jpeg',
  '/images/IMG_3879.jpeg',
  '/images/IMG_3880.jpeg',
  '/images/IMG_4101.jpeg',
  '/images/IMG_4112.jpeg',
  '/images/IMG_4113.jpeg',
  '/images/IMG_4117.jpeg',
  '/images/wall_tiling_5.jpeg',
  '/images/wall_tiling_6.jpeg',
];

function GalleryRow({ reversed = false }: { reversed?: boolean }) {
  const row = reversed ? [...images].reverse() : images;
  return (
    <div className="flex w-full overflow-hidden">
      {row.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.04 }}
          className="relative flex-1 h-[160px] md:h-[220px] group overflow-hidden"
        >
          <img
            src={img}
            alt={`Tiling work ${idx + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/15 transition-all duration-300" />
        </motion.div>
      ))}
    </div>
  );
}

export function GalleryRow1() { return <GalleryRow reversed={false} />; }
export function GalleryRow2() { return <GalleryRow reversed={true} />; }

export default function ImageGallery() {
  return (
    <div className="w-full">
      <GalleryRow reversed={false} />
    </div>
  );
}
