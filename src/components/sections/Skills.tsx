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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
                <h3 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-accent rounded-full" />
                  {categoryLabels[category]}
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
                              <IconComponent className="w-8 h-8 text-accent mb-2 group-hover:scale-110 transition-transform" />
                            )}
                            <span className="text-sm font-medium text-foreground">
                              {skill.name}
                            </span>
                            {/* Proficiency bar */}
                            <div className="w-full h-1 bg-secondary rounded-full mt-2 overflow-hidden">
                              <motion.div
                                className="h-full bg-accent rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.proficiency}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">
                              {skill.yearsOfExperience}+ years
                            </span>
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
