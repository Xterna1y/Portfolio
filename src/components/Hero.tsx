import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import "./css/hero.css";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ["Aspiring Software Engineer", "UI/UX Designer", "Problem Solver"];

  useEffect(() => {
    const i = loopNum % roles.length;
    const fullText = roles[i];

    const handleType = () => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 130);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/reo", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/reo", label: "LinkedIn" },
    { icon: Mail, href: "mailto:reo@example.com", label: "Email" },
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>

      <div className="hero-inner">
        <div className="hero-content">

          {/* Main Title */}
          <h1 className="hero-title">
            Hi, I'm <span className="accent">Reo</span>
          </h1>

          {/* Typing Role */}
          <div className="hero-role">
            <span className="typewriter">{text}</span>
          </div>

          {/* Description */}
          <p className="hero-description">
            Passionate about creating beautiful, functional web applications
            that solve real-world problems. Specializing in modern JavaScript
            frameworks and responsive design.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">
              Get In Touch
            </a>

            <a href="/Reo's Resume.pdf" download className="btn-outline">
              <Download size={20} />
              Download Resume
            </a>
          </div>

          {/* Social Icons */}
          <div className="hero-social">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-link"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>

          {/* Bouncing Arrow */}
          <a href="#about" className="scroll-down">
            <ArrowDown size={34} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
