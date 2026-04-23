# Build Roadmap

## Build Strategy

Start small, local, and opinionated.

Do not begin with a full routing engine, production auth, or live moderation tools.

Build the product in layers.

## Phase 0: Planning Lock

Goal:

- lock the first project shape before coding

Outputs:

- product docs
- agent prompts
- route/report taxonomy
- UI direction

Exit criteria:

- the team agrees on MVP scope
- the prototype target is clear

## Phase 1: Local Prototype Shell

Goal:

- get the app running on `localhost:3000`

Deliverables:

- Next.js app shell
- App Router with locale path support
- BG / EN / RU switcher
- home map page
- map placeholder or live map shell
- ride mode / explore mode toggle
- mock data for reports and meetup points

Exit criteria:

- app boots locally
- locale switching works
- core navigation flow is visible

## Phase 2: Prototype Interactions

Goal:

- prove the product feel

Deliverables:

- fake report sheet
- fake meetup card
- route detail card
- place card
- local persistence for settings and drafts
- seeded sample categories including themed routes

Exit criteria:

- a user can click through the main loops without backend setup

## Phase 3: PWA Foundations

Goal:

- make the prototype installable and resilient

Deliverables:

- manifest
- app icons
- offline shell
- cached recent state
- device-first storage model

Exit criteria:

- app can be installed on Android
- the basic shell works with flaky internet

## Phase 4: Data Audit

Goal:

- decide which real sources are suitable for MVP ingestion

Deliverables:

- source inventory
- licensing review
- ArcGIS and API endpoint shortlist
- field mapping for bike network, amenities, and route-safety inputs

Exit criteria:

- we know which official and open layers are safe to use
- the implementation order for real data is clear

## Phase 5: Real Data And Reports

Goal:

- connect to real layers and basic shared data

Deliverables:

- `/api/layers/*` adapters
- 1 to 2 official or open Sofia layers
- backend for reports and confirmations
- basic admin moderation flags
- public / unlisted / private sharing options

Exit criteria:

- live data appears
- reports can be created and seen across devices

## Phase 6: Routing Intelligence

Goal:

- move from static map utility to real route planning

Deliverables:

- `/api/route`
- safe / balanced / fast route options
- preferences such as:
  - avoid major roads
  - prefer bike lanes
  - lower elevation
  - tram caution
  - night comfort

Exit criteria:

- the app can return route choices with meaningful tradeoffs

## Phase 7: Premium Layer

Goal:

- add value without harming the free core

Deliverables:

- `/api/ai/*`
- AI route explanation
- weekly ride insights
- commute personalization
- optional game and theme extras

Exit criteria:

- premium features feel genuinely helpful
- free version remains complete enough to recommend

## Phase 8: Public Beta

Goal:

- test with real Sofia cyclists

Deliverables:

- deployment
- onboarding copy
- reporting disclaimer
- feedback form
- simple analytics and error monitoring

Exit criteria:

- real riders can use it and provide feedback

## Immediate Next Step

Build only Phase 1.

That means:

- create the Next.js app
- set up BG / EN / RU
- create the map shell
- add mock reports
- add ride mode / explore mode toggle

No backend complexity yet.
