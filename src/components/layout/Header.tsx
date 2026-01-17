import { motion } from 'framer-motion';
import { NAV_ITEMS } from '@/utils/constants';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CustomTooltip } from '@/components/ui/CustomTooltip';

export function Header() {
  const activeSection = useScrollSpy();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            className="font-display font-bold text-xl text-foreground"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            Ujjval Patel
          </motion.a>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <CustomTooltip key={item.id} content={item.label}>
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative p-3 rounded-full transition-colors ${
                      isActive
                        ? 'text-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-accent/10 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                </CustomTooltip>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
