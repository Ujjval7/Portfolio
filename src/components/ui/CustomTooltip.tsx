import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export function CustomTooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 text-sm font-medium bg-foreground text-background rounded-md whitespace-nowrap z-50 pointer-events-none"
          >
            {content}
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-foreground rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
