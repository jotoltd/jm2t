import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { useRef, useEffect } from 'react';

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0c] py-16">
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 lg:grid-cols-4 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0 }}
          className="text-center"
        >
          <div className="font-display text-5xl text-[#c9a84c] lg:text-6xl">
            <CountUp value={2022} />
          </div>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/50">Tiling since</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center"
        >
          <div className="font-display text-5xl text-[#c9a84c] lg:text-6xl">
            <CountUp value={100} suffix="%" />
          </div>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/50">Satisfaction focused</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            className="font-display text-5xl text-[#c9a84c] lg:text-6xl"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
          >
            8+
          </motion.div>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/50">Areas covered</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <motion.div
            className="font-display text-5xl text-[#c9a84c] lg:text-6xl"
            initial={{ rotateY: 90 }}
            whileInView={{ rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            6
          </motion.div>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/50">Specialist services</p>
        </motion.div>
      </div>
    </section>
  );
}
