import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '@/data/projects.json';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const categories = ['All', 'Web Application', 'Backend Service', 'Developer Tool', 'AI/ML'];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Projects"
          subtitle="A showcase of my work and the technologies I've explored"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <StaggerContainer key={activeCategory} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <PortfolioCard className="h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-lg mb-4 group">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    {project.featured && (
                      <span className="absolute top-2 right-2 px-2 py-1 text-xs font-bold bg-accent text-accent-foreground rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {project.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-secondary text-muted-foreground rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 text-xs bg-secondary text-muted-foreground rounded">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FaGithub className="w-4 h-4" />
                        Code
                      </motion.a>
                    )}
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </PortfolioCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatePresence>
      </div>
    </section>
  );
}
