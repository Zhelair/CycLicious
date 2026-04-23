# Sofia Bike Companion

Working name for a web-first cycling companion focused on Sofia.

This project is meant to become the safest and most locally useful tool for cyclists in Sofia, with:

- safer route planning
- community-powered map updates
- lightweight meetup coordination
- playful exploration and ride motivation
- BG / EN / RU support from day one

## Project Status

Planning and local prototype stage.

The first deliverable is a small PWA prototype that runs on `localhost:3000`.

## Core Product Idea

This is not a general-purpose Google Maps replacement.

The goal is to be the best city companion for:

- avoiding stressful roads
- finding safer bike infrastructure
- discovering useful cycling spots
- sharing routes and meetup points
- keeping the map alive through local riders

## Product Principles

- Safety first
- Local knowledge beats generic maps
- Free core utility
- Premium adds comfort and intelligence, not basic safety
- Device-first where possible
- Community input should be structured, not noisy

## Modes

- `Ride Mode`: calm, high-contrast, navigation-first
- `Explore Mode`: atmospheric, game-like, discovery-first

## Route and Discovery Themes

The app should support both practical and playful route ideas:

- Safe commute
- Quiet streets
- Low elevation
- Scenic ride
- Historical route
- Shade route
- Coffee + rack
- Beer + snack
- `Шкембе route`

The playful routes belong mainly to `Explore Mode`.

## Docs

- [Product Brief](./product-brief.md)
- [MVP Plan](./mvp-plan.md)
- [Master Project Plan](./docs/project-plan.md)
- [Build Roadmap](./docs/build-roadmap.md)
- [Data Audit](./docs/data-audit-plan.md)
- [Sofiaplan Notes](./docs/sofiaplan-source-notes.md)
- [UI Redesign Sprint](./docs/ui-redesign-sprint.md)
- [Prototype QA Checklist](./docs/prototype-qa-checklist.md)
- [Source Inventory](./docs/source-inventory.md)
- [Privacy & Security](./docs/privacy-security-architecture.md)
- [Transit Integration](./docs/transit-integration-notes.md)
- [Agent Prompts](./agents/fullstack-agent.md), [UX/UI](./agents/ux-ui-agent.md), [Security/QA](./agents/security-qa-agent.md), [Data Research](./agents/data-research-agent.md)

## First Build Target

Prototype 1 should include:

- map shell
- BG / EN / RU language switch
- ride mode / explore mode toggle
- fake report sheet
- fake meetup flow
- local persistence for settings and drafts

## Local Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Notes

The current planning documents intentionally separate:

- `official/open data`
- `community data`
- `premium AI features`

That keeps the project commercially safer and technically cleaner.
