import { ArrowLeft, ArrowUpRight, LockKeyhole, Shapes } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      /*
       * Step 1:
       * Authenticate the user using Supabase Auth.
       *
       * Passwords are handled securely by Supabase.
       * They are NOT stored in our admin_profiles table.
       */
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (signInError) {
        throw signInError;
      }

      if (!data.user) {
        throw new Error('Could not identify the signed-in user.');
      }

      /*
       * Step 2:
       * Check whether the authenticated user exists
       * in our admin_profiles table and has the admin role.
       */
      const { data: adminProfile, error: adminError } = await supabase
        .from('admin_profiles')
        .select('id, email, role')
        .eq('id', data.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (adminError) {
        await supabase.auth.signOut();
        throw adminError;
      }

      /*
       * Authentication succeeded, but the user is not
       * registered as an administrator.
       */
      if (!adminProfile) {
        await supabase.auth.signOut();

        throw new Error(
          'This account does not have administrator access.'
        );
      }

      /*
       * Step 3:
       * User is authenticated AND authorised.
       */
      navigate('/admin');
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Could not sign in. Check your email and password and try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-back">
        <Link to="/">
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
      </div>

      <div className="login-card">
        <div className="login-logo">
          <Shapes size={28} />
        </div>

        <p className="eyebrow">Private workspace</p>

        <h1>
          Welcome back
          <span className="heading-period">.</span>
        </h1>

        <p className="login-lead">
          Sign in to manage the content behind your portfolio.
        </p>

        <div className="demo-notice">
          <strong>Admin access</strong>
          <span>
            This area is protected by Supabase Authentication. Only
            authorised administrator accounts can access the workspace.
          </span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Email address</span>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="username"
              required
            />
          </label>

          <label className="form-field">
            <span>Password</span>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <button
            className="button button-dark login-submit"
            type="submit"
            disabled={loading}
          >
            <LockKeyhole size={16} />

            {loading ? 'Signing in…' : 'Sign in securely'}

            <ArrowUpRight size={16} />
          </button>
        </form>

        <p className="login-footnote">
          Access is controlled by Supabase Authentication and database
          Row Level Security policies.
        </p>
      </div>
    </div>
  );
}