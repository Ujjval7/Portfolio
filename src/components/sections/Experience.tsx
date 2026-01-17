import { motion } from 'framer-motion';
import experienceData from '@/data/experience.json';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import fallbackImage from "@/assets/fallback.png"

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Experience"
          subtitle="A journey through my professional career and the impact I've made"
        />

        <StaggerContainer className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <StaggerItem key={exp.id}>
                <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <motion.div
                      className="w-4 h-4 bg-accent rounded-full border-4 border-background"
                      whileHover={{ scale: 1.5 }}
                    />
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <PortfolioCard>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img
                            src={exp.logo || fallbackImage}
                            alt={exp.company}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = fallbackImage;
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {exp.role}
                          </h3>
                          <p className="text-accent font-medium">{exp.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-4">{exp.description}</p>

                      {/* Responsibilities */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Responsibilities</h4>
                        <ul className="space-y-1">
                          {exp.responsibilities.slice(0, 3).map((resp, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </PortfolioCard>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
