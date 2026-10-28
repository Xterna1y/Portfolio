import {
  BarChart3,
  ExternalLink,
  LogOut,
  Shapes,
  SlidersHorizontal,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminLayout() {
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Shapes size={23} />
          <span>Portfolio CMS</span>
          <span className="admin-badge">ADMIN</span>
        </div>

        <div className="sidebar-label">Workspace</div>

        <NavLink
          end
          to="/admin"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <SlidersHorizontal size={17} />
          Manage content
        </NavLink>

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <BarChart3 size={17} />
          Dashboard
        </NavLink>

        <div className="sidebar-spacer" />

        <a
          className="sidebar-link"
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={17} />
          View public site
        </a>

        <button
          type="button"
          className="sidebar-link sidebar-logout"
          onClick={logout}
        >
          <LogOut size={17} />
          Sign out
        </button>
      </aside>

      <div className="admin-main-wrap">
        <header className="admin-topbar">
          <div>
            <span className="muted">Workspace /</span>{' '}
            <strong>Portfolio</strong>
          </div>

          <span className="admin-topbar-status">
            <span className="status-dot" />
            Supabase connected
          </span>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}