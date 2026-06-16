import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-[#0c0b0a] flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gold glow pulse behind logo */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-[#c9a84c]/10 blur-[100px]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.5, 0.15] }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Logo container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo — huge → normal → shrinks off */}
          <motion.img
            src="/images/logo_icon.png"
            alt="JM² Tiling Co"
            className="w-[180px] sm:w-[240px] object-contain drop-shadow-[0_0_40px_rgba(201,168,76,0.5)]"
            initial={{ scale: 2.5, opacity: 0 }}
            animate={{ scale: [2.5, 1, 0.08], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.8,
              times: [0, 0.45, 1],
              ease: ['easeOut', 'easeIn'],
            }}
            onAnimationComplete={onComplete}
          />

          {/* Curved gold line under logo (like flawless) */}
          <motion.svg
            className="absolute -bottom-4 w-[200px] text-[#c9a84c]/60"
            viewBox="0 0 200 12"
            fill="none"
            preserveAspectRatio="none"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 1, 1, 0], pathLength: [0, 1, 1, 1] }}
            transition={{ duration: 1.8, times: [0, 0.3, 0.8, 1] }}
          >
            <motion.path
              d="M2 9C50 3 150 3 198 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{ duration: 1.8, times: [0, 0.3, 0.8, 1] }}
            />
          </motion.svg>
        </div>

        {/* Gold line sweep */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#c9a84c] shadow-[0_0_20px_rgba(201,168,76,1)]"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: [0, 1, 1] }}
          transition={{ duration: 1.8, times: [0, 0.5, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
