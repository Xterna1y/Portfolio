import React, { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail, Instagram} from "lucide-react";
import "./css/footer.css";


const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/Xterna1y", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ming-reo-tan-a8178b20a/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/o_reo_tan/", label: "Instagram" },
    { icon: Mail, href: "mailto:tmreo123@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const contact = {
    email: "tmreo123@gmail.com",
    phone: "+60 12-802-5770",
    location: "Sunway, Pjs7, 47500 Subang Jaya, Selangor, Malaysia",
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer-dark" role="contentinfo">
      <div className="footer-dark__inner">

        <div className="footer-dark__grid">
          {/* Brand */}
          <div className="footer-col footer-col--brand">
            <h3 className="footer-brand">Reo</h3>
            <p className="footer-tag">
              Creating beautiful and functional web experiences
            </p>

            <div className="footer-socials">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className="social-btn"
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col footer-col--links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a className="footer-link" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col footer-col--contact">
            <h4 className="footer-heading">Contact</h4>

            <a className="contact-row" href={`mailto:${contact.email}`}>
              <span className="contact-label">Email</span>
              <span className="contact-value">{contact.email}</span>
            </a>

            <a className="contact-row" href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
              <span className="contact-label">Phone</span>
              <span className="contact-value">{contact.phone}</span>
            </a>

            <div className="contact-row">
              <span className="contact-label">Location</span>
              <span className="contact-value">{contact.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-dark__bottom">
          <div className="footer-copyright">
            © 2025 Reo. All rights reserved.
          </div>
          <div className="footer-legal">
            <a className="footer-legal__link" href="#privacy">Privacy</a>
            <a className="footer-legal__link" href="#terms">Terms</a>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          className="footer-scrolltop"
          aria-label="Scroll to top"
          onClick={scrollToTop}
        >
          <ArrowUp size={16} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
