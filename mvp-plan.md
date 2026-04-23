# Sofia Bike Companion MVP Plan

## Product Direction

The first version should be a web-first PWA that works well on Android and feels alive, local, and cyclist-first.

The app should combine:

- safe route planning
- a living community map
- lightweight social coordination
- playful progression that does not distract people while riding

## Community Report Model

Reports should be template-first, not open-ended.

Use:

- type
- point or segment
- travel direction if relevant
- severity
- optional short note
- optional photo later, not in MVP

### Severity model

- `S3 Critical`: avoid by default
- `S2 Important`: strong penalty
- `S1 Advisory`: soft penalty or preference
- `S0 Positive/Fun`: separate layer, no routing penalty

### Safety and obstacles

- Blocked bike lane
- Dangerous crossing
- Tram-track danger
- Fast traffic segment
- Road works / construction
- Broken surface / potholes
- Glass / debris
- Flooding / mud
- Stairs / impassable
- Aggressive dogs

These should usually be `S3` or `S2`, with fast expiry and fast clearing.

### Parking and stop quality

- Good bike parking
- Covered bike parking
- Bike rack broken
- Rack full
- Good quick-stop cafe
- Water refill available
- Public toilet available
- Repair station / pump

These should usually be `S0` or `S1`, with longer life and periodic reconfirmation.

### Comfort and route quality

- Quiet street
- Good night lighting
- Bad cobblestones
- Bad curb drop
- Steep section
- Good shade in summer
- Scenic detour

These help make routing feel human instead of purely mechanical.

### Positive and fun reports

- Street art spot
- Nice view
- Great coffee stop
- Chill park shortcut
- Friendly bike shop

These should be optional and clearly separate from safety-critical alerts.
They belong in `Explore Mode`, not the live ride screen.

## Suggested Report Metadata

- time created
- trust score weight
- expiry time
- confirm count
- clear count

### Suggested expiry

- Temporary hazards: 6 hours to 7 days
- Construction: 3 to 14 days unless reconfirmed
- Positive places and amenities: long-lived, but need periodic reconfirmation
- Comfort notes like lighting, cobbles, stairs, and bad crossings: 30 to 180 days, editable and reconfirmable

## Minimal Social Layer

Do not start with open public chat.

Instead, support:

- route share link
- event page
- meeting point on map
- RSVP or join request
- short note field on RSVP
- organizer broadcast updates
- optional private reply thread tied to one event or route
- structured quick replies like `running late`, `at north entrance`, `need slower pace`, `can I bring a friend?`

That gives users enough coordination without creating a generic chat app.

## Privacy Model

Users should not need to reveal personal contact info by default.

Start with:

- display name
- optional profile photo
- optional Instagram or Telegram handle
- privacy toggles for showing handle only after join approval
- private meeting notes visible only to approved attendees
- exact meeting pin shown only to approved attendees
- optional live ETA shared only on event day and only with approved attendees

For shared routes and events:

- public
- unlisted link
- private invite only

This is much safer than open discovery for everything.

## Safety Guardrails

- Do not show exact home/work labels publicly
- Hide precise live location by default
- Event creators can approve join requests
- Report abusive users and hide profiles
- Rate-limit messages and reports
- No image uploads in MVP social features
- Notes are short-form and scoped to an event or shared route

## Disclaimer Direction

Use a short and plain notice:

"Ride carefully and meet others at your own discretion. Verify routes and conditions yourself, and avoid sharing private information too broadly."

This should not be the only safety measure, but it is still worth showing.

## Waze-Like Feel Without Full Chat

The "alive map" feeling should come from:

- visible fresh reports
- confirmations from other riders
- route notes
- event pins
- trusted local contributors
- seasonal activity and exploration badges
- district discovery

Users should feel that the city map is being maintained by cyclists in real time.

## Gamification

The fun layer should reward riding and exploration, not phone interaction during riding.

### Good game loops

- districts explored
- streaks for weekly rides
- "safe scout" badge for useful confirmations
- "route guardian" badge for clearing stale hazards
- monthly Sofia challenge
- elevation badge
- pollution-saved estimate
- tamagotchi-style bike mascot that grows with completed rides
- seasonal checkpoints

### Safer event ideas

- weekend discovery routes
- spring blossom hunt
- hill climber month
- fountain finder challenge
- safe parking scout week

### Avoid

- mechanics that reward phone taps while moving
- live chasing of random points in traffic
- anything that pressures risky riding behavior
- notifications that tempt interaction while the user is moving

## Free vs Premium

### Free

- map
- safe route planning basics
- community reports
- route sharing
- public and unlisted events
- BG / EN / RU
- core stats like distance and elevation

### Premium

- AI route explanation
- commute personalization
- night-route suggestions
- habit coaching and nudges
- mascot progression extras
- deeper ride summaries
- premium themes and explore overlays

The app should still feel generous in the free tier.

## Agent Roles

### Agent 1: Senior Full-Stack

Owns:

- app architecture
- map integration
- backend model
- routing strategy
- deployment path

Main job:

Turn the product plan into a stable, shippable PWA.

### Agent 2: UX/UI

Owns:

- visual direction
- ride mode vs explore mode
- onboarding
- reporting flow
- localization-friendly layouts
- game layer and emotional design

Main job:

Make the app feel distinctive, local, and calm while still carrying the Waze and game vibes.

### Agent 3: Security / QA

Owns:

- privacy review
- abuse prevention
- edge cases
- moderation constraints
- testing strategy

Main job:

Keep the app safe, predictable, and production-ready.

## Local Prototype Plan

### Prototype 1

- `localhost:3000`
- Sofia map shell
- BG / EN / RU switcher
- fake route preferences panel
- fake report flow
- fake event pin and meeting point flow
- ride mode vs explore mode toggle

### Prototype 2

- local persistence with IndexedDB
- seeded sample reports
- route card and route share page
- contributor badges and trust mock data
- meetup approval flow with private note reveal

### Prototype 3

- real backend for reports and events
- auth
- moderation basics
- public / unlisted / private sharing

### Prototype 4

- real routing logic
- official data overlays
- premium AI layer

## First Principle

The first version should feel useful on day one even if the routing is not yet perfect.

If cyclists can open it, see Sofia, share a route, mark a dangerous crossing, and discover a safer parking spot, then the product already has real value.

## Recommended First UI Split

### Ride Mode

- high contrast
- very few actions
- big turn card
- warning chips like `tram tracks`, `big crossing`, `steep`
- bottom bar with only `Report`, `Reroute`, and `Pause`

### Explore Mode

- warmer map styling
- layered legend and filters
- place cards with trust signals
- events, reports, and positive discoveries
- stronger game-like identity

The app should feel calm and practical while moving, and richer and more atmospheric while exploring.
