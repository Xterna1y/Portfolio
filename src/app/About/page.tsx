import React, { useRef, useState, useEffect } from "react";
import { User, BookOpen, Award, Briefcase } from "lucide-react";
import "./about.css"; // your main about file (unchanged)
import "./about-skills.css"; // new file with skill-specific styling

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
  ];

  // helper to always produce 4 cells (2x2) per institution
  type Cell = { id: string; label: string; empty?: boolean };
  function makeFour(arr: { id: string; label: string }[]): Cell[] {
    const cells: Cell[] = arr.slice(0, 4).map(x => ({ id: x.id, label: x.label }));
    while (cells.length < 4) cells.push({ id: `placeholder-${cells.length}`, label: "", empty: true });
    return cells;
  }
  const mcklCells = makeFour(mcklRoles);
  const taylorsCells = makeFour(taylorsRoles);

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

  // Technical skills (no numeric percent shown in UI)
  const technicalSkills = [
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

  // Soft skills with percentages (these will show their numbers)
  const softSkills = [
    { name: "Leadership", level: 90 },
    { name: "Project Management", level: 90 },
    { name: "Teamwork", level: 90 },
    { name: "Adaptability", level: 90 },
    { name: "Communication", level: 80 },
    { name: "Public Speaking", level: 70 },
    { name: "Social Skills", level: 70 },
  ];

  // subtab control inside Skills panel
  const [skillSub, setSkillSub] = useState<"technical" | "soft">("technical");

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
          {active === "basic" && (
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

          {active === "coco" && (
            <div>
              <h3 className="coco-heading">Co-curricular Activities</h3>
              <p className="muted">Click any role to view certificates</p>

              <div className="coco-2x2">
                <div className="coco-card">
                  <div className="coco-card-header">MCKL</div>
                  <div className="coco-grid">
                    {mcklCells.map((cell, idx) =>
                      cell.empty ? (
                        <div key={idx} className="coco-role-btn empty" aria-hidden />
                      ) : (
                        <button key={cell.id} className="coco-role-btn" onClick={() => openCerts(cell.id, cell.label)}>
                          {cell.label}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="coco-card">
                  <div className="coco-card-header">Taylor's</div>
                  <div className="coco-grid">
                    {taylorsCells.map((cell, idx) =>
                      cell.empty ? (
                        <div key={idx} className="coco-role-btn empty" aria-hidden />
                      ) : (
                        <button key={cell.id} className="coco-role-btn" onClick={() => openCerts(cell.id, cell.label)}>
                          {cell.label}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "skills" && (
            <div>
              <div className="skills-panel-header">
                <h3 className="panel-title">Technical & Soft Skills</h3>

                <div className="skills-subtabs">
                  <button className={`subtab ${skillSub === "technical" ? "active" : ""}`} onClick={() => setSkillSub("technical")}>Technical Skills</button>
                  <button className={`subtab ${skillSub === "soft" ? "active" : ""}`} onClick={() => setSkillSub("soft")}>Soft Skills</button>
                </div>
              </div>

              {/* Technical skills view — NO numeric percentage displayed, only bars */}
              {skillSub === "technical" && (
                <div className="skills-grid-2col">
                  <div className="skills-column">
                    <h4 className="skills-heading">Frontend</h4>
                    {technicalSkills.slice(0,4).map(s => (
                      <div className="tskill-row" key={s.name}>
                        <div className="tskill-left">{s.name}</div>
                        <div className="tskill-bar">
                          <div className="tskill-fill" style={{ width: `${s.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="skills-column">
                    <h4 className="skills-heading">Backend & Tools</h4>
                    {technicalSkills.slice(4).map(s => (
                      <div className="tskill-row" key={s.name}>
                        <div className="tskill-left">{s.name}</div>
                        <div className="tskill-bar">
                          <div className="tskill-fill" style={{ width: `${s.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Soft skills view — show percentages next to skill label */}
              {skillSub === "soft" && (
                <div className="skills-grid-2col">
                  <div className="skills-column">
                    {softSkills.slice(0, Math.ceil(softSkills.length / 2)).map(s => (
                      <div className="sskill-row" key={s.name}>
                        <div className="sskill-meta">
                          <div className="sskill-name">{s.name}</div>
                          <div className="sskill-num">{s.level}%</div>
                        </div>
                        <div className="sskill-bar"><div className="sskill-fill" style={{ width: `${s.level}%` }} /></div>
                      </div>
                    ))}
                  </div>

                  <div className="skills-column">
                    {softSkills.slice(Math.ceil(softSkills.length / 2)).map(s => (
                      <div className="sskill-row" key={s.name}>
                        <div className="sskill-meta">
                          <div className="sskill-name">{s.name}</div>
                          <div className="sskill-num">{s.level}%</div>
                        </div>
                        <div className="sskill-bar"><div className="sskill-fill" style={{ width: `${s.level}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {active === "exp" && (
            <div>
              <h3 className="panel-title">Work Experience</h3>
              <div className="exp-timeline">
                {/* same as earlier */}
                <div className="exp-item">
                  <div className="exp-left">Nov 2024 – Jan 2025</div>
                  <div className="exp-right">
                    <div className="exp-title">Contract Software Engineer</div>
                    <div className="exp-company">Sensoft Technologies</div>
                    <p className="exp-desc">Short-term contract focusing on software engineering tasks and project delivery.</p>
                  </div>
                </div>

                { /* map the rest */ }
                {[
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
                ].map((job, i) => (
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
