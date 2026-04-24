# Real Data And Moderation Architecture

## Goal

Move `Bike Sofia` from prototype mode to a real shared system without turning the app into a messy free-for-all.

This document defines the practical split between:

- official city data
- admin-curated permanent data
- community submissions
- moderation workflow
- future AI / RAG use

## Real Data Stack

### 1. Base map and routing graph

Use:

- `OpenStreetMap` or a commercial/provider-backed derivative for the road graph and bike-relevant tags
- a real production tile source, not the public OSM dev tile endpoint

Why:

- broad coverage
- clear license
- good support for cycleway, surface, lighting, steps, bike parking, toilets, fountains, repair points

### 2. Official Sofia overlays

Use:

- `Sofiaplan` open data and ArcGIS transport layers

Use this for:

- official bike network
- planned extensions
- priority intersections
- major-road context
- district boundaries
- transit and corridor context where licensing is clear

Important:

- ingest through our own adapters and normalized tables
- never make the frontend depend on third-party schema directly

### 3. Curated local cycling knowledge

Use:

- admin-entered places
- trusted partner imports later
- manual references from community projects like `sofenhagen` unless explicit reuse permission is granted

Important:

- `sofenhagen` is valuable as product inspiration and QA reference
- until explicit permission or a clear reuse license exists, do not treat it as an automatic ingest source

## Data Classes

### A. Official place

Examples:

- official bike parking
- fountains
- toilets
- metro entrances
- district markers

Properties:

- source owner
- external source id
- imported by adapter
- may refresh from source

### B. Permanent curated place

Examples:

- trusted bike shop
- known repair point
- good coffee + bike rack stop
- community landmark you want always visible

Properties:

- created by admin or editor
- stable, always eligible for display
- can override weak source data

### C. Community-submitted place

Examples:

- new rack
- unsafe parking
- water fountain temporarily broken
- great stop discovered by riders

Properties:

- submitted by users
- needs status and moderation
- can become permanent after review

## Recommended Supabase Model

### Core tables

- `places`
- `place_sources`
- `place_edits`
- `place_reports`
- `routes`
- `route_segments`
- `route_edits`
- `moderation_actions`

### Suggested `places` fields

- `id`
- `city_slug`
- `title`
- `slug`
- `category`
- `visibility`
- `status`
- `source_kind` = `official | admin | community`
- `source_ref`
- `geometry`
- `address_text`
- `description`
- `tags jsonb`
- `quality_score`
- `is_permanent`
- `created_by`
- `approved_by`
- `approved_at`
- `updated_at`

### Suggested `routes` fields

- `id`
- `city_slug`
- `title`
- `slug`
- `summary`
- `visibility`
- `status`
- `source_kind` = `admin | community | imported`
- `geometry`
- `distance_m`
- `elevation_gain_m`
- `safety_score`
- `surface_notes jsonb`
- `tags jsonb`
- `created_by`
- `approved_by`
- `approved_at`
- `updated_at`

## Moderation States

Use the same state model for places and routes:

- `draft`
- `pending`
- `approved`
- `rejected`
- `hidden`
- `archived`

Simple rule:

- admin-created records can start as `approved`
- community-created records should start as `pending`

## Real Workflow

### Permanent places you add yourself

Yes, these should live in Supabase.

Flow:

1. you create a place in an admin tool
2. record is stored as `source_kind=admin`
3. status is `approved`
4. it is always available to the app

### Places users add

Yes, these should also live in Supabase, but not go live blindly.

Flow:

1. user submits place
2. record is stored as `source_kind=community`
3. status is `pending`
4. admin reviews
5. approve, reject, or merge into an existing permanent place

### Routes users add

Same idea.

Flow:

1. user submits route geometry + notes
2. store as `pending`
3. admin reviews safety, duplication, and abuse
4. approved routes become public

## Moderation Rules For Real Use

Minimum real moderation:

- authenticated writes only
- RLS on every shared table
- rate limits on submissions
- soft delete / hidden states
- abuse flagging
- duplicate detection
- admin audit log

Good second layer:

- trusted users can publish faster
- community confirmations raise ranking but do not auto-approve dangerous content

## Do We Need RAG?

Not for the core shared data model.

RAG is not the database of record for places, routes, reports, or moderation state.

Use normal structured storage first:

- Postgres / PostGIS style data in Supabase
- explicit geometry
- explicit moderation state
- explicit source provenance

RAG can help later with:

- semantic search over place descriptions and route notes
- answering questions like "quiet coffee stops near Borisova"
- moderation assistance summaries
- admin copilots for reviewing submissions

So the right order is:

1. structured data model
2. moderation workflow
3. search and ranking
4. optional RAG layer on top

## Recommended Build Order

1. finish auth
2. move meetups to Supabase
3. add report confirmations
4. add `places` with `official`, `admin`, and `community` source kinds
5. build a simple admin moderation screen for places
6. add community route submission with `pending` moderation
7. add better search and ranking
8. only then consider RAG for semantic discovery

## Product Rule

The app should feel alive because community riders contribute to it.

But the map should feel trustworthy because:

- official data is labeled as official
- admin-curated data is stable
- community data has moderation and provenance
