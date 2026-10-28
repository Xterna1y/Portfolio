import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
} from 'lucide-react';
import {
  useEffect,
  useState,
} from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import PlaceholderMedia from '../components/PlaceholderMedia';
import { getProjectBySlug } from '../lib/data';
import type { Project } from '../types';

export default function PortfolioItem() {
  const { slug = '' } = useParams();

  const [project, setProject] =
    useState<Project | undefined>();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    let mounted = true;

    async function loadProject() {
      setLoading(true);
      setError('');
      setProject(undefined);

      try {
        const result =
          await getProjectBySlug(slug);

        if (!mounted) return;

        setProject(result);
      } catch (error) {
        console.error(
          'Could not load project:',
          error
        );

        if (!mounted) return;

        setError(
          error instanceof Error
            ? error.message
            : 'Could not load this project.'
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      void loadProject();
    } else {
      setLoading(false);
      setProject(undefined);
    }

    return () => {
      mounted = false;
    };
  }, [slug]);

  /* -------------------------------------------------- */
  /* LOADING */
  /* -------------------------------------------------- */

  if (loading) {
    return (
      <div className="page-container section-pad">
        <p>Loading project…</p>
      </div>
    );
  }

  /* -------------------------------------------------- */
  /* ERROR / NOT FOUND */
  /* -------------------------------------------------- */

  if (error || !project) {
    return (
      <div className="page-container section-pad">
        <p className="eyebrow">
          404 / Project not found
        </p>

        <h1>
          That project isn't here yet.
        </h1>

        {error && (
          <p className="page-lead">
            {error}
          </p>
        )}

        <Link
          to="/portfolio"
          className="text-link"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
      </div>
    );
  }

  const stack = Array.isArray(
    project.tech_stack
  )
    ? project.tech_stack
    : [];

  return (
    <article className="page-container public-page detail-page section-pad">
      {/* -------------------------------------------------- */}
      {/* BACK */}
      {/* -------------------------------------------------- */}

      <Link
        to="/portfolio"
        className="back-link"
      >
        <ArrowLeft size={16} />
        All projects
      </Link>

      {/* -------------------------------------------------- */}
      {/* PROJECT HEADER */}
      {/* -------------------------------------------------- */}

      <div className="detail-heading">
        <div>
          <p className="eyebrow">
            {String(
              project.category ||
                'Project'
            )}{' '}
            /{' '}
            {project.year
              ? String(project.year)
              : 'Year'}
          </p>

          <h1>
            {project.title}
            <span className="heading-period">
              .
            </span>
          </h1>

          {project.summary && (
            <p className="page-lead">
              {project.summary}
            </p>
          )}
        </div>

        <div className="detail-links">
          {project.live_url && (
            <a
              className="button button-dark"
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
            >
              Live project
              <ExternalLink size={15} />
            </a>
          )}

          {project.repo_url && (
            <a
              className="button button-light"
              href={project.repo_url}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={15} />
              Source code
            </a>
          )}
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* COVER IMAGE */}
      {/* -------------------------------------------------- */}

      <PlaceholderMedia
        src={project.cover_image}
        alt={project.title}
        className="detail-cover"
        label="Add a project cover image"
      />

      {/* -------------------------------------------------- */}
      {/* PROJECT DETAILS */}
      {/* -------------------------------------------------- */}

      <div className="detail-columns">
        <section className="detail-main">
          <p className="eyebrow">
            Overview / 01
          </p>

          <h2>
            Making the idea real.
          </h2>

          {project.description ? (
            <div className="detail-description">
              {project.description
                .split(/\n\s*\n/)
                .map(
                  (paragraph, index) => (
                    <p
                      key={`${project.id}-description-${index}`}
                    >
                      {paragraph}
                    </p>
                  )
                )}
            </div>
          ) : (
            <p className="detail-description muted">
              A detailed project
              description will be added
              here.
            </p>
          )}
        </section>

        {/* ------------------------------------------------ */}
        {/* PROJECT FACTS */}
        {/* ------------------------------------------------ */}

        <aside className="detail-facts">
          <div>
            <span>
              My role
            </span>

            <strong>
              {String(
                project.role ||
                  'Add your role'
              )}
            </strong>
          </div>

          <div>
            <span>
              Year
            </span>

            <strong>
              {project.year
                ? String(project.year)
                : 'Add year'}
            </strong>
          </div>

          <div>
            <span>
              Category
            </span>

            <strong>
              {String(
                project.category ||
                  'Project'
              )}
            </strong>
          </div>

          <div>
            <span>
              Technology
            </span>

            <div className="tag-row">
              {stack.length ? (
                stack.map((item) => (
                  <span
                    className="tag"
                    key={item}
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="muted">
                  Add your tech stack
                </span>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* -------------------------------------------------- */}
      {/* BOTTOM CTA */}
      {/* -------------------------------------------------- */}

      <div className="detail-bottom-cta">
        <div>
          <p className="eyebrow">
            More to explore
          </p>

          <h2>
            Keep looking around.
          </h2>
        </div>

        <Link
          className="button button-dark"
          to="/portfolio"
        >
          Browse projects
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}