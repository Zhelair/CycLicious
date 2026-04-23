# Real App Setup

## Goal

Turn the current Bike Sofia prototype into a real hosted beta without losing the
local-first privacy model.

## Recommended Order

1. Publish the current prototype to GitHub.
2. Connect the repo to Vercel and deploy the existing app.
3. Create a Supabase project for shared features.
4. Apply the first schema in `supabase/schema.sql`.
5. Add environment variables from `.env.example`.
6. Wire Supabase clients into the app.
7. Replace seeded shared data with live reads and writes.

## GitHub

- Create a new empty GitHub repository.
- Add it as `origin`.
- Make the first commit from the current prototype state.
- Push `main`.

Suggested first commit message:

`Prototype baseline: map-first Bike Sofia app`

## Vercel

- Import the GitHub repo into Vercel.
- Framework preset: `Next.js`.
- Root directory: repo root.
- Build command: default.
- Output directory: default.

The current prototype already builds successfully with `npm run build`, so Vercel
should work before Supabase is added.

## Supabase

Create these tables first:

- `profiles`
- `consents`
- `reports`
- `report_confirmations`
- `meetups`

Core rules:

- enable RLS on every shared table
- use auth for writes
- keep private routes and preferences local in Dexie
- keep service role keys server-side only

## Environment Variables

Use `.env.example` as the contract.

Required for backend work:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`

Helpful for deploys:

- `NEXT_PUBLIC_APP_URL`

Optional:

- `DEEPSEEK_API_KEY`

## DeepSeek

DeepSeek is optional and not needed for the core beta. Do not block reports,
maps, meetups, auth, or deployment on AI. The core product should work without
any AI dependency.

Good later use cases:

- route explanation summaries
- weekly ride insights
- moderation assistance
- meetup copy suggestions

## First Live Feature Migration

Move these from seed/local prototype mode to Supabase first:

1. public reports
2. report confirmations
3. meetups

Keep these local-first:

1. UI preferences
2. report drafts
3. private ride history
4. private saved routes

## Definition Of Real Beta

The app is ready for a small real beta when:

- GitHub is live
- Vercel deployment is live
- Supabase schema exists
- auth is working
- reports can sync across devices
- RLS is enabled on all shared tables
- legal/privacy copy is visible in the hosted app
