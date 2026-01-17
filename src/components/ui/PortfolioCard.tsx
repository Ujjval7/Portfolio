import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function PortfolioCard({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-card rounded-xl border border-border p-6 shadow-sm',
        hover && 'transition-all duration-300',
        className
      )}
      whileHover={hover ? { y: -4, boxShadow: '0 12px 40px -12px hsl(var(--accent) / 0.2)' } : undefined}
    >
      {children}
    </motion.div>
  );
}
