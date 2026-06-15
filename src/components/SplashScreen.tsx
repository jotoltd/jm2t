import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cyan glow pulse behind logo */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.6, 0.2] }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Logo — huge → normal → shrinks off */}
        <motion.img
          src="/images/trans_logo.png"
          alt="JM² Tiling Co"
          className="relative z-10 w-[280px] sm:w-[380px] object-contain drop-shadow-[0_0_60px_rgba(77,238,255,0.8)]"
          initial={{ scale: 2.5, opacity: 0 }}
          animate={{ scale: [2.5, 1, 0.08], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.8,
            times: [0, 0.45, 1],
            ease: ['easeOut', 'easeIn'],
          }}
          onAnimationComplete={onComplete}
        />

        {/* Cyan line sweep */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_rgba(77,238,255,1)]"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: [0, 1, 1] }}
          transition={{ duration: 1.8, times: [0, 0.5, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
