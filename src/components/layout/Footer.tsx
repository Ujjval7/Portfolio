import { motion } from 'framer-motion';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { FaHeart } from 'react-icons/fa';
import aboutData from '@/data/about.json';
import { useEffect, useState } from 'react';

export function Footer() {
  const [name, setname] = useState("")
  useEffect(()=>{
    setname((((aboutData.name).toLowerCase()).split(' ')).map(word => ((word.charAt(0)).toUpperCase()) + word.slice(1)).join(' '));  
  },[])
  
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm flex items-center gap-1 font-['Grechen-Fuemen']"
          >
            Built with <FaHeart className="text-accent w-4 h-4 inline" /> by <span className="font-['Charm']">{name}</span> © {new Date().getFullYear()}
          </motion.p>

          <SocialLinks size="sm" />
        </div>
      </div>
    </footer>
  );
}
