-- Personal portfolio schema
-- Run this in the Supabase SQL Editor after creating a project.
-- The browser uses only the anon/publishable key. Keep service-role keys server-side.

create extension if not exists pgcrypto;

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

grant execute on function public.is_portfolio_admin() to anon, authenticated;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  description text not null default '',
  category text not null default 'Project',
  year integer,
  role text not null default '',
  cover_image text not null default '',
  tech_stack text[] not null default '{}',
  live_url text not null default '',
  repo_url text not null default '',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.technical_skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Other',
  level text not null default '',
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

create table if not exists public.soft_skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  role text not null default '',
  period text not null default '',
  description text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null default '',
  alt_text text not null default '',
  category text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.resume_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null default '',
  active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null default 'Portfolio contact',
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.technical_skills enable row level security;
alter table public.soft_skills enable row level security;
alter table public.events enable row level security;
alter table public.gallery_items enable row level security;
alter table public.resume_items enable row level security;
alter table public.contact_messages enable row level security;

-- Public portfolio content is readable without a login.
-- Only users whose app_metadata.role is "admin" can mutate content.
DO $$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY['projects', 'technical_skills', 'soft_skills', 'events', 'gallery_items', 'resume_items'] LOOP
    EXECUTE format('drop policy if exists "Public can read %1$s" on public.%1$I', table_name);
    EXECUTE format('create policy "Public can read %1$s" on public.%1$I for select to anon, authenticated using (true)', table_name);
    EXECUTE format('drop policy if exists "Admins can insert %1$s" on public.%1$I', table_name);
    EXECUTE format('create policy "Admins can insert %1$s" on public.%1$I for insert to authenticated with check (public.is_portfolio_admin())', table_name);
    EXECUTE format('drop policy if exists "Admins can update %1$s" on public.%1$I', table_name);
    EXECUTE format('create policy "Admins can update %1$s" on public.%1$I for update to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin())', table_name);
    EXECUTE format('drop policy if exists "Admins can delete %1$s" on public.%1$I', table_name);
    EXECUTE format('create policy "Admins can delete %1$s" on public.%1$I for delete to authenticated using (public.is_portfolio_admin())', table_name);
  END LOOP;
END $$;

-- Anyone can submit a contact message; only admins can read it.
drop policy if exists "Anyone can submit a contact message" on public.contact_messages;
create policy "Anyone can submit a contact message"
  on public.contact_messages for insert to anon, authenticated
  with check (
    length(trim(name)) between 1 and 120
    and length(trim(email)) between 3 and 320
    and length(trim(message)) between 1 and 10000
  );

drop policy if exists "Admins can read contact messages" on public.contact_messages;
create policy "Admins can read contact messages"
  on public.contact_messages for select to authenticated
  using (public.is_portfolio_admin());

-- Optional: only admins should edit/delete contact messages.
drop policy if exists "Admins can delete contact messages" on public.contact_messages;
create policy "Admins can delete contact messages"
  on public.contact_messages for delete to authenticated
  using (public.is_portfolio_admin());
