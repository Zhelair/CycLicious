# Sofiaplan Source Notes

## Current Read

Based on the current public Sofiaplan GIS portal and ArcGIS REST endpoints, Sofiaplan looks like one of the strongest official sources for the first real data pass.

## Confirmed Public Entry Points

- GIS portal home: `https://gis.sofiaplan.bg/portal/home/`
- Main ArcGIS services root: `https://gis.sofiaplan.bg/arcgis/rest/services/`

## Bike-Relevant Leads Identified

### 1. Bicycle network service

The portal exposes a dedicated bicycle-network service.

Useful signals visible from the public legend include:

- built bicycle network
- bicycle route types
- planned and program-based cycling routes
- bike parking

This is highly promising for:

- route overlay
- bike-lane classification
- planned vs built infrastructure display
- parking layer seeding

## 2. Basic city context

The `basic_data` service appears to include:

- public transport stops
- metro entrances
- metro stations
- administrative districts
- main roads

This can support:

- route context
- transfer points
- stress scoring inputs
- district-based exploration features

## 3. Broader city analysis layers

The broader `Map` and related services appear to include city-structure and planning context.

These are not first-priority for MVP UI, but may become useful for:

- route scoring heuristics
- neighborhood exploration overlays
- future themed routes

## Recommended Research Order

### MVP first

- bicycle network
- bike parking
- main roads
- district boundaries

### Later

- mobility and transit context
- land-use and city-analysis layers
- planning overlays for future infrastructure

## Open Questions

- which bike-network layers are easiest to query and style directly?
- what fields identify protection level, lane type, and built status?
- what are the exact usage and redistribution terms for commercial or freemium use?
- which geometry reference systems need transformation in our ingestion pipeline?

## Implementation Note

No Sofiaplan source should be wired directly into the UI until we have:

- endpoint stability confirmed
- useful field mappings documented
- licensing status documented
