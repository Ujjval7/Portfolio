import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useState, useEffect } from 'react';
import aboutData from '@/data/about.json';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

// Define proper easing as tuple
const customEase: Easing = [0.2, 0.65, 0.3, 0.9];

// Function to capitalize first letter of each word
const capitalizeName = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total animation duration: letters animation + hold time
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800); // 2.8 seconds for animation

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      onLoadingComplete();
    }, 400); // Small delay after fade out
  };

  // Get first name from about data and capitalize it
  const fullName = capitalizeName(aboutData.name);
  const firstName = fullName.split(' ')[0]; 
  const letters = firstName.split('');

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-8 bg-[#1a1a1a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Main text container - increased padding */}
          <div className="relative py-20 px-8">
            {/* The dynamic name text */}
            <div className="flex items-end font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.8,
                    filter: 'blur(4px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.15,
                    ease: customEase,
                  }}
                  className="relative inline-block bg-gradient-to-br from-[#00c9a7] via-[#00d4aa] to-[#f0a060] bg-clip-text text-transparent font-['New_Rocker']"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtle glow effect behind text */}
            <motion.div
              className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-[radial-gradient(circle,#00c9a7_0%,transparent_70%)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>

          {/* Bottom loading indicator */}
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#00c9a7]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}