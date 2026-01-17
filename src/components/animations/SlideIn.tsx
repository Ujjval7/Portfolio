import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SlideInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export function SlideIn({ children, delay = 0, direction = 'left', className = '' }: SlideInProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>();

  const xOffset = direction === 'left' ? -100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xOffset }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: xOffset }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
