import React, { useState } from "react";
import { Code, Database, Zap, Cpu, Palette, Layers } from "lucide-react";
import "./skills.css";

type Category = "frontend" | "backend" | "tools";

type Skill = {
  name: string;
  level: number; // percentage
  description: string;
  icon?: any;
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("frontend");

  // Skills **EXACTLY from your resume**
  const skillsData: Record<Category, Skill[]> = {
    frontend: [
      {
        name: "HTML",
        level: 95,
        description: "Semantic markup, structure, and responsive layouts.",
        icon: Code,
      },
      {
        name: "CSS",
        level: 60,
        description: "Basic styling, layouting and fundamentals.",
        icon: Palette,
      },
      {
        name: "React",
        level: 75,
        description: "Component-based UI development and state handling.",
        icon: Code,
      },
    ],

    backend: [
      {
        name: "C Programming",
        level: 90,
        description: "Memory management, pointers, embedded logic, and algorithms.",
        icon: Cpu,
      },
      {
        name: "Python",
        level: 75,
        description: "Scripting, data handling, basic automation and backend logic.",
        icon: Database,
      },
      {
        name: "SQL",
        level: 50,
        description: "Basic queries, CRUD operations, and relational concepts.",
        icon: Database,
      },
    ],

    tools: [
      {
        name: "Arduino",
        level: 80,
        description: "Hardware programming, sensors, microcontrollers, prototyping.",
        icon: Layers,
      },
      {
        name: "Kotlin",
        level: 40,
        description: "Basic understanding of mobile development and syntax.",
        icon: Zap,
      },
    ],
  };

  const categories = [
    { id: "frontend", label: "Frontend", icon: Code },
    { id: "backend", label: "Backend", icon: Database },
    { id: "tools", label: "Tools", icon: Zap },
  ];

  const getBarClass = (level: number) => {
    if (level >= 90) return "bar-fill--green";
    if (level >= 75) return "bar-fill--blue";
    if (level >= 60) return "bar-fill--yellow";
    return "bar-fill--gray";
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-inner">
        <header className="skills-header">
          <h2 className="skills-title">Technical Skills</h2>
          <p className="skills-sub">
            Comprehensive skillset across frontend, backend, and development tools
          </p>
        </header>

        {/* Category Tabs */}
        <div className="skills-tabs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className={`skills-tab ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id as Category)}
              >
                <Icon className="tab-icon" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skill Cards */}
        <div className="skills-grid">
          {skillsData[activeCategory].map((skill) => {
            const BarColor = getBarClass(skill.level);

            return (
              <div key={skill.name} className="skill-card">
                <div className="skill-row">
                  <div className="skill-left">
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-desc">{skill.description}</div>
                  </div>

                  <div className="skill-right">
                    <div className="skill-percent">{skill.level}%</div>
                  </div>
                </div>

                <div className="skill-bar">
                  <div
                    className={`bar-fill ${BarColor}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
