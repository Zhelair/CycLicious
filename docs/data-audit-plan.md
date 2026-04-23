# Data Audit Plan

## Purpose

Before we wire real layers into the app, we need a repeatable way to decide which data sources are:

- useful
- licensable
- technically ingestible
- worth maintaining

## Why This Matters

The product can look great with mock data, but the real value depends on strong local data.

For Sofia, the challenge is not only finding data. It is choosing data we can legally and reliably build on.

## MVP Research Priorities

### 1. Cycling Infrastructure

Focus on:

- built bike network
- planned bike network
- bike parking
- intersections relevant to cyclists
- road hierarchy near bike routes

### 2. Rider Amenities

Focus on:

- toilets
- fountains
- repair points
- public transport interchange points

### 3. Safety Inputs

Focus on:

- major roads
- tram corridors
- crossing-heavy segments
- lighting-related proxies where available
- surface type or road quality proxies where available

## Confirmed Strong Lead

Sofiaplan appears to expose a real ArcGIS stack with bike-related layers, including a dedicated bike-network service and related city layers.

Examples already identified:

- `Велосипедна_мрежа` ArcGIS service
- bike network legend entries for built lanes, lane types, planned programs, and bike parking
- broader `basic_data` and `Map` services for road and city context

These need formal source-by-source review before ingestion.

## Research Workflow

For each candidate source:

1. Identify the official owner.
2. Find the machine-readable endpoint or export path.
3. Check usage terms or license.
4. Inspect the available layers and attributes.
5. Decide whether it is:
   - ready for MVP
   - useful later
   - reference only
   - blocked by unclear terms

## First Data Deliverables

The first research pass should produce:

- a source inventory
- a licensing table
- a shortlist of MVP-ready layers
- field mappings into app concepts such as:
  - route segment
  - parking spot
  - amenity
  - warning zone
  - planned infrastructure

## Implementation Rule

No real source should be wired directly into the UI until we know:

- how to access it reliably
- what the useful fields are
- whether our use is allowed
