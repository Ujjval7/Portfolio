import { motion } from 'framer-motion';
import { FaDownload, FaArrowDown } from 'react-icons/fa';
import aboutData from '@/data/about.json';
import contactData from '@/data/contact.json';
import { RotatingText } from '@/components/ui/RotatingText';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { FadeIn } from '@/components/animations/FadeIn';
import profileImage from '@/assets/profile.jpg';

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <FadeIn direction="left" className="flex-shrink-0">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent/20 glow">
                <img
                  src={profileImage}
                  alt={aboutData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status indicator */}
              {aboutData.available && (
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-card px-3 py-1.5 rounded-full shadow-lg border border-border"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Available</span>
                </motion.div>
              )}
            </motion.div>
          </FadeIn>

          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground mb-2 text-lg">Hello, I'm</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
                {aboutData.name}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <RotatingText texts={aboutData.rotatingTitles} />
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-lg text-muted-foreground mt-6 mb-4">
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
                <motion.a
                  href={contactData.socialLinks.resume.downloadUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaDownload className="w-4 h-4" />
                  Download Resume
                </motion.a>
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
