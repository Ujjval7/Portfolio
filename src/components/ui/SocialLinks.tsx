import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaFileDownload } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import contactData from '@/data/contact.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  SiGmail,
  FaFileDownload,
};

interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SocialLinks({ size = 'md', className = '' }: SocialLinksProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const links = Object.entries(contactData.socialLinks).map(([key, value]) => ({
    key,
    ...value,
  }));

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => {
        const IconComponent = iconMap[link.icon];
        if (!IconComponent) return null;

        return (
          <motion.a
            key={link.key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label={link.key}
          >
            <IconComponent className={sizeClasses[size]} />
          </motion.a>
        );
      })}
    </div>
  );
}
