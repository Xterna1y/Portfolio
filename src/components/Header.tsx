import React from "react";
import "./css/header.css";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const Header: React.FC = () => {
  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        <a className="site-logo" href="#home" aria-label="Reo — home">
          Reo
        </a>

        <nav className="site-nav" role="navigation" aria-label="Main navigation">
          <ul className="site-nav__list">
            {navItems.map((item) => (
              <li key={item.href} className="site-nav__item">
                <a className="site-nav__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* mobile hamburger (optional, non-functional placeholder - replace with your component if you want) */}
        <button
          className="site-hamburger"
          aria-label="Open menu"
          onClick={() => {
            // if you have a mobile menu, toggle it here
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
