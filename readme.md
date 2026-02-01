
```Hero.tsx
import { motion } from 'framer-motion';
import { FaDownload, FaArrowDown, FaFile, FaEye, } from 'react-icons/fa';
import aboutData from '@/data/about.json';
import contactData from '@/data/contact.json';
import { RotatingText } from '@/components/ui/RotatingText';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { FadeIn } from '@/components/animations/FadeIn';
import profileImage from '@/assets/profile.jpg';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMemo, useState } from 'react';

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nameCharacters = useMemo(() => {
    const normalizedName = aboutData.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');                                              
    
    return normalizedName.split('').map((char, index) => {
      const isFirstChar = index === 0 || normalizedName[index - 1] === ' ';
      return { char, index, isFirstChar};
    });
  }, []);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) return 1.15; // Hovered
    if (distance === 1) return 1.08; // 1 position away
    return 1; // No scale
  };

  const shouldApplyGradient = (index: number) => {
    if (hoveredIndex === null) return false;
    const distance = Math.abs(index - hoveredIndex);
    return distance <= 1; // Only distance 0 and 1 (3 characters total)
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5 pointer-events-none" />
      
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ">
          {/* Profile Image */}
          <FadeIn direction="left" className="flex-shrink-0 pl-5">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 transition-all duration-500 ${
                aboutData.available 
                  ? 'border-blue-500/50 drop-shadow-[0_0_35px_rgba(59,130,246,0.6)]' 
                  : 'border-red-500/50 drop-shadow-[0_0_35px_rgba(239,68,68,0.6)]'
              }`}>
                <img
                  src={profileImage}
                  alt={aboutData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status indicator */}
              {aboutData.available ? (
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-card px-3 py-1.5 rounded-full shadow-lg border border-border"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Available</span>
                </motion.div>
              ):(
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-card px-3 py-1.5 rounded-full shadow-lg border border-border"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Busy</span>
                </motion.div>
              )}
            </motion.div>
          </FadeIn>

          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground mb-2 text-lg">Greetings! myself</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 
                className="text-4xl md:text-6xl font-['Charm'] font-display font-bold text-foreground mb-4"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {nameCharacters.map((item) => (
                  <motion.span
                    key={item.index}
                    className={`inline-block font-['Charm'] ${
                      shouldApplyGradient(item.index)
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent'
                        : item.isFirstChar 
                        ? 'text-red-500' 
                        : ''
                    }`}
                    onMouseEnter={() => setHoveredIndex(item.index)}
                    animate={{
                      scale: getScale(item.index),
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 17,
                    }}
                    style={{
                      display: 'inline-block',
                      transformOrigin: 'center',
                    }}
                  >
                    {item.char === ' ' ? '\u00A0' : item.char}
                  </motion.span>
                ))}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} className=''>
              <RotatingText texts={aboutData.rotatingTitles} />
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-lg text-muted-foreground mb-2">
                {aboutData.tagline}
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {aboutData.bio}
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Popover>
                  <PopoverTrigger asChild>
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaFile className="w-4 h-4" />
                      Resume
                    </motion.button>
                  </PopoverTrigger>
                  <PopoverContent side="right" align="center" sideOffset={2} className="w-48 p-2">
                    <div className="flex flex-col gap-1">
                      <a
                        href={contactData.socialLinks.resume.ViewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:border-accent hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                      >
                        <FaEye className="w-4 h-4" />
                        <span className="text-sm font-medium text-white">View Resume</span>
                      </a>
                      <a
                        href={contactData.socialLinks.resume.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:border-accent hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                      >
                        <FaDownload className="w-4 h-4" />
                        <span className="text-sm font-medium text-white">Download PDF</span>
                      </a>
                    </div>
                  </PopoverContent>
                </Popover>
                <motion.button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:border-accent hover:text-accent transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                </motion.button>
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              <div className="mt-8">
                <SocialLinks size="lg" className="justify-center lg:justify-start" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
