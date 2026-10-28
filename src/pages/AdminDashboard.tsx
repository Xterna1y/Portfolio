import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  Wrench,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContactMessages, getRecords } from '../lib/data';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    projects: 0,
    skills: 0,
    workExperience: 0,
    events: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [
          projects,
          technicalSkills,
          softSkills,
          workExperience,
          events,
          messages,
        ] = await Promise.all([
          getRecords('projects'),
          getRecords('technicalSkills'),
          getRecords('softSkills'),
          getRecords('workExperience'),
          getRecords('events'),
          getContactMessages(),
        ]);

        setCounts({
          projects: projects.length,
          skills: technicalSkills.length + softSkills.length,
          workExperience: workExperience.length,
          events: events.length,
          messages: messages.length,
        });
      } catch (error) {
        console.error('Could not load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const cards = [
    {
      title: 'Projects',
      value: counts.projects,
      note: 'Case studies in your portfolio',
      icon: BriefcaseBusiness,
      href: '/admin',
    },
    {
      title: 'Skills',
      value: counts.skills,
      note: 'Technical and soft skills',
      icon: Wrench,
      href: '/admin',
    },
    {
      title: 'Work experience',
      value: counts.workExperience,
      note: 'Professional roles and positions',
      icon: BriefcaseBusiness,
      href: '/admin',
    },
    {
      title: 'Roles & events',
      value: counts.events,
      note: 'Leadership and involvement',
      icon: CalendarDays,
      href: '/admin',
    },
    {
      title: 'Contact messages',
      value: counts.messages,
      note: 'Messages saved in Supabase',
      icon: Mail,
      href: '/admin',
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">Overview</p>

          <h1>
            Dashboard
            <span className="heading-period">.</span>
          </h1>

          <p>
            Here is a quick look at the content powering your portfolio.
          </p>
        </div>

        <Link
          to="/admin"
          className="button button-dark"
        >
          Manage content
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* -------------------------------------------------- */}
      {/* STATISTICS */}
      {/* -------------------------------------------------- */}

      <div className="admin-stats-grid">
        {cards.map(
          ({
            title,
            value,
            note,
            icon: Icon,
            href,
          }) => (
            <Link
              className="admin-stat-card"
              to={href}
              key={title}
            >
              <div className="stat-card-top">
                <span>{title}</span>
                <Icon size={18} />
              </div>

              <div className="stat-number">
                {loading
                  ? '—'
                  : value.toString().padStart(2, '0')}
              </div>

              <p>{note}</p>

              <span className="stat-card-link">
                View details
                <ArrowUpRight size={14} />
              </span>
            </Link>
          )
        )}
      </div>

      {/* -------------------------------------------------- */}
      {/* ANALYTICS */}
      {/* -------------------------------------------------- */}

      <section className="analytics-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">
              Traffic & performance
            </p>

            <h2>Site analytics</h2>
          </div>

          <span className="integration-status">
            <span className="status-dot" />
            Supabase connected
          </span>
        </div>

        <div className="analytics-placeholder">
          <div className="analytics-icon">
            <Activity size={22} />
          </div>

          <div>
            <h3>
              Visitor analytics live in Vercel
            </h3>

            <p>
              Vercel Analytics and Speed Insights can
              collect traffic and performance data after
              deployment. Displaying historical visitor
              totals inside this dashboard requires a
              secure server-side Vercel API integration;
              API tokens should never be exposed in browser
              code.
            </p>

            <a
              className="text-link"
              href="https://vercel.com/docs/analytics"
              target="_blank"
              rel="noreferrer"
            >
              Read analytics setup
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* QUICK ACTIONS */}
      {/* -------------------------------------------------- */}

      <section className="quick-actions-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">
              Keep things current
            </p>

            <h2>Quick actions</h2>
          </div>
        </div>

        <div className="quick-action-grid">
          <Link
            to="/admin"
            className="quick-action"
          >
            <span className="quick-action-icon">
              <BriefcaseBusiness size={19} />
            </span>

            <span>
              <strong>Add a project</strong>
              <small>
                Publish a new case study
              </small>
            </span>

            <ArrowUpRight size={16} />
          </Link>

          <Link
            to="/admin"
            className="quick-action"
          >
            <span className="quick-action-icon">
              <BriefcaseBusiness size={19} />
            </span>

            <span>
              <strong>Add work experience</strong>
              <small>
                Add a professional role
              </small>
            </span>

            <ArrowUpRight size={16} />
          </Link>

          <Link
            to="/admin"
            className="quick-action"
          >
            <span className="quick-action-icon">
              <Wrench size={19} />
            </span>

            <span>
              <strong>Update skills</strong>
              <small>
                Keep your profile up to date
              </small>
            </span>

            <ArrowUpRight size={16} />
          </Link>

          <Link
            to="/admin"
            className="quick-action"
          >
            <span className="quick-action-icon">
              <CalendarDays size={19} />
            </span>

            <span>
              <strong>Add a role or event</strong>
              <small>
                Share an experience or achievement
              </small>
            </span>

            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}