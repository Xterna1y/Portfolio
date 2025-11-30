import React, { useState } from "react";
import { Code, Database, Zap, Cpu, Palette, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { progressBar, containerStagger, fadeInUp } from "../../lib/motionVariants";
import { useScrollReveal } from "../../lib/useScrollReveal";
import "./skills.css";

type Category = "frontend" | "backend" | "tools";

type Skill = {
  name: string;
  level: number;
  description: string;
  icon?: any;
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("frontend");

  // Skills taken from resume
  const skillsData: Record<Category, Skill[]> = {
    frontend: [
      { name: "HTML", level: 95, description: "Semantic markup, structure, and responsive layouts.", icon: Code },
      { name: "CSS", level: 60, description: "Basic styling, layouting and fundamentals.", icon: Palette },
      { name: "React", level: 75, description: "Component-based UI development and state handling.", icon: Code },
    ],
    backend: [
      { name: "C Programming", level: 90, description: "Memory management, pointers, embedded logic, and algorithms.", icon: Cpu },
      { name: "Python", level: 75, description: "Scripting, data handling, basic automation and backend logic.", icon: Database },
      { name: "SQL", level: 50, description: "Basic queries, CRUD operations, and relational concepts.", icon: Database },
    ],
    tools: [
      { name: "Arduino", level: 80, description: "Hardware programming, sensors, microcontrollers, prototyping.", icon: Layers },
      { name: "Kotlin", level: 40, description: "Basic understanding of mobile development and syntax.", icon: Zap },
    ],
  };

  const categories = [
    { id: "frontend", label: "Frontend", icon: Code },
    { id: "backend", label: "Backend", icon: Database },
    { id: "tools", label: "Tools", icon: Zap },
  ] as const;

  const { ref: skillsRef, inView: skillsInView } = useScrollReveal<HTMLDivElement>({
    rootMargin: "-100px",
    threshold: 0.05,
    once: true,
  });

  const getBarClass = (level: number) => {
    if (level >= 90) return "bar-fill--green";
    if (level >= 75) return "bar-fill--blue";
    if (level >= 60) return "bar-fill--yellow";
    return "bar-fill--gray";
  };

  return (
    <section id="skills" className="skills-section" ref={skillsRef} aria-labelledby="skills-heading">
      <motion.div className="skills-inner" variants={containerStagger} initial="hidden" animate={skillsInView ? "show" : "hidden"}>
        <motion.header className="skills-header" variants={fadeInUp}>
          <h2 id="skills-heading" className="skills-title">Technical Skills</h2>
          <p className="skills-sub">Comprehensive skillset across frontend, backend, and development tools</p>
        </motion.header>

        <motion.div className="skills-tabs" variants={fadeInUp} role="tablist" aria-label="Skill categories">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                className={`skills-tab ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id as Category)}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls={`skills-panel-${cat.id}`}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="tab-icon" />
                <span>{cat.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="skills-grid" id={`skills-panel-${activeCategory}`} role="region" aria-live="polite">
          {skillsData[activeCategory].map((skill) => {
            const BarColor = getBarClass(skill.level);
            return (
              <motion.div key={skill.name} className="skill-card" variants={fadeInUp} whileHover={{ y: -6 }} role="article" aria-label={`${skill.name} skill`}>
                <div className="skill-row">
                  <div className="skill-left">
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-desc">{skill.description}</div>
                  </div>

                  <div className="skill-right">
                    <div className="skill-percent" aria-hidden>{skill.level}%</div>
                  </div>
                </div>

                <div className="skill-bar" aria-hidden>
                  <div className="bar-track">
                    <motion.div className={`bar-fill ${BarColor}`} custom={skillsInView ? skill.level : 0} variants={progressBar} initial="hidden" animate={skillsInView ? "show" : "hidden"} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
