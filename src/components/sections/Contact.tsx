import { useState } from 'react';
import { motion } from 'framer-motion';
import contactData from '@/data/contact.json';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { FadeIn } from '@/components/animations/FadeIn';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaCopy, FaCheck } from 'react-icons/fa';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    alert('Message sent! (Demo only)');
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or want to chat? I'd love to hear from you"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <FadeIn direction="left">
            <div className="space-y-6">
              <PortfolioCard>
                <h3 className="text-xl text-sm text-muted-foreground mb-6">
                  Let's Connect
                </h3>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <FaMapMarkerAlt className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{contactData.location}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <FaEnvelope className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${contactData.email}`}
                          className="font-medium text-foreground hover:text-accent transition-colors"
                        >
                          {contactData.email}
                        </a>
                        <motion.button
                          onClick={copyEmail}
                          className="p-1 rounded hover:bg-secondary"
                          whileTap={{ scale: 0.9 }}
                        >
                          {copied ? (
                            <FaCheck className="w-4 h-4 text-green-500" />
                          ) : (
                            <FaCopy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <FaPhone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">{contactData.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-foreground font-medium">
                      {contactData.availability}
                    </span>
                  </div>
                </div>
              </PortfolioCard>

              {/* Social Links */}
              <PortfolioCard>
                <h4 className="font-semibold text-foreground mb-4">Find me on</h4>
                <SocialLinks size="lg" />
              </PortfolioCard>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right">
            <PortfolioCard>
              <h3 className="text-xl font-display font-bold text-foreground mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  hidden
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </PortfolioCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
