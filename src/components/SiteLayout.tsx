import { ArrowUpRight, Github, Linkedin, Mail, Menu, Shapes, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'tmreo123@gmail.com';

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand-mark" to="/" aria-label="Portfolio home" onClick={closeMenu}>
            <Shapes size={25} strokeWidth={1.6} />
          </Link>
          <button className="mobile-menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <NavLink end to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            <NavLink to="/portfolio" onClick={closeMenu}>Portfolio</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            <Link className="button button-dark nav-admin-button" to="/admin/login" onClick={closeMenu}>Admin <ArrowUpRight size={14} /></Link>
          </nav>
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="site-footer">
        <div className="footer-inner">
          <Link className="brand-mark footer-brand" to="/" aria-label="Back to home"><Shapes size={25} strokeWidth={1.6} /></Link>
          <div className="footer-column">
            <p className="footer-heading">Navigation</p>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-column footer-connect">
            <p className="footer-heading">Connect</p>
            <a href={`mailto:${contactEmail}`} aria-label="Email"><Mail size={16} /> Email</a>
            <a href="https://github.com/Xterna1y" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            <a href="https://www.linkedin.com/in/ming-reo-tan-a8178b20a/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
          </div>
          <div className="footer-note">
            <p>Have something in mind?</p>
            <a className="text-link" href={`mailto:${contactEmail}`}>Let's talk <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Your Name</span><span>Designed & built with care.</span></div>
      </footer>
    </div>
  );
}
