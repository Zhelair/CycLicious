# Next Chat Handoff

## What This Project Is

`Bike Sofia` is a Sofia-first cycling PWA prototype.

The target product is:

- a live bike map for safer riding
- community signals and lightweight meetup coordination
- route planning with bike-specific safety preferences
- local-first privacy for personal data
- shared backend only for public/community features

This is not trying to replace Google Maps.

This should become a focused, city-by-city cycling utility.

## Current State

The app already has:

- `Next.js` App Router
- `BG / EN / RU`
- `MapLibre` map shell
- `Dexie / IndexedDB` local persistence
- installable `PWA` basics
- official Sofia bike layer adapter via `Sofiaplan`
- route themes, reports, meetup card, transit helper
- map-first dashboard with a fuller live-map mode

Key files:

- [README.md](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/README.md>)
- [docs/build-roadmap.md](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/docs/build-roadmap.md>)
- [docs/privacy-security-architecture.md](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/docs/privacy-security-architecture.md>)
- [components/app-shell.tsx](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/components/app-shell.tsx>)
- [components/map-stage.tsx](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/components/map-stage.tsx>)
- [components/live-map.tsx](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/components/live-map.tsx>)
- [lib/db/app-db.ts](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/lib/db/app-db.ts>)
- [app/api/layers/sofiaplan/route.ts](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/app/api/layers/sofiaplan/route.ts>)

## Product Shape Locked So Far

The app should stay split like this:

- `Dashboard`: main live map, quick report, quick signals, compact weekly pulse, repeat route
- `Routes`: route desk, route profiles, preferences, later real route options
- `Social`: meetup coordination, shared ride layer, transit helper, not a noisy chat app

The main dashboard should feel closer to `Waze` or `RDO map`:

- map is the dominant surface
- filters and quick controls live on-map
- route/social tuning is pushed into other tabs

## Real-World Architecture

For a real beta with `10 friends`, then `100+ active riders`, the practical stack is:

- `Frontend`: Next.js PWA
- `Map`: MapLibre
- `Private local data`: Dexie / IndexedDB
- `Shared backend`: Supabase
- `Live updates`: Supabase Realtime
- `Official city overlays`: server adapters per city
- `Routing`: separate route service later

### What Stays Local

Keep these on device by default:

- preferences
- saved drafts
- recent routes
- route history
- any future ride history
- any future health/watch data

### What Goes To Supabase

Only data that must be shared across devices or users:

- account
- premium entitlement later
- public reports
- confirmations / votes
- meetups
- moderation state
- share links
- optional live presence

## How The Live Map Should Work

For an early real beta:

- users open the PWA
- map loads Sofia base map + official Sofia bike layer
- GPS can show the rider locally
- reports are fetched from Supabase
- new reports appear live through Realtime
- optional rider presence can show nearby active cyclists

Important:

- rider presence should be `opt-in`
- it should be `coarse`, not exact by default
- it should be `ephemeral`
- it should not create long-term location history unless the user explicitly enables it

Good early presence model:

- show a rider as “active nearby”
- snap to area / segment / grid cell
- expire presence automatically after a short time

That gives social value without making the app creepy.

## Security And Safety Rules

This must be treated as a real app, not just a nice frontend.

### SQL Injection

Do not build SQL strings manually.

Safer pattern:

- use Supabase client and typed queries
- use parameterized access only
- keep service-role keys server-side only
- validate all API input before database calls

### Backend Security

Must-have rules:

- `RLS` on every shared table
- auth required for write actions
- anon read only where intentionally public
- per-endpoint validation
- rate limiting for reports and meetup actions
- moderation flags from day one
- short payload limits
- no trust in client-sent role fields or ownership claims

### Privacy

Must-have privacy defaults:

- private routes stay local unless shared
- no exact live location sharing by default
- no background ride tracking by default
- clear consent and terms before social features
- clear meetup disclaimer
- age gate for meetup/social features

## Current Honest Limitations

The project is still in prototype phase.

Big missing pieces:

- real shared backend
- real routing engine
- moderation tools
- proper production map hosting
- lawyer-reviewed Terms / Privacy
- strong mobile polish

Also:

- current prototype uses a public OSM raster tile endpoint for local development convenience
- that is not the production tile strategy

## Tailwind Decision

This repo is **not** currently using Tailwind.

`package.json` has no Tailwind dependency right now.

For this project, Tailwind is not automatically “better”.

Good reasons to keep the current CSS for now:

- the UI is still exploratory
- map-heavy apps often need very custom layout/chrome anyway
- current custom CSS is already working
- migration now would slow product shaping

Good reasons to move to Tailwind later:

- if the app grows a larger component system
- if there are many repeated UI variants
- if design iteration speed becomes more important than handcrafted CSS structure

Recommendation:

- stay on custom CSS for the current MVP/product-shaping phase
- consider Tailwind only after the information architecture and map UX are more stable

## Recommended Next Sprint

Best next implementation steps:

1. shrink the dashboard hero into a tighter top strip
2. make the dashboard feel even more like a live operating map
3. add a proper city selector structure, even if only Sofia is active
4. build Supabase schema for reports, confirmations, meetups, and consent
5. wire shared reports into the map
6. add coarse opt-in live rider presence
7. start `/api/route` with `safe / balanced / fast`

## Reading Order For The Next Chat

Ask the next chat to read these first:

1. [docs/build-roadmap.md](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/docs/build-roadmap.md>)
2. [docs/next-chat-handoff.md](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/docs/next-chat-handoff.md>)
3. [docs/privacy-security-architecture.md](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/docs/privacy-security-architecture.md>)
4. [components/app-shell.tsx](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/components/app-shell.tsx>)
5. [components/live-map.tsx](</C:/Users/niksa/OneDrive/Documents/Codex/Bike idea/components/live-map.tsx>)

## Suggested Prompt For The Next Chat

Use something close to:

`Read docs/build-roadmap.md, docs/next-chat-handoff.md, docs/privacy-security-architecture.md, then inspect components/app-shell.tsx and components/live-map.tsx. Continue the Bike Sofia app from the current map-first dashboard state. Keep Dashboard map-first, keep Routes and Social separate, and work toward a real beta architecture with Supabase shared features and local-first privacy.`
