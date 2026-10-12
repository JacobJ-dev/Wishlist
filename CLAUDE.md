# Wishlist

A simple wishlist web app for two people (me and my partner). Each person adds items they'd like. The other can see them and secretly mark items as bought. Portfolio project, built mobile-first (mainly used on a phone, developed on desktop).

Repo: github.com/JacobJ-dev/Wishlist
Planned deploy: Vercel

## Stack

- React + Vite (plain JavaScript, ESLint, no React Compiler)
- Tailwind CSS v4 via the `@tailwindcss/vite` plugin, with `@import "tailwindcss";` in `src/index.css`. No tailwind config files.
- Supabase (auth, database, later realtime)

## How to work with me

- You (Claude Code) write the code. I'm using this project to learn how to build with Claude Code and MCP servers.
- Keep steps small. Do one milestone slice at a time, then stop so I can check it in the browser and commit. Don't build several features in one go.
- For anything non-trivial, use plan mode first and tell me the plan before writing code.
- After each change, explain in 2-3 sentences what you changed and why, so I learn from it.
- Keep responses concise and warm.
- Flag anything security-related (RLS policies, auth, secrets) clearly, and wait for my review before applying it.
- Run `npm run lint` and make sure `npm run dev` still works after changes.
- Never commit secrets. `.env` must be in `.gitignore`.

## Conventions

- Mobile-first: design for a ~390px wide viewport first, then scale up.
- Plain JavaScript only (no TypeScript).
- Function components and hooks. Keep components small and in `src/components/`.
- Supabase client lives in `src/supabaseClient.js`, reading `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from env vars.
- Tailwind utility classes for styling. Custom CSS only where Tailwind can't do it (e.g. range slider thumb/track).

## Data model

Table `wishlist_items`:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key, default `gen_random_uuid()` |
| `title` | text | required |
| `short_desc` | text | nullable |
| `link` | text | nullable |
| `want_rating` | int2 | nullable, default 5, range 1-10 (1 = could live without, 10 = please please get this) |
| `created_at` | timestamp | default `now()` |

RLS is off while testing. It must be turned on once auth and pairing exist (milestones 3-5).

## Page design (personal wishlist)

- Header: "My wishlist" with a `+` button.
- List of compact rows: title plus a colour-coded want rating (red = high, amber = medium, grey = low).
- Tapping a row expands it in place to show the link, description and a rating slider. All editable, with a delete button.
- `+` opens a bottom sheet over a dimmed scrim with: Title (required), Link, Short description, Want rating slider (default 5) and an "Add to wishlist" button.
- The sheet is a conditionally rendered block driven by an `isAddOpen` boolean state. It is not a route or a library. Tapping the scrim closes it, and the sheet uses `stopPropagation` so taps inside don't close it.
- Slider: `<input type="range" min="1" max="10" step="1">` with custom CSS for thumb and track. Its value arrives as a string, so wrap it in `Number()`.
- The new-item form uses one `rating` state. Existing items read and update their own `want_rating` by `id`.

## Reusable code

My earlier project FamilyCart (github.com/JacobJ-dev/SupermarketListApp) has pieces to borrow when we reach accounts and pairing:

- `supabaseClient.js` (env-var based client)
- `Login.jsx` / `Register.jsx` (`signInWithPassword`, `signUp`)
- Join-code logic in `HouseholdSetup.jsx` (`generateCode`, `getUniqueCode`, create/join toggle)

## Milestones

Starting from scratch. Work through these in order, one slice at a time.

1. [ ] Scaffold: React + Vite + Tailwind v4 + ESLint, runs with `npm run dev`, first commit
2. [ ] Connect Supabase (env vars, client) and create `wishlist_items`
3. [ ] Basic CRUD: list, add and delete items from Supabase
4. [ ] Richer items (`short_desc`, `link`, `want_rating`) and the bottom sheet UI
5. [ ] Accounts: login and register
6. [ ] Pairing: a join code links two accounts (e.g. a `pairs` table with `user_a` and `user_b`)
7. [ ] The surprise rule: a partner can see and mark items as bought, but the owner can never see purchase status on their own items. This must be enforced in the database (RLS or a view), not just the UI. Store purchase status somewhere the owner cannot read (e.g. a separate table), since RLS works on rows, not columns.
8. [ ] Polish and deploy to Vercel

## MCP

Plan to connect the Supabase MCP server to this project (scoped to a single dev project with `project_ref`, never production data) so Claude Code can inspect the schema and help with migrations. Set this up after the scaffold is working.

## First session

Read this file, then use plan mode to propose how to scaffold milestone 1. Don't write any code until I've approved the plan.
