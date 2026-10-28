import { ArrowUpRight } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import ProjectCard from '../components/ProjectCard';
import { getRecords } from '../lib/data';
import type { Project } from '../types';

export default function Portfolio() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [filter, setFilter] =
    useState('All');

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        const rows =
          await getRecords('projects');

        if (!mounted) return;

        setProjects(
          rows as Project[]
        );
      } catch (error) {
        console.error(
          'Could not load projects:',
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

    void loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories =
      Array.from(
        new Set(
          projects
            .map((project) =>
              String(
                project.category || ''
              ).trim()
            )
            .filter(Boolean)
        )
      );

    return [
      'All',
      ...uniqueCategories,
    ];
  }, [projects]);

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter(
          (project) =>
            project.category ===
            filter
        );

  return (
    <div className="page-container public-page portfolio-page section-pad">
      {/* -------------------------------------------------- */}
      {/* PAGE HEADER */}
      {/* -------------------------------------------------- */}

      <div className="page-title-row">
        <div>
          <p className="eyebrow">
            A collection of work / 02
          </p>

          <h1>
            Portfolio
            <span className="heading-period">
              .
            </span>
          </h1>

          <p className="page-lead">
            Projects, experiments, and ideas
            brought to life.
          </p>
        </div>

        <span className="count-pill">
          {projects.length
            .toString()
            .padStart(2, '0')}{' '}
          {projects.length === 1
            ? 'project'
            : 'projects'}
        </span>
      </div>

      {/* -------------------------------------------------- */}
      {/* FILTERS */}
      {/* -------------------------------------------------- */}

      {!loading &&
        projects.length > 0 && (
          <div
            className="filter-row"
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map(
              (category) => (
                <button
                  key={category}
                  className={`filter-chip ${
                    filter === category
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setFilter(
                      category
                    )
                  }
                >
                  {category}
                </button>
              )
            )}
          </div>
        )}

      {/* -------------------------------------------------- */}
      {/* PROJECT GRID */}
      {/* -------------------------------------------------- */}

      {loading ? (
        <p className="empty-state">
          Loading projects…
        </p>
      ) : filteredProjects.length ? (
        <div className="project-grid">
          {filteredProjects.map(
            (project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            )
          )}
        </div>
      ) : (
        <div className="empty-panel">
          <p className="eyebrow">
            Nothing here yet
          </p>

          <h2>
            Your next project goes here.
          </h2>

          <p>
            Add a project from the admin
            portal and it will show up in
            this grid.
          </p>

          <ArrowUpRight size={22} />
        </div>
      )}
    </div>
  );
}