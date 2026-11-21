import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  ExternalLink,
  Mail,
  RefreshCw,
  Users,
  Wrench,
} from 'lucide-react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import { supabase } from '../lib/supabase';

import {
  getContactMessages,
  getRecords,
} from '../lib/data';

// ======================================================
// TYPES
// ======================================================

type AnalyticsRow = {
  timestamp?: string;
  requestPath?: string;
  referrerHostname?: string;
  visitors?: number;
  pageviews?: number;
};

type AnalyticsData = {
  period: string;

  totals: {
    visitors: number;
    pageviews: number;
  };

  today: {
    visitors: number;
    pageviews: number;
  };

  dailyTraffic: AnalyticsRow[];

  topPages: AnalyticsRow[];

  topReferrers: AnalyticsRow[];

  updatedAt: string;
};

// ======================================================
// HELPERS
// ======================================================

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatDate(value?: string) {
  if (!value) return '';

  return new Date(value).toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'short',
  });
}

// ======================================================
// COMPONENT
// ======================================================

export default function AdminDashboard() {
  // --------------------------------------------------
  // SUPABASE STATISTICS
  // --------------------------------------------------

  const [counts, setCounts] = useState({
    projects: 0,
    skills: 0,
    workExperience: 0,
    events: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // VERCEL ANALYTICS
  // --------------------------------------------------

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [analyticsLoading, setAnalyticsLoading] =
    useState(true);

  const [analyticsError, setAnalyticsError] =
    useState('');

  // --------------------------------------------------
  // LOAD SUPABASE DATA
  // --------------------------------------------------

  useEffect(() => {
    let active = true;

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

        if (!active) return;

        setCounts({
          projects: projects.length,
          skills:
            technicalSkills.length +
            softSkills.length,
          workExperience: workExperience.length,
          events: events.length,
          messages: messages.length,
        });
      } catch (error) {
        console.error(
          'Could not load dashboard data:',
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadDashboardData();

    return () => {
      active = false;
    };
  }, []);

  // --------------------------------------------------
  // LOAD VERCEL ANALYTICS
  // --------------------------------------------------

  const loadAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    setAnalyticsError('');

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (!session?.access_token) {
        throw new Error(
          'Your admin session has expired. Please sign in again.'
        );
      }

      const response = await fetch(
        '/api/admin/analytics',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || 'Could not load Vercel analytics.'
        );
      }

      setAnalytics(result as AnalyticsData);
    } catch (error) {
      console.error(
        'Could not load Vercel analytics:',
        error
      );

      setAnalyticsError(
        error instanceof Error
          ? error.message
          : 'Unable to load analytics.'
      );
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  // --------------------------------------------------
  // STATISTIC CARDS
  // --------------------------------------------------

  const cards = [
    {
      title: 'Projects',
      value: counts.projects,
      note: 'Case studies in your portfolio',
      icon: BriefcaseBusiness,
    },
    {
      title: 'Skills',
      value: counts.skills,
      note: 'Technical and soft skills',
      icon: Wrench,
    },
    {
      title: 'Work experience',
      value: counts.workExperience,
      note: 'Professional roles and positions',
      icon: BriefcaseBusiness,
    },
    {
      title: 'Roles & events',
      value: counts.events,
      note: 'Leadership and involvement',
      icon: CalendarDays,
    },
    {
      title: 'Contact messages',
      value: counts.messages,
      note: 'Messages saved in Supabase',
      icon: Mail,
    },
  ];

  // --------------------------------------------------
  // CHART DATA
  // --------------------------------------------------

  const dailyTraffic = analytics?.dailyTraffic ?? [];

  const maxVisitors = Math.max(
    1,
    ...dailyTraffic.map((item) => item.visitors ?? 0)
  );

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="admin-dashboard">

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

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

      {/* ================================================== */}
      {/* SUPABASE STATISTICS */}
      {/* ================================================== */}

      <div className="admin-stats-grid">
        {cards.map(
          ({ title, value, note, icon: Icon }) => (
            <Link
              className="admin-stat-card"
              to="/admin"
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

      {/* ================================================== */}
      {/* VERCEL ANALYTICS */}
      {/* ================================================== */}

      <section className="analytics-panel">

        <div className="panel-heading">
          <div>
            <p className="eyebrow">
              Traffic & performance
            </p>

            <h2>Site analytics</h2>

            <p>
              Website traffic collected by Vercel.
              {analytics && ` ${analytics.period}.`}
            </p>
          </div>

          <div className="analytics-header-actions">

            <button
              type="button"
              className="analytics-refresh"
              onClick={() => void loadAnalytics()}
              disabled={analyticsLoading}
              aria-label="Refresh analytics"
            >
              <RefreshCw
                size={15}
                className={
                  analyticsLoading ? 'is-spinning' : ''
                }
              />
              Refresh
            </button>

            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="integration-status"
            >
              <span className="status-dot" />
              Vercel Analytics
              <ExternalLink size={12} />
            </a>

          </div>
        </div>

        {/* ERROR */}

        {analyticsError && (
          <div className="analytics-error" role="alert">
            <strong>Analytics unavailable</strong>

            <p>{analyticsError}</p>

            <button
              type="button"
              onClick={() => void loadAnalytics()}
            >
              Try again
            </button>
          </div>
        )}

        {/* LOADING */}

        {analyticsLoading && !analytics && (
          <div className="analytics-loading">
            <Activity size={24} />

            <p>Loading website analytics...</p>
          </div>
        )}

        {/* ANALYTICS DATA */}

        {analytics && (
          <>

            {/* METRIC CARDS */}

            <div className="analytics-metrics-grid">

              <div className="analytics-metric-card">
                <div className="analytics-metric-heading">
                  <span>Unique visitors</span>
                  <Users size={18} />
                </div>

                <strong>
                  {formatNumber(analytics.totals.visitors)}
                </strong>

                <small>
                  Visitors in the last 30 days
                </small>
              </div>

              <div className="analytics-metric-card">
                <div className="analytics-metric-heading">
                  <span>Page views</span>
                  <Eye size={18} />
                </div>

                <strong>
                  {formatNumber(analytics.totals.pageviews)}
                </strong>

                <small>
                  Total page views in the last 30 days
                </small>
              </div>

              <div className="analytics-metric-card">
                <div className="analytics-metric-heading">
                  <span>Visitors today</span>
                  <Users size={18} />
                </div>

                <strong>
                  {formatNumber(analytics.today.visitors)}
                </strong>

                <small>
                  Unique visitors today
                </small>
              </div>

              <div className="analytics-metric-card">
                <div className="analytics-metric-heading">
                  <span>Views today</span>
                  <Activity size={18} />
                </div>

                <strong>
                  {formatNumber(analytics.today.pageviews)}
                </strong>

                <small>
                  Page views today
                </small>
              </div>

            </div>

            {/* DAILY TRAFFIC CHART */}

            <div className="analytics-chart-panel">

              <div className="analytics-section-heading">
                <div>
                  <h3>Daily visitors</h3>

                  <p>
                    Visitor activity over the last 30 days
                  </p>
                </div>
              </div>

              {dailyTraffic.length > 0 ? (
                <div
                  className="analytics-chart"
                  role="img"
                  aria-label="Daily visitors bar chart"
                >
                  {dailyTraffic.map((item, index) => {
                    const visitors = item.visitors ?? 0;

                    const height =
                      (visitors / maxVisitors) * 100;

                    return (
                      <div
                        className="analytics-chart-column"
                        key={`${item.timestamp}-${index}`}
                        title={`${formatDate(item.timestamp)}: ${visitors} visitors`}
                      >
                        <div className="analytics-chart-bar-wrap">
                          <div
                            className="analytics-chart-bar"
                            style={{
                              height: `${Math.max(height, visitors > 0 ? 4 : 0)}%`,
                            }}
                          />
                        </div>

                        <span>
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="analytics-empty">
                  No daily traffic data available yet.
                </p>
              )}

            </div>

            {/* TOP PAGES AND REFERRERS */}

            <div className="analytics-breakdown-grid">

              {/* TOP PAGES */}

              <div className="analytics-breakdown-panel">

                <div className="analytics-section-heading">
                  <div>
                    <h3>Most visited pages</h3>
                    <p>Your popular website pages</p>
                  </div>
                </div>

                {analytics.topPages.length > 0 ? (
                  <div className="analytics-list">

                    {analytics.topPages.map((item, index) => (
                      <div
                        className="analytics-list-item"
                        key={`${item.requestPath}-${index}`}
                      >
                        <div>
                          <strong>
                            {item.requestPath || 'Unknown page'}
                          </strong>

                          <small>
                            {formatNumber(item.visitors ?? 0)} visitors
                          </small>
                        </div>

                        <span>
                          {formatNumber(item.pageviews ?? 0)} views
                        </span>
                      </div>
                    ))}

                  </div>
                ) : (
                  <p className="analytics-empty">
                    No page data available.
                  </p>
                )}

              </div>

              {/* REFERRERS */}

              <div className="analytics-breakdown-panel">

                <div className="analytics-section-heading">
                  <div>
                    <h3>Traffic sources</h3>
                    <p>Where your visitors came from</p>
                  </div>
                </div>

                {analytics.topReferrers.length > 0 ? (
                  <div className="analytics-list">

                    {analytics.topReferrers.map((item, index) => (
                      <div
                        className="analytics-list-item"
                        key={`${item.referrerHostname}-${index}`}
                      >
                        <div>
                          <strong>
                            {item.referrerHostname || 'Direct / Unknown'}
                          </strong>

                          <small>
                            {formatNumber(item.visitors ?? 0)} visitors
                          </small>
                        </div>

                        <span>
                          {formatNumber(item.pageviews ?? 0)} views
                        </span>
                      </div>
                    ))}

                  </div>
                ) : (
                  <p className="analytics-empty">
                    No referral data available yet.
                  </p>
                )}

              </div>

            </div>

            <p className="analytics-updated">
              Last updated:{' '}
              {new Date(analytics.updatedAt).toLocaleString('en-MY')}
            </p>

          </>
        )}

      </section>

      {/* ================================================== */}
      {/* QUICK ACTIONS */}
      {/* ================================================== */}

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
              <small>Publish a new case study</small>
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
              <small>Add a professional role</small>
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
              <small>Keep your profile up to date</small>
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
              <small>Share an experience or achievement</small>
            </span>

            <ArrowUpRight size={16} />
          </Link>

        </div>

      </section>

    </div>
  );
}