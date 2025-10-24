import { Github, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Xterna1y', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ming-reo-tan-a8178b20a/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:tmreo123@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Your Name</h3>
              <p className="text-gray-400 leading-relaxed">
                Aspiring Software Engineer looking to improve my technical skills
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label={link.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Web Development</li>
                <li>UI/UX Design</li>
                <li>Mobile Apps</li>
                <li>API Development</li>
                <li>Consulting</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>your.email@example.com</p>
                <p>+1 (555) 123-4567</p>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Your Name. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Footer;