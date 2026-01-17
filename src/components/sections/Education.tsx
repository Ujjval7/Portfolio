import { motion } from 'framer-motion';
import educationData from '@/data/education.json';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { SlideIn } from '@/components/animations/SlideIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { FaGraduationCap, FaCertificate, FaMapMarkerAlt, FaExternalLinkAlt, FaAws } from 'react-icons/fa';
import { SiJira } from 'react-icons/si';
import fallbackImage from "@/assets/fallback.png"

const certIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SiMicrosoftazure: FaAws,
  FaAws,
  SiJira,
};

export function Education() {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Education"
          subtitle="My academic background and professional certifications"
        />

        {/* Degrees */}
        <div className="space-y-8 mb-16">
          {educationData.degrees.map((degree, index) => (
            <SlideIn
              key={degree.id}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.1}
            >
              <PortfolioCard>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                      <img
                        src={degree.logo || fallbackImage}
                        alt={degree.institution}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = fallbackImage;
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-display font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                          {degree.degree}
                        </h3>
                        <p className="text-accent font-medium">{degree.institution}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground text-sm">{degree.period}</p>
                        <p className="text-sm font-semibold text-foreground">GPA: {degree.gpa}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      {degree.location}
                    </div>

                    <p className="text-muted-foreground mb-4">{degree.description}</p>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2">
                      {degree.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-accent/10 text-accent rounded-md"
                        >
                          <FaGraduationCap className="w-3 h-3" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </PortfolioCard>
            </SlideIn>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12">
          <h3 className="text-2xl font-display font-bold text-foreground mb-8 flex items-center gap-3">
            <FaCertificate className="text-accent" />
            Certifications
          </h3>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationData.certifications.map((cert) => {
              const IconComponent = certIconMap[cert.icon];

              return (
                <StaggerItem key={cert.id}>
                  <PortfolioCard className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        {IconComponent ? (
                          <IconComponent className="w-6 h-6 text-accent" />
                        ) : (
                          <FaCertificate className="w-6 h-6 text-accent" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Issued: {cert.date}
                        </p>
                        {cert.credentialUrl && (
                          <motion.a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                            whileHover={{ x: 2 }}
                          >
                            View Credential
                            <FaExternalLinkAlt className="w-3 h-3" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </PortfolioCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
