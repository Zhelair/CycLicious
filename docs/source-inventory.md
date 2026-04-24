# Source Inventory

This is the practical source shortlist for Phase 4. The goal is to decide what we can safely ingest for a Sofia bike MVP, what is useful later, and what should stay as manual reference only.

## Labels

- `License clarity`
  - `clear`: explicit public reuse terms from the owner
  - `mixed`: public and probably reusable, but terms are split across pages or not attached cleanly to the dataset itself
  - `low`: public data exists, but reuse terms are not explicit enough for safe shipping
  - `blocked`: explicit restriction or no safe direct-ingestion path
- `Recommendation`
  - `MVP now`
  - `later`
  - `reference only`
  - `blocked`

## Inventory

### 1. OpenStreetMap base data

- Leads:
  - `https://osmfoundation.org/wiki/FAQ`
  - `https://www.openstreetmap.org/copyright/attribution-guide`
- Could provide:
  - road graph
  - bike lanes and cycleway tags
  - bike parking
  - toilets
  - fountains
  - repair stations
  - surface, lit, steps, ramp, crossing, incline proxies where mapped
- License clarity: `clear`
- Recommendation: `MVP now`
- Practical note:
  - This should stay the base map data layer for roads and POIs.
  - Use extracts or a proper provider, not OSM Foundation free tiles/search in production.

### 2. Sofiaplan open data API

- Leads:
  - `https://sofiaplan.bg/api/`
  - `https://api.sofiaplan.bg/datasets`
- Could provide:
  - built bike network
  - planned bike lines
  - priority bike-network intersections
  - street axes
  - traffic count points and measured traffic layers
  - possible bypasses for major transit routes
  - blue/green zone parking datasets
  - cobbled streets
  - street-lighting objects and lighting infrastructure
- License clarity: `clear`
- Recommendation: `MVP now`
- Practical note:
  - This is the cleanest official Sofia source for shipping.
  - The owner explicitly says data on the page can be used freely and documents machine-readable API access.
  - Prefer API snapshots over scraping HTML or CKAN pages.

### 3. Sofiaplan ArcGIS transport atlas

- Leads:
  - `https://gis.sofiaplan.bg/arcgis/rest/services/program_for_sofia_atlas/MapServer`
  - high-value transport layers:
    - `107` bike-network density
    - `108` priority bike intersections
    - `109` built bike network
    - `110` planned bike-network extensions
    - `111`-`114` street-network density layers
    - `115` dedicated public-transport corridors
    - `120` pedestrian-network integration near barriers
    - `121` pedestrian network
    - `122` wheeled transport
    - `147` rail-condition layer
- Could provide:
  - bike overlays ready for styling
  - road-stress proxies
  - tram and corridor context
  - pedestrian and barrier context for safer route scoring
- License clarity: `mixed`
- Recommendation: `MVP now`
- Practical note:
  - Use this for schema discovery, map styling, and fast prototype ingestion.
  - Before public beta, tie every shipped layer back to a clear owner and canonical source record where possible.
  - ArcGIS services are in `WKID 7801`; reproject to WGS84 for web use.

### 4. Sofiaplan ArcGIS `basic_data`

- Leads:
  - `https://gis.sofiaplan.bg/arcgis/rest/services/basic_data/FeatureServer`
  - useful layers:
    - `0` public-transport stops
    - `1` metro entrances
    - `2`-`3` metro stations
    - `4` administrative districts
    - `9` main roads
- Could provide:
  - district boundaries for exploration/progress
  - stops and metro context for multimodal trips
  - main-road penalties for safer routing
- License clarity: `mixed`
- Recommendation: `MVP now`
- Practical note:
  - This is a strong supporting layer for route stress scoring and district-based UI.
  - Keep it as normalized backend data, not as a UI-coupled third-party schema.

### 5. UrbanData / CKAN mirror for Sofiaplan bike datasets

- Leads:
  - `https://urbandata.sofia.bg/ro/dataset/cycling-network`
  - source resource points to `https://api.sofiaplan.bg/datasets/606`
- Could provide:
  - discoverability
  - freshness metadata
  - maintainer/source metadata for the built cycling network
- License clarity: `mixed`
- Recommendation: `reference only`
- Practical note:
  - Useful as a catalog and cross-check.
  - Do not treat CKAN landing pages as the canonical ingest source when the underlying `api.sofiaplan.bg` dataset already exists.

### 6. Sofia municipality transport data policy plus CGM GTFS feeds

- Leads:
  - `https://www.sofia.bg/transport-data`
  - `https://urbandata.sofia.bg/en/dataset/gtfs-vehicle-positions`
  - `https://urbandata.sofia.bg/organization/urban-mobility-center`
- Could provide:
  - static routes and stops
  - realtime vehicle positions
  - trip updates
  - service alerts
  - tram/bus proximity context for live navigation later
- License clarity: `mixed`
- Recommendation: `later`
- Practical note:
  - The city transport-data rules say Level 1 and Level 2 mobility datasets are `CC BY 4.0`, but some individual GTFS dataset pages still say `No License Provided`.
  - Good fit for live overlays, disruption warnings, and meetup ETA features, but not required for the first routing MVP.

### 7. UrbanData mobility overlays from Sofiaplan

- Leads:
  - `https://urbandata.sofia.bg/mk/dataset/dedicated-public-transport-routes`
  - mobility-group dataset listings on `urbandata.sofia.bg`
- Could provide:
  - dedicated public-transport corridors
  - stop-accessibility studies
  - pedestrian connectivity studies between stops and destinations
- License clarity: `low`
- Recommendation: `later`
- Practical note:
  - These are promising for tram caution, big-crossing stress, and walk-bike interchanges.
  - Prefer the underlying Sofiaplan API or ArcGIS lead when possible; use CKAN mostly to discover what exists.

### 8. UrbanData amenity datasets from the municipality

- Leads:
  - `https://urbandata.sofia.bg/dataset/drinking-fountains-sofia`
- Could provide:
  - public drinking fountains
  - amenity validation against OSM gaps
- License clarity: `low`
- Recommendation: `reference only`
- Practical note:
  - Good QA/reference source, but the dataset page says no license is selected.
  - For the shipped app, use OSM first for fountains/toilets/bike parking unless the city adds explicit reuse terms.

### 9. Cultural-heritage route datasets on UrbanData

- Leads:
  - `https://urbandata.sofia.bg/bg/dataset/?_tags_limit=0&groups=cultural-heritage&organization=sofiaplan&res_format=GeoJSON&tags=%D0%BF%D0%B0%D0%B2%D0%B8%D1%80%D0%B0%D0%BD%D0%B8&tags=%D1%83%D0%BB%D0%B8%D1%86%D0%B8`
  - `https://urbandata.sofia.bg/dataset/?_groups_limit=0&_tags_limit=0&groups=cultural-heritage&license_id=notspecified&tags=%D0%BA%D1%83%D0%BB%D1%82%D1%83%D1%80%D0%B0&tags=%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82`
- Could provide:
  - historical-route seeds
  - cultural-route overlays
  - cobblestone avoidance hints
- License clarity: `low`
- Recommendation: `later`
- Practical note:
  - Valuable for `Historical route` and `Shkembe route` style Explore Mode features.
  - Not safety-critical, and the licensing picture is not clean enough yet to prioritize.

### 10. NAG planning pages and downloadable studies

- Leads:
  - `https://nag.sofia.bg/Pages/Render/909`
  - `https://nag.sofia.bg/Pages/Render/96`
- Could provide:
  - manual reference for planned bike corridors
  - public-toilet planning references
  - cross-check material during QA and product research
- License clarity: `blocked`
- Recommendation: `reference only`
- Practical note:
  - The site states that its software, design, and on-page information are copyright protected except where the material is public information.
  - Treat these pages as human research sources, not as direct machine-ingest sources.

### 11. Sofenhagen cycling map

- Leads:
  - `https://www.sofenhagen.com/`
- Could provide:
  - local safety heuristics
  - route inspiration
  - QA reference for bike-friendly corridors
  - community-relevant place ideas
- License clarity: `low`
- Recommendation: `reference only`
- Practical note:
  - The site is clearly useful as local cycling knowledge, but we should not auto-ingest it without explicit permission or a clear reuse license.
  - Use it as a product and QA reference, or pursue a direct partnership/permission path later.

## Recommended MVP ingest order

1. `OpenStreetMap` for the base road graph and bike-relevant POIs.
2. `Sofiaplan API` for built bike network, planned lines, priority intersections, street axes, and cobbled streets.
3. `Sofiaplan basic_data` for main roads, districts, stops, and metro entrances.
4. `Sofiaplan ArcGIS transport atlas` for transport-context overlays and rapid prototyping of safety heuristics.
5. Add `GTFS` only after the static safe-routing flow is good.

## Hold For Later Or Manual QA

- UrbanData amenities with no explicit license
- CKAN mirrors when the same record exists in `api.sofiaplan.bg`
- NAG pages and attachments

## Immediate implementation takeaway

For the first real data pass, we already have enough to ship a strong Sofia-specific MVP without scraping unofficial pages:

- OSM for the base layer
- Sofiaplan for bike-network truth and Sofia-specific routing signals
- optional GTFS later for live context
