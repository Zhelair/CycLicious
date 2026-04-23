# Master Project Plan

## Vision

Build a web-first Progressive Web App for cyclists in Sofia that helps people move through the city more safely, confidently, and enjoyably.

The product should feel:

- local
- practical
- alive
- trustworthy
- stylish without becoming distracting

## Who It Is For

### Primary users

- people commuting by bike in Sofia
- riders who avoid big roads
- new cyclists who want safer options
- riders looking for local tips, parking, toilets, fountains, and meetup spots

### Secondary users

- casual weekend riders
- visitors who want scenic or themed routes
- cycling groups organizing public rides

## Non-Goals

- global routing coverage in the first version
- full social network or open public chat
- replacing all map use cases for all users
- heavy gamification during active riding

## Product Pillars

### 1. Safe Routing

Help riders avoid stressful roads and choose more comfortable routes.

The routing model should eventually support:

- avoid major roads
- prefer bike lanes
- prefer side streets
- avoid tram danger
- avoid big crossings
- avoid cobblestones
- avoid stairs
- avoid unpaved surfaces
- prefer lower slope
- prefer better lighting at night

### 2. Living Community Map

The map should improve because cyclists use it.

Community inputs should include:

- hazards
- good parking
- amenities
- route quality
- positive discoveries

### 3. Lightweight Social Coordination

Users should be able to:

- share a route
- create a meetup point
- host a ride
- request to join
- exchange minimal private notes safely

### 4. Explore And Motivation

The app should make cycling more fun without making it dangerous.

Good examples:

- district exploration
- streaks
- seasonal challenges
- route themes
- a small ride companion or mascot

## Product Modes

### Ride Mode

Purpose:

- active navigation
- hazard awareness
- fast reporting

Rules:

- minimal interface
- very large touch targets
- high contrast
- as few actions as possible

### Explore Mode

Purpose:

- browsing layers
- planning themed routes
- discovering places
- viewing achievements and events

Rules:

- richer visual identity
- more atmospheric map treatment
- cards, layers, filters, and collectibles

## Content And Route Themes

### Utility themes

- Safe commute
- Quiet route
- Low-elevation route
- Night-comfort route
- Bike parking route

### Discovery themes

- Historical route
- Scenic route
- Shade route
- Coffee + rack route
- Beer + snack route
- `Шкембе route`

### Notes on themed routes

Themed routes should be opt-in and secondary to safety.

Even playful routes should still show:

- distance
- elevation
- surface notes
- traffic-stress notes
- crossing warnings

## Community Reports

Reports should use structured types, severity, expiry, and confirmations.

Categories:

- hazards
- crossings and traffic stress
- surface and access
- parking and amenities
- positive and fun discoveries

Reports should avoid open free-form text as the default.

## Social Model

The app should not start as a public chat platform.

Use:

- route cards
- meetup cards
- organizer notes
- join requests
- private short replies
- optional social handle reveal after mutual opt-in

Sharing options:

- public
- unlisted link
- private invite only

## Language Strategy

Ship with:

- Bulgarian
- English
- Russian

Bulgarian should be the base language for category keys, moderation labels, and city-specific terminology.

## UI Direction

The app should combine:

- Waze-style community energy
- a small amount of Pokemon Go style progression
- a tasteful atlas / game-map exploration mood

The design should avoid generic startup UI.

Inspiration cues:

- strong map personality in `Explore Mode`
- crisp utility-first layouts in `Ride Mode`
- icon-first actions
- short labels that work in Cyrillic and Latin scripts
- premium-feeling typography and spacing

## Commercial Strategy

### Free core

- safer routing basics
- key map layers
- community reports
- route sharing
- meetup flow
- basic stats
- BG / EN / RU

### Premium layer

- AI route explanation
- personalized commute tuning
- advanced route preferences
- deeper insights
- cosmetic/game extras

Safety-critical functionality should never be paywalled.

## Data Strategy

### Base

- OpenStreetMap-derived road and amenity data
- official Sofia open data where licensing is clear

### Community

- reports
- confirmations
- ride events
- shared routes

### Premium intelligence

- server-side AI summaries and personalization

Keep these layers separated conceptually and technically.

## Success Criteria For V1

The first public version is successful if a cyclist can:

- open the app quickly on mobile
- switch language
- see Sofia and useful layers
- plan or preview a safer ride
- report a dangerous spot
- share a meetup point
- discover at least one helpful local place

That is enough to prove the concept.
