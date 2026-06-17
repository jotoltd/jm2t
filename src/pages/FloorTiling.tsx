import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePageTitle from '../hooks/usePageTitle';
import { useContentImage } from '../hooks/useContentImage';

const offers = [
  'Porcelain floor tiling',
  'Ceramic floor tiling',
  'Natural stone installation',
  'Herringbone & pattern layouts',
  'Large-format tile installation',
  'Floor levelling & surface prep',
  'Underfloor heating compatibility',
  'Grout & seal finishing',
  'Residential & commercial projects',
];

function PageImage({ contentKey, fallback, alt, className }: { contentKey: string; fallback: string; alt: string; className?: string }) {
  const { imageUrl } = useContentImage(contentKey, fallback);
  return <img src={imageUrl} alt={alt} className={className} />;
}

export default function FloorTiling() {
  usePageTitle('Floor Tiling');
  return (
    <div className="min-h-screen bg-[#0c0b0a]">
      <Header />

      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a84c] text-xs font-mono tracking-[0.3em] uppercase mb-4">Floor Tiling — Surrey &amp; West Sussex</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#f5f0e8] font-medium leading-tight mb-6">
              Floor tiling,<br /><em className="italic">dead-level.</em>
            </h1>
            <p className="text-[#a8a39a] text-lg max-w-xl leading-relaxed">Porcelain, ceramic and natural stone floors — straight-lay, herringbone and large-format, laid to last decades.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <PageImage 
                contentKey="floor_tiling_image_1" 
                fallback="/images/luxe_kitchen01.jpg" 
                alt="Floor tiling installation" 
                className="w-full h-80 object-cover" 
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <PageImage 
                contentKey="floor_tiling_image_2" 
                fallback="/images/luxe_kitchen02_floor_tiling.jpg" 
                alt="Precision floor tiling" 
                className="w-full h-80 object-cover" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0b0a]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-[2fr_1fr] gap-16">
            <div className="space-y-5 text-[#a8a39a] text-base leading-relaxed">
              {[
                'At JM² Tiling Co, we specialise in high-quality floor tiling solutions designed to elevate both residential and commercial spaces across Surrey and West Sussex. Whether you\'re renovating a bathroom, upgrading a kitchen, or transforming an entire property, we deliver precise workmanship with a clean, professional finish every time.',
                'We work with a wide range of materials including porcelain, ceramic, and natural stone tiles, offering expert installation tailored to your chosen style, layout, and space requirements. From classic straight lay patterns to intricate herringbone and large-format installations, every project is completed with careful attention to detail and long-lasting durability in mind.',
                'We pride ourselves on reliability, precision, and customer satisfaction — delivering stunning tiled floors that not only look exceptional but are built to stand the test of time.',
              ].map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>{p}</motion.p>
              ))}
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#c9a84c] text-sm">Get in touch today for a free quotation and let us help bring your project to life.</motion.p>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="border border-white/10 p-8 self-start">
              <p className="text-[#c9a84c] text-xs font-mono tracking-widest uppercase mb-3">Pricing Guide</p>
              <p className="font-display text-5xl text-[#f5f0e8] font-medium">£80–95</p>
              <p className="text-[#6b6560] text-sm mt-1 mb-6">per m²</p>
              <div className="space-y-2 mb-8">
                {['Tile size dependent', 'Pattern/layout dependent', 'Surface prep included', 'Free quotation'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#a8a39a]">
                    <span className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0" />{item}
                  </div>
                ))}
              </div>
              <Link to="/quote" className="block w-full text-center py-3.5 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] text-xs font-semibold tracking-widest uppercase transition-all">
                Get Free Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111110] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-[#f5f0e8] font-medium mb-10">What We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {offers.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                className="bg-[#111110] p-5 hover:bg-[#1a1917] transition-colors flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0" />
                <span className="text-[#d6d3cc] text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
