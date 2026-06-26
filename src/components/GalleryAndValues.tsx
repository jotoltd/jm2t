import { motion } from 'motion/react';
import { ShieldCheck, Ruler, Hammer, Sparkles, HeartHandshake, Grid3X3, Droplets } from 'lucide-react';

const galleryImages = [
  '/images/wall_tiling_3.jpeg',
  '/images/wall_tiling_4.jpeg',
  '/images/wall_tiling_6.jpeg',
  '/images/wall_tiling_7.jpeg',
  '/images/wall_tiling2.jpeg',
  '/images/bathroom_tiling_2.jpeg',
  '/images/regrouting_and_repair.jpeg',
  '/images/tiled_porch_before.jpeg',
  '/images/tiled_porch_after.jpeg',
];

export default function GalleryAndValues() {
  return (
    <section id="philosophy" className="bg-[#09090b] text-neutral-100">
      
      {/* FULL WIDTH IMAGE GALLERY - EDGE TO EDGE */}
      <div className="w-full overflow-hidden">
        <div className="flex">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative flex-shrink-0 w-[300px] h-[200px] md:w-[400px] md:h-[280px] group"
            >
              <img
                src={img}
                alt={`Tiling work ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CYAN SEPARATOR */}
      <div className="bg-cyan-400 h-2 w-full" />

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20 animate-fade-in">
          <span className="text-cyan-500 font-mono text-xs font-bold tracking-[0.25em] uppercase block">
            Our Process
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white uppercase">
            Why Choose JM²TilingCo
          </h2>
          <p className="text-neutral-400 text-sm font-sans font-normal leading-relaxed">
            Fully insured, qualified professionals delivering premium finishes across Surrey & West Sussex. Every project receives meticulous attention from consultation to completion.
          </p>
        </div>

        {/* Feature 1: Our Process */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="absolute -inset-1 rounded-none bg-gradient-to-r from-cyan-400 to-blue-600 opacity-15 blur-md pointer-events-none" />
            <div className="relative rounded-none overflow-hidden shadow-2xl border border-white/10 bg-neutral-800">
              <div className="w-full aspect-[4/3] flex items-center justify-center">
                <Grid3X3 className="w-32 h-32 text-cyan-500/20" />
              </div>
              <div className="absolute top-4 left-4 bg-cyan-600/95 text-white backdrop-blur text-[10px] font-mono uppercase tracking-widest font-extrabold px-3 py-1 rounded-none">
                5-Step Process
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-left">
            <div className="w-12 h-12 bg-cyan-950/55 text-cyan-400 border border-cyan-800/20 rounded-none flex items-center justify-center">
              <Sparkles className="w-6 h-6 stroke-[1.8]" />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-display text-3xl font-black tracking-tight text-white uppercase">
                Our Professional Process
              </h3>
              <p className="font-sans text-xs font-bold tracking-widest text-cyan-500 uppercase">
                &ldquo;From consultation to completion, we handle everything.&rdquo;
              </p>
            </div>

            <div className="space-y-4">
              {[
                { step: '1', title: 'Free Consultation', desc: 'We visit your property, discuss your vision, and provide expert advice on tile selection and layout options.' },
                { step: '2', title: 'Quotation & Tile Advice', desc: 'Detailed written quote with transparent per-m² pricing. We help source the perfect tiles for your project.' },
                { step: '3', title: 'Surface Preparation', desc: 'Professional preparation including levelling, priming, and waterproofing where required.' },
                { step: '4', title: 'Professional Installation', desc: 'Expert tiling with precision cuts, perfect alignment, and attention to every detail.' },
                { step: '5', title: 'Final Finish & Clean Down', desc: 'Premium grouting, sealing, and thorough clean-up leaving your space ready to enjoy.' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-display font-black text-lg shrink-0">{item.step}</span>
                  <div>
                    <h4 className="text-white text-sm font-bold uppercase tracking-wider">{item.title}</h4>
                    <p className="text-neutral-400 text-xs font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 2: Why Choose Us */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="w-12 h-12 bg-cyan-950/55 text-cyan-400 border border-cyan-800/20 rounded-none flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-3xl font-black tracking-tight text-white uppercase">
                Why Choose JM²TilingCo
              </h3>
              <p className="font-sans text-xs font-bold tracking-widest text-cyan-500 uppercase">
                &ldquo;Your trusted tiling partner since 2022.&rdquo;
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: ShieldCheck, title: 'Fully Insured', desc: 'Complete peace of mind with full public liability insurance.' },
                { icon: Ruler, title: 'Porcelain & Natural Stone Specialists', desc: 'Expert installation of all tile types including challenging materials.' },
                { icon: Sparkles, title: 'Premium Finishes', desc: 'Meticulous attention to detail ensures flawless results every time.' },
                { icon: HeartHandshake, title: 'Reliable & Professional', desc: 'We arrive on time, work efficiently, and respect your home.' },
                { icon: Hammer, title: 'Clean & Tidy Workmanship', desc: 'We protect your property and clean thoroughly after completion.' },
                { icon: Grid3X3, title: 'Residential & Commercial', desc: 'From bathrooms to office spaces, we handle projects of all sizes.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 bg-cyan-500/10 rounded-sm text-cyan-400 shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold uppercase tracking-wider">{item.title}</h4>
                    <p className="text-neutral-400 text-xs font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            {/* Testimonials / Trust Block */}
            <div className="bg-neutral-900 border border-white/10 text-white rounded-none p-8 space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
              
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-cyan-950 text-cyan-400 rounded-none flex items-center justify-center border border-cyan-800/20">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-none font-extrabold uppercase tracking-widest">
                  Client Testimonials
                </span>
              </div>

              <div className="space-y-4 text-left">
                {[
                  { quote: "JM²TilingCo transformed my kitchen with stunning tile work! Highly recommend their services.", author: "The Johnson Family" },
                  { quote: "Exceptional quality and professionalism. Our bathroom looks incredible!", author: "Sarah & Mike" },
                  { quote: "JM²TilingCo was fantastic! They delivered beyond our expectations.", author: "Emily Turner" }
                ].map((testimonial, idx) => (
                  <div key={idx} className="border-l-2 border-cyan-500 pl-4">
                    <p className="text-neutral-300 text-xs font-sans italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <span className="text-cyan-400 text-[10px] font-mono mt-1 block">— {testimonial.author}</span>
                  </div>
                ))}
              </div>

              <div className="border border-white/5 bg-neutral-950 p-4 rounded-none">
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                  <span>Serving Surrey & West Sussex Since 2022</span>
                  <span className="text-cyan-400 font-bold">★★★★★</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {['Crawley', 'Horsham', 'Haywards Heath', 'Reigate', 'Redhill', 'South London'].map((area) => (
                    <span key={area} className="text-[8px] bg-cyan-950/50 text-cyan-400 px-2 py-0.5 rounded-none">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECOND GALLERY STRIP */}
      <div className="bg-cyan-400 h-2 w-full" />
      <div className="w-full overflow-hidden">
        <div className="flex flex-row-reverse">
          {['/images/wall_tiling_3.jpeg', '/images/wall_tiling_4.jpeg', '/images/wall_tiling_6.jpeg', '/images/wall_tiling_7.jpeg', '/images/wall_tiling2.jpeg', '/images/bathroom_tiling_2.jpeg', '/images/regrouting_and_repair.jpeg', '/images/regrouting_service.jpg'].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative flex-shrink-0 w-[300px] h-[200px] md:w-[400px] md:h-[280px] group"
            >
              <img
                src={img}
                alt={`Tiling work ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
