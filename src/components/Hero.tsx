import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { containerStagger, fadeInUp, popIn } from "../lib/motionVariants";
import { useScrollReveal } from "../lib/useScrollReveal";
import "./css/Hero.css"
import heroPhoto from "../../public/Photos/Reo.jpg"; // update path if needed
import { downloadFile } from "../utils/downloadFile";
import ResumeButton from "./ResumeButton";

const Hero: React.FC = () => {
  // Typing animation (keeps your existing behavior)
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const roles = ["Aspiring Software Engineer", "UI/UX Designer", "Problem Solver"];

  useEffect(() => {
    const i = loopNum % roles.length;
    const fullText = roles[i];

    const handleType = () => {
      setText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );
      setTypingSpeed(isDeleting ? 40 : 130);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((n) => n + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, loopNum]);

  // social links (from your resume)
  const socialLinks = [
    { icon: Github, href: "https://github.com/Xterna1y", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ming-reo-tan-a8178b20a/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:tmreo123@gmail.com", label: "Email" },
  ];

  // Motion: parallax for portrait card
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useTransform(py, [-50, 50], [12, -12]);
  const rotateY = useTransform(px, [-50, 50], [-12, 12]);
  const translateX = useTransform(px, (v) => `${v * 0.06}px`);
  const translateY = useTransform(py, (v) => `${v * 0.04}px`);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  // scroll reveal
  const { ref: heroRef, inView: heroInView } = useScrollReveal<HTMLElement>({
    rootMargin: "-140px",
    threshold: 0.05,
    once: true,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden />

      <motion.div
        className="hero-inner"
        variants={containerStagger}
        initial="hidden"
        animate={heroInView ? "show" : "hidden"}
      >
        {/* Left content (kept) */}
        <motion.div className="hero-content" variants={fadeInUp}>
          <motion.h1 className="hero-title" variants={fadeInUp}>
            Hi, I'm <motion.span variants={popIn} className="accent">Reo</motion.span>
          </motion.h1>

          <motion.div className="hero-role" variants={fadeInUp}>
            <span className="typewriter" aria-live="polite">{text}</span>
          </motion.div>

          <motion.p className="hero-description" variants={fadeInUp}>
            Passionate about creating beautiful, functional web applications that solve real-world problems.
            Specializing in modern Typescript frameworks and responsive design.
          </motion.p>

          <motion.div className="hero-buttons" variants={fadeInUp}>
            <motion.a whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className="btn-primary" href="#contact">
              Get In Touch
            </motion.a>

            <motion.div whileHover={{ y: -4 }} style={{ display: "inline-block" }}>
              <ResumeButton className="btn-outline" />
            </motion.div>
          </motion.div>

          <motion.div className="hero-social" variants={fadeInUp}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} whileHover={{ y: -3 }} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-link">
                <Icon size={22} />
              </motion.a>
            ))}
          </motion.div>

          <motion.a className="scroll-down" href="#about" variants={fadeInUp} aria-label="Scroll to about">
            <ArrowDown size={34} />
          </motion.a>
        </motion.div>

        {/* Right: interactive portrait */}
        <motion.div className="hero-photo-wrapper" variants={fadeInUp} style={{ translateX, translateY }}>
          <motion.div
            className="hero-photo-card"
            ref={cardRef}
            style={{ rotateX, rotateY }}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }}
            whileHover={{ scale: 1.03 }}
            onMouseMove={(e) => {
              const rect = cardRef.current?.getBoundingClientRect();
              if (!rect) return;
              const pxv = (e.clientX - rect.left) / rect.width; // 0..1
              const pyv = (e.clientY - rect.top) / rect.height;
              px.set((pxv - 0.5) * 100);
              py.set((pyv - 0.5) * 100);
            }}
            onMouseLeave={() => {
              px.set(0);
              py.set(0);
            }}
            onClick={() => setOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Open portrait"
          >
            <div className="hero-photo-frame">
              <img src={heroPhoto} alt="Orientation Leader — Reo" className="hero-photo" loading="lazy" draggable={false} />
            </div>

          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div className="hero-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div className="hero-modal-content" initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
              <img src={heroPhoto} alt="Orientation Leader — full" className="modal-photo" />
              <div className="modal-caption">Orientation Leader — Taylor's University</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
