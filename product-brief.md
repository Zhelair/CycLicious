# Sofia Bike Companion

## Positioning

Build a web-first Progressive Web App (PWA) for safer cycling in Sofia.

The product goal is not to replace Google Maps for every use case. The goal is to be the best tool for cyclists in Sofia who care about safety, comfort, and local knowledge.

## Product Shape

- Free core app
- Optional paid tier for advanced features
- Open-source code on GitHub
- Deployed as a public web app that can be installed on Android as a PWA

GitHub hosts the code. Users still need a deployed app URL to use it.

## Why PWA First

- Faster to ship than a native Android app
- Works on Android immediately
- Can cache maps and recent data locally
- Lets us validate the routing and community model before investing in native features
- Still leaves the door open for a future Android app

## Core Free Features

- Route planning with safe-bike preference
- Avoid major roads and stressful crossings
- Prefer cycle lanes, side streets, parks, and calmer roads
- Show bike parking, fountains, toilets, repair points, and useful stops
- Community hazard reports
- Route sharing
- Public ride events
- BG, EN, and RU interface

## Good Premium Features

- AI route explanation and personalization
- "Why this route?" summaries
- Safer night-route suggestions
- Route tuning by rider profile
- Weekly ride insights and coaching
- Smart recommendations based on saved habits

The paid layer should enhance the experience, not lock the basic utility.

## Data Strategy

### Base map and routing

- OpenStreetMap for roads, cycleways, parking, toilets, amenities, and many core attributes
- Separate app/community data from OSM-derived data where practical
- Do not use the free OSM Foundation tile servers as production infrastructure

### Official Sofia data

- Sofiaplan open data and GIS layers as the best official seed source
- Sofia mobility open data where terms are clear
- Municipality pages as references, not as scraping targets

### Community data

Users should fill the high-value local truth that official sources miss:

- Safe bike lock spots
- Covered parking
- Lighting quality
- Camera nearby
- Broken rack
- Dangerous crossing
- Bad tram-track crossing
- Glass, dogs, blocked bike lane, construction
- Night safety feedback

## Waze-Like Layer

The community system should feel alive without becoming a moderation nightmare.

Start with:

- Quick report buttons
- Confirm / still there / cleared
- Trust score for reliable contributors
- Heat on the map for active reports
- Local ride events
- Shared routes with meeting point and ETA
- Optional Telegram or WhatsApp group link per ride/event

Avoid full free-form public chat in the MVP.

## Route Preferences

The routing model should support:

- Avoid boulevards
- Avoid tram tracks where possible
- Penalize big crossings
- Prefer protected lanes
- Prefer quieter streets
- Prefer lower slope
- Prefer lower traffic-stress routes
- Avoid stairs
- Avoid cobblestones
- Avoid unpaved surfaces
- Prefer lit paths at night

## Health and Gamification

Good later features:

- Estimated calories
- Estimated CO2 saved
- Elevation gain/loss
- Ride streaks
- District exploration
- Safe spot verification badges
- Hazard reporter badges

All health and impact metrics should be labeled as estimates unless sourced directly from connected platforms.

## Storage Model

Use a device-first model:

- Local cache for recent map tiles or vector packs
- IndexedDB for saved places, recent routes, reports queue, and settings
- Optional account sync for backup and community contributions

This keeps the app usable even with patchy mobile internet.

## Language Support

Ship with:

- Bulgarian
- English
- Russian

BG should be the source language for city-specific labels and moderation categories.

## Suggested MVP Stack

- Frontend: Next.js or Vite + React
- Maps: MapLibre GL JS
- Geodata storage: PostGIS
- Community backend: Supabase or a small custom backend
- Routing:
  - first stage: external routing engine or custom-safe overlays
  - later stage: Valhalla or GraphHopper with custom bicycle weighting
- Local storage: IndexedDB
- i18n: message-key based translations from day one

## Monetization

Freemium is a good fit if:

- the basic routing and map layers stay free
- premium is clearly "extra value"
- paid AI features are optional and server-side
- all reused data is under terms that allow your use

Do not rely on scraping copyrighted map sites or unofficial pages as a core backend.

## Next Build Step

Build a small clickable PWA prototype with:

- Sofia map
- Safe-route preference toggles
- Sample layers for parking / toilets / hazards
- BG/EN/RU switch
- Fake community report flow

That is enough to test the concept with real riders before building the full routing engine.
