import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
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
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      onLoadingComplete();
    }, 400);
  };

  // Get first name from about data and capitalize it
  const fullName = capitalizeName(aboutData.name);
  const firstName = fullName.split(' ')[0]; 
  const letters = firstName.split('');

  // Theme-based background colors
  const bgColor = theme === 'dark' ? 'bg-gradient-to-br from-background via-background to-accent/5' : 'bg-[#1a1a1a]';

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-8 ${bgColor}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Main text container */}
          <div className="relative py-20 px-8">
            {/* The dynamic name text */}
            <div className="flex items-end text-6xl md:text-8xl lg:text-9xl tracking-tight">
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
                  className="relative inline-block bg-gradient-to-br from-[#00c9a7] via-[#00d4aa] to-[#f0a060] bg-clip-text text-transparent font-['Grechen_Fuemen']"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}