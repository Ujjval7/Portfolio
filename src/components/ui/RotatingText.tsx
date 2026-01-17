import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface RotatingTextProps {
  texts: string[];
  interval?: number;
}

export function RotatingText({ texts, interval = 3000 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className="h-10 md:h-12 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="block text-accent font-display font-semibold text-2xl md:text-3xl"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
