import React, { useRef, useState, useEffect } from "react";
import { User, BookOpen, Award, Briefcase, Code, Target } from "lucide-react";
import "./about.css";

type TabKey = "basic" | "coco" | "skills" | "exp";

const certs: Record<string, { title: string; url?: string }[]> = {
  "mckl-sports-president": [{ title: "Sports Club President — Certificate", url: "/certs/mckl_sports_president.jpg" }],
  "mckl-pac": [{ title: "PAC Committee — Certificate", url: "/certs/mckl_pac.jpg" }],
  "mckl-prom-cochair": [{ title: "Prom Night Co-chair — Certificate", url: "/certs/mckl_prom_cochair.jpg" }],
  "mckl-orientation-2022": [{ title: "Orientation Camp 2022 — Certificate", url: "/certs/mckl_orientation_2022.jpg" }],

  "taylors-orientation-leader": [{ title: "Orientation Leader — Certificate", url: "/certs/taylors_orientation_leader.jpg" }],
  "taylors-project-manager": [{ title: "Project Manager — Taylor's Explorer — Certificate", url: "/certs/taylors_project_manager.jpg" }],
  "taylors-tech-lead": [{ title: "Technical Team Lead — Agents Of Tech — Certificate", url: "/certs/taylors_tech_lead.jpg" }],
};

const About: React.FC = () => {
  const [active, setActive] = useState<TabKey>("basic");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItems, setModalItems] = useState<{ title: string; url?: string }[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);

  const personal = {
    name: "Tan Ming Reo",
    summary:
      "Aspiring software engineer with strong academic achievements, leadership in extracurriculars and hands-on internship/contract experience.",
    phone: "+60 12-802-5770",
    email: "tmreo123@gmail.com",
    address:
      "A-07-31, D'Latour, Jalan Taylors, Bandar Sunway, Pjs7, 47500 Subang Jaya, Selangor",
  };

  const education = [
    { school: "Taylor's University, Malaysia", degree: "B. Software Engineering (ongoing)", period: "Feb 2025 – Present" },
    { school: "Methodist College Kuala Lumpur (Penang Branch)", degree: "Diploma in IT — CGPA: 3.94 (Dean's List)", period: "May 2022 – Aug 2024" },
    { school: "ChinzeiGakuin High School, Nagasaki, Japan", degree: "Exchange Programme (Asia Kakehashi)", period: "Oct 2021 – Mar 2022" },
  ];

  // role lists (as previously)
  const mcklRoles = [
    { id: "mckl-sports-president", label: "Sports Club President" },
    { id: "mckl-pac", label: "PAC Committee" },
    { id: "mckl-prom-cochair", label: "Prom Night Co-chairman" },
    { id: "mckl-orientation-2022", label: "Organising committee — Orientation Camp 2022" },
  ];

  const taylorsRoles = [
    { id: "taylors-orientation-leader", label: "Orientation Leader" },
    { id: "taylors-project-manager", label: "Project Manager — Taylor's Explorer" },
    { id: "taylors-tech-lead", label: "Technical Team Lead — Agents Of Tech" },
    // Optional placeholder slot — include a placeholder role if you have one,
    // otherwise it will render an empty disabled cell (keeps 2x2 layout).
  ];

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  function openCerts(roleId: string, roleLabel: string) {
    const items = certs[roleId] ?? [{ title: `${roleLabel} — Certificate`, url: undefined }];
    setModalItems(items);
    setModalTitle(roleLabel);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalItems([]);
    setModalTitle("");
  }

// define a small concrete type for grid cells
type Cell = {
  id: string;
  label: string;
  empty?: boolean;
};

// helper: ensure exactly 4 cells (2x2). Returns Cell[]
function makeFour(arr: { id: string; label: string }[]): Cell[] {
  const cells: Cell[] = arr.slice(0, 4).map((x) => ({ id: x.id, label: x.label, empty: false }));

  while (cells.length < 4) {
    const idx = cells.length;
    cells.push({ id: `placeholder-${idx}`, label: "", empty: true });
  }

  return cells;
}

// usage
const mcklCells: Cell[] = makeFour(mcklRoles);
const taylorsCells: Cell[] = makeFour(taylorsRoles);


  const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Vue.js", level: 70 },
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "Git", level: 90 },
    { name: "Docker", level: 75 },
    { name: "AWS", level: 70 },
    { name: "Vite", level: 85 },
  ];

  const experience = [
    {
      title: "Contract Software Engineer",
      company: "Sensoft Technologies",
      period: "Nov 2024 – Jan 2025",
      description: "Short-term contract focusing on software engineering tasks and project delivery.",
    },
    {
      title: "IT Infrastructure Intern",
      company: "UOB KayHian Securities (Penang)",
      period: "Jun 2024 – Aug 2024",
      description: "IT support and infrastructure tasks during internship.",
    },
    {
      title: "Indoor Rock-Climbing Instructor (Part-time)",
      company: "HangOut Climbing Gym",
      period: "2019 – 2024",
      description: "Coaching, safety and customer experience at the climbing gym.",
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <header className="about-header">
          <h2 className="about-title">About Me</h2>
          <p className="about-sub">{personal.summary}</p>
        </header>

        <div className="tabs-wrap">
          <nav className="tabs" role="tablist" aria-label="About tabs">
            <button className={`tab-btn ${active === "basic" ? "active" : ""}`} onClick={() => setActive("basic")}><User size={14} /> Basic info</button>
            <button className={`tab-btn ${active === "coco" ? "active" : ""}`} onClick={() => setActive("coco")}><BookOpen size={14} /> Co-curricular Activities</button>
            <button className={`tab-btn ${active === "skills" ? "active" : ""}`} onClick={() => setActive("skills")}><Award size={14} /> Skills</button>
            <button className={`tab-btn ${active === "exp" ? "active" : ""}`} onClick={() => setActive("exp")}><Briefcase size={14} /> Experience</button>
          </nav>
        </div>

        <div ref={panelRef} className="panel">
          {/* Basic, Skills, Exp sections omitted here for brevity — assume they are same as earlier implementation */}
          {active === "basic" && (
            /* ... basic content ... */
            <div className="basic-grid">
              <div className="card contact-card">
                <h3 className="card-title">Contact</h3>
                <div className="lead">{personal.name}</div>
                <ul className="contact-list">
                  <li><strong>Email:</strong> <a href={`mailto:${personal.email}`}>{personal.email}</a></li>
                  <li><strong>Phone:</strong> <a href={`tel:${personal.phone}`}>{personal.phone}</a></li>
                  <li><strong>Address:</strong> {personal.address}</li>
                </ul>
                <div className="edu-block">
                  <h4 className="subhead">Education</h4>
                  {education.map((e, i) => (
                    <div key={i} className="edu-row">
                      <div className="edu-school">{e.school}</div>
                      <div className="edu-meta">{e.degree} • <span className="muted">{e.period}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="card highlights-card">
                <h3 className="card-title">Highlights</h3>
                <div className="high-grid">
                  <div className="stat">
                    <div className="stat-num">Nov 2024</div>
                    <div className="stat-label">Contract role</div>
                  </div>
                  <div className="stat">
                    <div className="stat-num">Jun–Aug 2024</div>
                    <div className="stat-label">IT Internship</div>
                  </div>
                  <div className="stat">
                    <div className="stat-num">2019–2024</div>
                    <div className="stat-label">Part-time instructor</div>
                  </div>
                </div>

                <h4 className="subhead">Languages</h4>
                <div className="languages">
                  <span className="badge">English</span>
                  <span className="badge">Bahasa Melayu</span>
                  <span className="badge">Mandarin</span>
                </div>
              </aside>
            </div>
          )}

          {/* Co-curricular: now renders a strict 2x2 per institution */}
          {active === "coco" && (
            <div>
              <h3 className="coco-heading">Co-curricular Activities</h3>
              <p className="muted">Click any role to view certificates</p>

              <div className="coco-2x2">
                {/* MCKL: ALWAYS 4 cells (2x2) */}
                <div className="coco-card">
                  <div className="coco-card-header">MCKL</div>
                  <div className="coco-grid">
                    {mcklCells.map((cell, idx) => {
                      if (cell.empty) {
                        return (
                          <div key={idx} className="coco-role-btn empty" aria-hidden>
                            {/* placeholder */}
                          </div>
                        );
                      }
                      return (
                        <button
                          key={cell.id}
                          className="coco-role-btn"
                          onClick={() => openCerts(cell.id!, cell.label!)}
                        >
                          {cell.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* TAYLOR'S: ALWAYS 4 cells (2x2) */}
                <div className="coco-card">
                  <div className="coco-card-header">Taylor's</div>
                  <div className="coco-grid">
                    {taylorsCells.map((cell, idx) => {
                      if (cell.empty) {
                        return (
                          <div key={idx} className="coco-role-btn empty" aria-hidden />
                        );
                      }
                      return (
                        <button
                          key={cell.id}
                          className="coco-role-btn"
                          onClick={() => openCerts(cell.id!, cell.label!)}
                        >
                          {cell.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SKILLS */}
          {active === "skills" && (
            <div>
              <h3 className="panel-title">Technical Skills</h3>
              <div className="skills-columns">
                <div className="skills-column">
                  <h4 className="skills-heading">Frontend</h4>
                  {skills.slice(0, 4).map((s) => (
                    <div key={s.name} className="skill-row">
                      <div className="skill-meta">
                        <span className="skill-name">{s.name}</span>
                        <span className="skill-level">{s.level}%</span>
                      </div>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: `${s.level}%` }} /></div>
                    </div>
                  ))}
                </div>

                <div className="skills-column">
                  <h4 className="skills-heading">Backend & Tools</h4>
                  {skills.slice(4).map((s) => (
                    <div key={s.name} className="skill-row">
                      <div className="skill-meta">
                        <span className="skill-name">{s.name}</span>
                        <span className="skill-level">{s.level}%</span>
                      </div>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: `${s.level}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {active === "exp" && (
            <div>
              <h3 className="panel-title">Work Experience</h3>
              <div className="exp-timeline">
                {experience.map((job, i) => (
                  <div className="exp-item" key={i}>
                    <div className="exp-left">{job.period}</div>
                    <div className="exp-right">
                      <div className="exp-title">{job.title}</div>
                      <div className="exp-company">{job.company}</div>
                      <p className="exp-desc">{job.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={modalTitle}>
          <div className="modal">
            <div className="modal-header">
              <h4>{modalTitle}</h4>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              {modalItems.map((it, idx) => (
                <div key={idx} className="cert-row">
                  <div className="cert-title">{it.title}</div>
                  {it.url ? (
                    <div className="cert-actions">
                      <a className="cert-view" href={it.url} target="_blank" rel="noreferrer">View</a>
                      <a className="cert-download" href={it.url} download>Download</a>
                    </div>
                  ) : (
                    <div className="cert-missing muted">Certificate file not uploaded yet.</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
