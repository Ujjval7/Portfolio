import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <FadeIn className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <motion.div
        className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </FadeIn>
  );
}
