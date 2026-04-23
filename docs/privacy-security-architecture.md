# Privacy And Security Architecture

## Purpose

This document defines the default privacy and security shape for the Sofia Bike Companion MVP.

It is product guidance, not legal advice.

## Core Principle

Keep the app useful without collecting more personal data than we truly need.

## Data Placement

### Local only by default

Keep these on the device unless the user explicitly chooses to sync them:

- language and UI preferences
- ride mode / explore mode state
- draft reports before publish
- saved private routes
- saved private places
- local notes
- recent searches
- optional ride history
- any fine-grained location history

### Shared backend only for public or collaborative features

Use Supabase only for data that must exist across devices or be visible to others:

- account identity
- public reports
- report confirmations and clear events
- public and unlisted route shares
- meetup and ride-event records
- moderation state
- premium entitlement state

### Do not upload by default

- continuous background location history
- home / work labels
- personal health metrics
- exact private notes tied to private places

If these ever get synced later, they need a separate explicit opt-in.

## Location Tracking Boundary

For MVP:

- allow foreground geolocation while the app is open
- do not implement background ride tracking
- do not collect battery-heavy continuous history in the background

Why:

- it is much more complex technically
- it raises privacy and consent risk
- it is not necessary to prove the route and community product value

## GDPR-Friendly Product Rules

The app should follow the familiar GDPR principles of:

- transparency
- purpose limitation
- data minimization
- storage limitation
- security

Practical product consequences:

- explain clearly what data is stored, why, and whether it is local or shared
- collect the minimum needed for each feature
- separate public map contributions from private rider data
- give users clear delete controls
- avoid indefinite retention for community data that becomes stale

Official references used for this direction:

- European Commission GDPR principles overview
- EDPB guidance on securing personal data

## Privacy By Design Defaults

- pseudonyms by default, not real names
- no exact public meetup point before approval
- no exact home/work origin on public route shares
- no personal contact details shown by default
- short structured report notes instead of open long-form content
- local-first storage for private rider state

## Supabase Security Rules

For shared features, use Supabase with:

- Auth enabled
- Row Level Security on every exposed table
- service role key only on the server
- anon key only with RLS protection
- public schema kept narrow and intentional

Relevant official Supabase guidance:

- Auth
- passwordless email login
- Row Level Security
- securing your data

## Encryption Expectations

### In transit

- HTTPS everywhere
- secure cookies for sessions
- no secrets in the frontend bundle

### At rest

- Supabase project storage is encrypted at rest by default
- local browser storage should avoid especially sensitive data where possible

### Application-level protection

- do not rely on custom crypto for ordinary profile data
- do not store long-term raw location tracks in plaintext on the server
- if we ever add a private cloud vault for sensitive notes or ride history, use server-managed encryption with strong key separation

For MVP, the cleanest move is:

- keep sensitive personal data local
- keep server data narrow and low-risk

## Authentication Recommendation

For MVP:

- email magic link or email OTP via Supabase Auth

Why:

- lower friction
- less password handling risk
- easier onboarding for a public PWA

Do not start with:

- custom password storage logic
- passphrase-based unlock for premium features

If we want a later extra privacy mode, it should be:

- optional local vault passcode for private local data only

That is different from account authentication and should not block the MVP.

## Public Feature Rules

### Allowed on shared backend

- public report types
- approximate report location
- confirmation counts
- public route metadata
- meetup titles and coarse area visibility

### Not allowed on shared backend by default

- exact private location history
- raw home/work addresses
- sensitive health metrics
- public display of email, phone, Instagram, or Telegram unless explicitly opted in

## Retention Guidance

- temporary hazard reports should expire quickly
- stale confirmations should be archived
- inactive meetup chat-like notes should be short-lived
- account deletion should remove or anonymize personal profile data where feasible

## MVP Checklist

- add a privacy notice page
- add a simple data-use summary in onboarding
- tag every stored field as `local`, `shared`, or `derived`
- enable RLS on all Supabase tables
- use magic link or OTP auth
- keep premium status server-side
- avoid syncing ride history by default

## Current Recommendation

The clean MVP split is:

- `local`: private rider behavior and preferences
- `Supabase`: community and account features
- `later opt-in`: any richer cross-device personal data
