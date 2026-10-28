import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import {
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import AdminLayout from './components/AdminLayout';
import SiteLayout from './components/SiteLayout';

import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminManagement from './pages/AdminManagement';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import PortfolioItem from './pages/PortfolioItem';

import { supabase } from './lib/supabase';

/* ====================================================== */
/* ADMIN GUARD */
/* ====================================================== */

function AdminGuard({
  children,
}: {
  children: ReactNode;
}) {
  const location = useLocation();

  const [checking, setChecking] =
    useState(true);

  const [allowed, setAllowed] =
    useState(false);

  useEffect(() => {
    let active = true;

    async function checkAdminAccess() {
      setChecking(true);

      try {
        /*
         * First check whether the user has an
         * authenticated Supabase session.
         */
        const {
          data: sessionData,
          error: sessionError,
        } =
          await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        const user =
          sessionData.session?.user;

        if (!user) {
          if (active) {
            setAllowed(false);
            setChecking(false);
          }

          return;
        }

        /*
         * Authentication alone does not grant
         * administrator access.
         *
         * The user must also exist in
         * public.admin_profiles with role = admin.
         */
        const {
          data: adminProfile,
          error: adminError,
        } = await supabase
          .from('admin_profiles')
          .select('id, email, role')
          .eq('id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (adminError) {
          throw adminError;
        }

        if (active) {
          setAllowed(
            Boolean(adminProfile)
          );

          setChecking(false);
        }
      } catch (error) {
        console.error(
          'Could not verify admin access:',
          error
        );

        if (active) {
          setAllowed(false);
          setChecking(false);
        }
      }
    }

    void checkAdminAccess();

    /*
     * Keep the guard synchronized with
     * Supabase authentication changes.
     */
    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(
        (event, session) => {
          if (!active) return;

          /*
           * If the user signs out, immediately
           * revoke access.
           */
          if (!session) {
            setAllowed(false);
            setChecking(false);
            return;
          }

          /*
           * For authentication events, re-check
           * admin_profiles rather than trusting
           * client-side metadata.
           */
          if (
            event === 'SIGNED_IN' ||
            event === 'TOKEN_REFRESHED' ||
            event === 'USER_UPDATED'
          ) {
            void checkAdminAccess();
          }
        }
      );

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [location.pathname]);

  /* -------------------------------------------------- */
  /* CHECKING */
  /* -------------------------------------------------- */

  if (checking) {
    return (
      <div className="route-loading">
        Checking admin access…
      </div>
    );
  }

  /* -------------------------------------------------- */
  /* NOT AUTHORISED */
  /* -------------------------------------------------- */

  if (!allowed) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /* -------------------------------------------------- */
  /* AUTHORISED */
  /* -------------------------------------------------- */

  return children;
}

/* ====================================================== */
/* 404 PAGE */
/* ====================================================== */

function NotFound() {
  return (
    <div className="page-container section-pad not-found">
      <p className="eyebrow">
        404 / Page not found
      </p>

      <h1>
        This page took a wrong turn
        <span className="heading-period">
          .
        </span>
      </h1>

      <p className="page-lead">
        The page might have moved, or the
        link may be out of date.
      </p>

      <a
        href="/"
        className="button button-dark"
      >
        Return home
      </a>
    </div>
  );
}

/* ====================================================== */
/* ROUTES */
/* ====================================================== */

function AppRoutes() {
  return (
    <>
      {/* Vercel monitoring */}

      <Analytics />
      <SpeedInsights />

      <Routes>
        {/* ---------------------------------------------- */}
        {/* PUBLIC WEBSITE */}
        {/* ---------------------------------------------- */}

        <Route element={<SiteLayout />}>
          <Route
            index
            element={<Home />}
          />

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="portfolio"
            element={<Portfolio />}
          />

          <Route
            path="portfolio/:slug"
            element={<PortfolioItem />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />
        </Route>

        {/* ---------------------------------------------- */}
        {/* ADMIN LOGIN */}
        {/* ---------------------------------------------- */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ---------------------------------------------- */}
        {/* PROTECTED ADMIN AREA */}
        {/* ---------------------------------------------- */}

        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route
            index
            element={<AdminManagement />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />
        </Route>

        {/* ---------------------------------------------- */}
        {/* FALLBACK */}
        {/* ---------------------------------------------- */}

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

/* ====================================================== */
/* APP */
/* ====================================================== */

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}