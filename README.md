# Personal Portfolio Starter

A responsive React + TypeScript + Vite portfolio based on the supplied wireframes. It includes a public site and an admin content manager, with local placeholder data now and a Supabase integration path when you're ready.

## What's included

### Public portal
- **Home** — hero section, introduction, featured projects, and contact CTA.
- **Portfolio** — responsive project grid with category filters.
- **Portfolio item** — detail page with description, role, tech stack, live link, and repository link.
- **About** — experience/events, technical skills, soft skills, image gallery, and resume link.
- **Contact** — validated contact form and direct email link.
- **Shared navigation/footer** — responsive mobile navigation, page links, and social/contact placeholders.

### Admin portal
- **Dashboard** — content counts and Vercel Analytics integration guidance.
- **Manage content** — create, edit, and delete projects, technical skills, soft skills, roles/events, pictures, and resume entries.
- **Add/edit modal** — form fields change based on the selected collection.
- **Demo mode** — seeded content is stored in `localStorage`, so admin edits remain in this browser after refresh.
- **Supabase path** — data access and authentication are scaffolded; `supabase/schema.sql` contains the tables and RLS policies.

## 1. Run locally

Use Node.js 20.19+ (your Node 20.20.0 is sufficient for Vite 7) or a current Node LTS release.

1. Back up your existing `portfolio` folder.
2. Extract `portfolio-starter.zip`.
3. Copy the **contents** of the extracted `portfolio-starter` folder into your existing `portfolio` project folder.
4. Replace the entire old `src` folder with this starter's `src` folder. Replace `package.json` and `index.html`, and add the starter's TypeScript config files and `.npmrc`.
5. Delete the old `vite.config.js` (the starter uses `vite.config.ts`), the old `package-lock.json`, and the old `node_modules` folder so they don't interfere with the new dependency tree.

Then run in PowerShell:

```powershell
cd "C:\Users\Tan Ming Reo\Personal Projects\Portfolio\portfolio"
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

The included `.npmrc` enables `legacy-peer-deps` as a temporary workaround for the npm 10.8.2 `Cannot read properties of null (reading 'edgesOut')` resolver crash you encountered. This makes npm less strict about peer dependencies. After upgrading npm and confirming normal installs work, you can remove `.npmrc` and try a regular install.

## 2. Replace the placeholders

Search for `Your Name`, `hello@example.com`, placeholder copy, and the demo items in `src/lib/data.ts`. Add your own project details, roles, skills, photos, and public links through the admin portal. Image fields currently accept public image URLs; no upload bucket is required to preview the layout.

Change the public name/title in `index.html` too. The default contact email can be changed in `.env.local` using `VITE_CONTACT_EMAIL=you@example.com`.

## 3. Connect Supabase later

1. Create a Supabase project.
2. In the Supabase SQL Editor, run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local` and fill in:

   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
   VITE_CONTACT_EMAIL=you@example.com
   ```

4. Restart the Vite dev server after changing `.env.local`.
5. Create the admin user in Supabase Authentication. Assign `app_metadata.role = "admin"` to that user using a trusted server-side Admin API workflow. Do **not** use a service-role key in React/browser code. Only this role passes the RLS policies in `schema.sql`.
6. Check the Supabase Auth redirect URLs and add your local and production site URLs.
7. Use the admin login at `/admin/login`. When Supabase environment variables are set, the demo login is disabled and Supabase password authentication is used.

When valid Supabase environment variables are present, CRUD operations use these tables:

| UI collection | Supabase table |
| --- | --- |
| Projects | `projects` |
| Technical skills | `technical_skills` |
| Soft skills | `soft_skills` |
| Roles & events | `events` |
| Pictures | `gallery_items` |
| Resume | `resume_items` |
| Contact messages | `contact_messages` |

The frontend only uses the anon/publishable key. Row Level Security is required; don't remove the admin policies or expose secrets. The starter intentionally uses URL fields for photos and resume PDFs. You can add uploads using a Supabase Storage bucket (for example, `portfolio-media`) later.

## 4. Contact form email delivery

- In demo mode, form submissions are stored in this browser only; they are not emailed.
- With Supabase configured, submissions are inserted into `contact_messages`.
- For an email notification, deploy `supabase/functions/send-contact-message` and set Supabase Function secrets `RESEND_API_KEY` and `CONTACT_EMAIL`. Verify your sender domain in Resend and update the function's `from` address to an approved sender before production.
- Add CAPTCHA/spam protection and rate limiting before publicly exposing the contact endpoint. Do not place email-provider keys in `VITE_` variables.

The form can show a saved-message notice even if the email function isn't deployed. In that case the message is in the database, but no email notification was sent.

## 5. Vercel deployment and analytics

Deploy the project to Vercel and set the same `VITE_` environment variables in Project Settings. `@vercel/analytics` and `@vercel/speed-insights` are mounted in `src/App.tsx`, so supported visits and performance metrics can be collected when deployed. This starter does not pull historical visitor counts into the admin dashboard because the Vercel API requires server-side credentials; add a protected serverless endpoint if you want those totals inside the dashboard.

## 6. Useful commands

```powershell
npm run dev       # local development
npm run typecheck # TypeScript checks
npm run build     # production build
npm run preview   # preview the production build locally
```

## Security notes

- The admin login in local demo mode is just a UI preview, not authentication. Do not deploy with the Supabase variables blank and expect the admin pages to be protected.
- Keep the Supabase service-role key and Resend key on the server/Edge Function only.
- Review RLS policies, add contact-form anti-spam protection, and test admin access with an ordinary authenticated user before launch.
