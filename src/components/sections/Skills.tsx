import { motion } from 'framer-motion';
import skillsData from '@/data/skills.json';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { SlideIn } from '@/components/animations/SlideIn';
import {
  FaReact, FaVuejs, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaServer, FaInfinity, FaDatabase
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiTailwindcss, SiNextdotjs, SiDotnet, SiSharp, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiKubernetes
} from 'react-icons/si';
import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaServer,
  FaInfinity,
  FaDatabase,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiDotnet,
  SiCsharp: SiSharp,
  SiGraphql,
  SiMicrosoftsqlserver: FaDatabase,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMicrosoftazure: FaAws,
  SiKubernetes,
};

const iconColors: Record<string, string> = {
  FaReact: '#61DAFB',
  FaVuejs: '#4FC08D',
  FaNodeJs: '#339933',
  FaPython: '#3776AB',
  FaGitAlt: '#F05032',
  FaDocker: '#2496ED',
  FaAws: '#232F3E',
  FaServer: '#FFB13B',
  FaInfinity: '#666666',
  FaDatabase: '#336791',
  SiTypescript: '#3178C6',
  SiJavascript: '#F7DF1E',
  SiTailwindcss: '#06B6D4',
  SiNextdotjs: '#000000',
  SiDotnet: '#512BD4',
  SiCsharp: '#239120',
  SiGraphql: '#E10098',
  SiMicrosoftsqlserver: '#CC2927',
  SiPostgresql: '#4169E1',
  SiMongodb: '#47A248',
  SiRedis: '#DC382D',
  SiMicrosoftazure: '#0078D4',
  SiKubernetes: '#326CE5',
};

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  tools: 'Tools & DevOps',
};

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Skills"
          subtitle="Technologies and tools I work with to bring ideas to life"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <SlideIn
              key={category}
              direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
              delay={categoryIndex * 0.1}
            >
              <PortfolioCard className="h-full">
                <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-accent rounded-full" />
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {categoryLabels[category]}
                  </span>
                </h3>

                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skills.map((skill) => {
                    const IconComponent = iconMap[skill.icon];

                    return (
                      <StaggerItem key={skill.name}>
                        <motion.div
                          className="group p-4 rounded-lg bg-background border border-border hover:border-accent/50 transition-colors"
                          whileHover={{ y: -2 }}
                        >
                          <div className="flex flex-col items-center text-center">
                            {IconComponent && (
                              <IconComponent 
                                className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform"
                                color={iconColors[skill.icon]}
                              />
                            )}
                            <span className="text-sm font-medium text-foreground font-['Space_Grotesk']">
                              {skill.name}
                            </span>
                            {/* Proficiency bar
                            <div className="w-full h-1 bg-secondary rounded-full mt-2 overflow-hidden">
                              <motion.div
                                className="h-full bg-accent rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.proficiency}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                            <span className="text-xsgi text-muted-foreground mt-1">
                              {skill.yearsOfExperience}+ years
                            </span> */}
                          </div>
                        </motion.div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </PortfolioCard>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
