import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  MoveRight,
} from 'lucide-react';
import {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { getRecords } from '../lib/data';
import type { Project } from '../types';

import hangOutImage from '../images/HangOut.jpg';
import introImage from '../images/Reo.jpg';

export default function Home() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadFeaturedProjects() {
      try {
        const rows =
          await getRecords('projects');

        if (!mounted) return;

        const featured =
          (rows as Project[])
            .filter(
              (project) =>
                project.featured === true
            )
            .slice(0, 3);

        setProjects(featured);
      } catch (error) {
        console.error(
          'Could not load featured projects:',
          error
        );

        if (mounted) {
          setProjects([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadFeaturedProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {/* -------------------------------------------------- */}
      {/* HERO */}
      {/* -------------------------------------------------- */}

      <section className="home-hero">
        <div className="hero-copy page-container">
          <p className="eyebrow eyebrow-light">
            <span className="status-dot" />
            Available for interesting projects
          </p>

          <h1>
            Building thoughtful
            <br />
            <span>
              digital experiences.
            </span>
          </h1>

          <p className="hero-description">
            I'm <strong>Reo</strong> — a
            developer and problem solver
            who enjoys turning complex ideas
            into useful, human-centred
            products.
          </p>

          <div className="hero-actions">
            <Link
              className="button button-white"
              to="/portfolio"
            >
              Explore my work
              <ArrowUpRight size={16} />
            </Link>

            <Link
              className="hero-text-link"
              to="/about"
            >
              A little about me
              <ArrowDownRight size={16} />
            </Link>
          </div>

          <div className="hero-index">
            <span>
              PORTFOLIO / 2026
            </span>

            <span>
              01 — INTRODUCTION
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src={hangOutImage}
            alt="Reo at HangOut Climbing Gym"
          />

          <div className="hero-image-caption">
            <span>
              Curiosity in motion.
            </span>

            <span>
              01 / 04
            </span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* INTRODUCTION */}
      {/* -------------------------------------------------- */}

      <section className="intro-section section-pad page-container">
        <div className="section-aside">
          <span className="section-number">
            01
          </span>

          <span className="section-aside-label">
            A short intro
          </span>
        </div>

        <div className="intro-media-wrap">
          <img
            src={introImage}
            alt="Reo"
          />

          <div className="image-label">
            A little bit of life beyond the
            screen ↗
          </div>
        </div>

        <div className="intro-copy">
          <p className="eyebrow">
            Hello, I'm Reo
          </p>

          <h2>
            Part builder.
            <br />
            Part organiser.
            <br />
            <span>
              Always curious.
            </span>
          </h2>

          <p>
            I enjoy working where
            technology, design, and people
            meet. From building web
            applications to coordinating
            teams and events, I like making
            things that are clear, useful,
            and considered.
          </p>

          <Link
            className="text-link"
            to="/about"
          >
            More about me
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FEATURED PROJECTS */}
      {/* -------------------------------------------------- */}

      <section className="featured-section section-pad">
        <div className="page-container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">
                Selected work / 02
              </p>

              <h2>
                Things I've worked on
                <span className="heading-period">
                  .
                </span>
              </h2>

              <p className="section-intro">
                A few projects that reflect
                the things I like to build and
                the problems I like to solve.
              </p>
            </div>

            <Link
              className="text-link section-heading-link"
              to="/portfolio"
            >
              View all projects
              <MoveRight size={17} />
            </Link>
          </div>

          <div className="project-grid home-project-grid">
            {loading ? (
              <p className="empty-state">
                Loading featured projects…
              </p>
            ) : projects.length ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))
            ) : (
              <p className="empty-state">
                Your featured projects will
                appear here. Add projects and
                mark them as featured from the
                admin portal.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CALL TO ACTION */}
      {/* -------------------------------------------------- */}

      <section className="home-cta section-pad page-container">
        <div>
          <p className="eyebrow">
            Have a project in mind?
          </p>

          <h2>
            Let's make something
            <br />
            <span>
              worth sharing.
            </span>
          </h2>
        </div>

        <Link
          to="/contact"
          className="round-link"
          aria-label="Contact me"
        >
          <ArrowUpRight size={30} />
        </Link>
      </section>
    </>
  );
}