import {
  ArrowDownToLine,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import PlaceholderMedia from '../components/PlaceholderMedia';
import {
  getRecords,
} from '../lib/data';
import type { AdminRecord } from '../types';

type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  alt_text: string;
  category: string;
  created_at?: string;
};

export default function About() {
  const [workExperience, setWorkExperience] = useState<AdminRecord[]>([]);
  const [events, setEvents] = useState<AdminRecord[]>([]);
  const [technicalSkills, setTechnicalSkills] = useState<AdminRecord[]>([]);
  const [softSkills, setSoftSkills] = useState<AdminRecord[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [resume, setResume] = useState<AdminRecord | undefined>();

  useEffect(() => {
    async function loadAboutData() {
      try {
        const [
          workExperienceRows,
          eventRows,
          technicalRows,
          softRows,
          galleryRows,
          resumeRows,
        ] = await Promise.all([
          getRecords('workExperience'),
          getRecords('events'),
          getRecords('technicalSkills'),
          getRecords('softSkills'),
          getRecords('gallery'),
          getRecords('resume'),
        ]);

        setWorkExperience(workExperienceRows);
        setEvents(eventRows);
        setTechnicalSkills(technicalRows);
        setSoftSkills(softRows);
        setGallery(galleryRows as GalleryItem[]);

        setResume(
          resumeRows.find((item) => item.active) ?? resumeRows[0]
        );
      } catch (error) {
        console.error('Could not load About page data:', error);
      }
    }

    loadAboutData();
  }, []);

  const resumeUrl = String(resume?.file_url ?? '');

  const categories = Array.from(
    new Set(
      technicalSkills.map(
        (skill) => String(skill.category || 'Other')
      )
    )
  );

  const gymPhoto = gallery.find(
    (item) => item.title.toLowerCase() === 'gym'
  );

  const climbing2Photo = gallery.find(
    (item) => item.title.toLowerCase() === 'climbing 2'
  );

  return (
    <div className="public-page about-page">
      {/* -------------------------------------------------- */}
      {/* ABOUT INTRO */}
      {/* -------------------------------------------------- */}

      <section className="about-top section-pad page-container">
        <div className="page-title-row about-title-row">
          <div>
            <p className="eyebrow">A little context / 03</p>

            <h1>
              About me
              <span className="heading-period">.</span>
            </h1>

            <p className="page-lead">
              The work, people, and experiences that have shaped how I think.
            </p>
          </div>

          <span className="signature-note">
            <Sparkles size={17} />
            Always learning
          </span>
        </div>

        {/* -------------------------------------------------- */}
        {/* ABOUT PHOTOS */}
        {/* -------------------------------------------------- */}

        <div className="about-photo-grid">
          <PlaceholderMedia
            src={gymPhoto?.image_url}
            alt={gymPhoto?.alt_text || 'Reo at the gym'}
            className="about-photo"
            label="Add a gym photo"
          />

          <PlaceholderMedia
            src={climbing2Photo?.image_url}
            alt={climbing2Photo?.alt_text || 'Reo climbing'}
            className="about-photo"
            label="Add a climbing photo"
          />
        </div>

        {/* -------------------------------------------------- */}
        {/* ABOUT STORY */}
        {/* -------------------------------------------------- */}

        <div className="about-story-grid">
          <div>
            <p className="eyebrow">Beyond the job title</p>

            <h2>
              Interested in the
              <br />
              why, not just the <span>what.</span>
            </h2>
          </div>

          <div className="about-story-copy">
            <p>
              I'm someone who enjoys learning by doing: understanding a
              problem, working with people who see it differently, and
              turning the messy middle into something useful.
            </p>

            <p>
              My interests span software development, user experience,
              and organising people around a shared goal. This page is a
              living snapshot of the roles I've taken on, the skills I'm
              building, and the moments that have taught me something.
            </p>

            <div className="resume-actions">
              {resumeUrl ? (
                <a
                  className="button button-dark"
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download resume
                  <ArrowDownToLine size={16} />
                </a>
              ) : (
                <span className="resume-placeholder-note">
                  Add your resume PDF in Admin → Resume to enable download.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* WORK EXPERIENCE */}
      {/* -------------------------------------------------- */}

      <section className="about-experience section-pad">
        <div className="page-container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">01 / Work experience</p>

              <h2>
                Where I've worked
                <span className="heading-period">.</span>
              </h2>
            </div>

            <p className="section-intro">
              Professional experiences where I've had the opportunity
              to build, contribute, and learn.
            </p>
          </div>

          <div className="experience-list">
            {workExperience.length > 0 ? (
              workExperience.map((experience, index) => (
                <article
                  className="experience-item"
                  key={String(experience.id)}
                >
                  <div className="experience-index">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="experience-body">
                    <div className="experience-heading">
                      <h3>
                        {String(
                          experience.company ||
                            'Company'
                        )}
                      </h3>

                      <span>
                        {experience.period
                          ? String(experience.period)
                          : ''}
                      </span>
                    </div>

                    <p className="experience-role">
                      {String(experience.position || '')}
                    </p>

                    <p>
                      {String(experience.description || '')}
                    </p>
                  </div>

                  <ArrowUpRight
                    className="experience-arrow"
                    size={18}
                  />
                </article>
              ))
            ) : (
              <p className="resume-placeholder-note">
                No work experience has been added yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* ROLES & EVENTS */}
      {/* -------------------------------------------------- */}

      <section className="about-experience section-pad">
        <div className="page-container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">02 / Leadership & involvement</p>

              <h2>
                Roles & experiences
                <span className="heading-period">.</span>
              </h2>
            </div>

            <p className="section-intro">
              The people and activities that gave me room to contribute,
              lead, and learn outside of work.
            </p>
          </div>

          <div className="experience-list">
            {events.length > 0 ? (
              events.map((event, index) => (
                <article
                  className="experience-item"
                  key={String(event.id)}
                >
                  <div className="experience-index">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="experience-body">
                    <div className="experience-heading">
                      <h3>
                        {String(
                          event.name ||
                            'Untitled experience'
                        )}
                      </h3>

                      <span>
                        {String(event.period || '')}
                      </span>
                    </div>

                    <p className="experience-role">
                      {String(event.role || '')}
                    </p>

                    <p>
                      {String(event.description || '')}
                    </p>
                  </div>

                  <ArrowUpRight
                    className="experience-arrow"
                    size={18}
                  />
                </article>
              ))
            ) : (
              <p className="resume-placeholder-note">
                No roles or events have been added yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* SKILLS */}
      {/* -------------------------------------------------- */}

      <section className="skills-section section-pad page-container">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">03 / What I bring</p>

            <h2>
              Skills & strengths
              <span className="heading-period">.</span>
            </h2>
          </div>

          <p className="section-intro">
            A mix of tools I work with and the way I like to work
            with people.
          </p>
        </div>

        <div className="skills-grid">
          {/* TECHNICAL SKILLS */}

          <div className="skill-panel">
            <h3>Technical skills</h3>

            <p>
              Tools and technologies I'm learning and using.
            </p>

            {categories.map((category) => (
              <div
                className="skill-category"
                key={category}
              >
                <p>{category}</p>

                <div className="skill-chip-list">
                  {technicalSkills
                    .filter(
                      (skill) =>
                        String(
                          skill.category || 'Other'
                        ) === category
                    )
                    .map((skill) => (
                      <span
                        className="skill-chip"
                        key={String(skill.id)}
                      >
                        {String(skill.name)}

                        {skill.level ? (
                          <small>
                            {String(skill.level)}
                          </small>
                        ) : null}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* SOFT SKILLS */}

          <div className="skill-panel soft-skills-panel">
            <h3>Soft skills</h3>

            <p>
              How I try to show up in a team.
            </p>

            <div className="soft-skill-list">
              {softSkills.map((skill, index) => (
                <div
                  className="soft-skill-row"
                  key={String(skill.id)}
                >
                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h4>
                      {String(skill.name)}
                    </h4>

                    <p>
                      {String(
                        skill.description || ''
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* GALLERY */}
      {/* -------------------------------------------------- */}

      <section className="gallery-section section-pad">
        <div className="page-container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">
                04 / Outside the browser
              </p>

              <h2>
                A few moments
                <span className="heading-period">.</span>
              </h2>
            </div>

            <p className="section-intro">
              A small gallery of the people, places, and experiences
              around the work.
            </p>
          </div>

          <div className="gallery-grid">
            {gallery.map((item) => (
              <figure className="gallery-item" key={item.id}>
                <div className="gallery-item-media">
                  <PlaceholderMedia
                    src={item.image_url}
                    alt={item.alt_text || item.title}
                    label={item.title}
                  />
                </div>

                <figcaption className="gallery-item-caption">
                  {/* <p className="gallery-item-title">
                    {item.title}
                  </p> */}

                  {item.category && (
                    <p className="gallery-item-category">
                      {item.category}
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}