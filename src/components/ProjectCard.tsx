import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import PlaceholderMedia from './PlaceholderMedia';

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const tags = Array.isArray(project.tech_stack)
    ? project.tech_stack.slice(0, 3)
    : [];

  return (
    <Link
      className="project-card"
      to={`/portfolio/${project.slug || project.id}`}
    >
      <PlaceholderMedia
        src={project.cover_image}
        alt={project.title}
        className="project-card-media"
        label="Project image"
      />

      <div className="project-card-content">
        <div className="card-kicker-row">
          <span className="eyebrow">
            {String(project.category || 'Project')}
          </span>

          <ArrowUpRight
            size={16}
            aria-hidden="true"
          />
        </div>

        <h3>{project.title}</h3>

        <p>{project.summary}</p>

        <div className="tag-row">
          {tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}