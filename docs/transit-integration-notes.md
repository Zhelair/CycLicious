# Transit Integration Notes

Last checked: `2026-04-23`

## Sources used

- [Sofia Council amendment, Decision No. 787 / Protocol No. 49 / 2025-10-09](https://council.sofia.bg/documents/d/guest/r-787_pr-1-1)
- [Metropolitan Sofia travel rules page](https://www.metropolitan.bg/za-grazhdani/red-i-usloviya-za-ptuvane)
- [Sofia mobility data terms, Order SOA25-RD09-3745/2025-09-03](https://www.sofia.bg/transport-data)
- [GTFS real-time vehicle positions dataset](https://urbandata.sofia.bg/en/dataset/gtfs-vehicle-positions)
- [Static GTFS dataset](https://urbandata.sofia.bg/dataset/gtfs-static)
- [Sofiaplan `basic_data` service](https://gis.sofiaplan.bg/arcgis/rest/services/basic_data/FeatureServer)

## Verified today

### 1. Latest ordinance text to model first

The strongest official public source I found for the current bike-carriage rules is the Sofia Council amendment dated `2025-10-09`.

Model the ordinance rules like this:

- `metro`
  - bike carriage is allowed in the `last carriage` of a metro train
  - the `2025-10-09` amendment text reads this as `all day`
- `surface transport without bike rack`
  - bike carriage in the passenger saloon is allowed on `weekdays before 06:30 and after 20:00`
  - on `weekends and public holidays`, it is allowed `all day`
- `surface transport with bike rack`
  - bike carriage on the rack is allowed `all day`
  - boarding/alighting with the bike must happen at the `first/last stop` or at `specially designated stops`

In all cases, the ordinance text is still conditional:

- the bike must be on a designated / technically secured place
- it must not dirty the vehicle
- it must not take priority over other passengers

Implementation takeaway:

- any bike+transit leg must be treated as `allowed but conditional`, not guaranteed

### 2. Public operator pages still show older wording

As checked on `2026-04-23`, the public [Metropolitan Sofia travel rules page](https://www.metropolitan.bg/za-grazhdani/red-i-usloviya-za-ptuvane) still shows older public-facing wording:

- `metro`: last carriage on weekdays `before 07:00` and `after 20:00`, weekends/holidays all day
- `surface transport`: bike carriage only when a `bus, tram, trolleybus, or electrobus` is equipped with a bike rack or baggage compartment

So today we have a real source conflict:

- `council amendment dated 2025-10-09` suggests broader rights
- `live operator-facing page checked on 2026-04-23` still shows narrower rules

Implementation takeaway:

- keep a `policy_version` field in the planner and backend
- do not hardcode one narrative in UI copy yet
- default launch copy should stay conservative until CGM / Metropolitan confirm what is operationally enforced

### 3. Open/public transit data we can already use

From the Sofia mobility-data page:

- the city approved mobility-data sharing terms by Order `SOA25-RD09-3745/2025-09-03`
- `Level 1` and `Level 2` data are published under `CC BY 4.0`
- public data includes static and dynamic transit data

Verified public feeds:

- `GTFS real-time vehicle positions`
  - covers `buses, trams, and trolleybuses`
  - useful for live bike+surface ETA and disruption-aware routing
- `Static GTFS`
  - covers `routes, stops, and schedules`
  - useful for timetable-based multimodal planning
- `Sofiaplan basic_data`
  - contains `public transport stops`, `metro entrances`, and `metro stations`
  - useful for stop matching, district logic, and first/last-mile modeling

Current limitation:

- I do not yet have a verified public source proving that `metro` is present in the public GTFS package
- I also do not have a stable machine-readable source listing which specific surface vehicles / runs have bike racks

## How the route planner should expose this

### Route profiles

Add explicit route profiles / toggles:

- `bike only`
- `bike + metro`
- `bike + surface transport`
- `bike + any transit`
- `avoid transit with bike`

### Edge model

Each transit edge should carry:

- `mode`
- `route_id`
- `stop_id_from`
- `stop_id_to`
- `bike_policy`
- `time_window_rule`
- `requires_last_car`
- `requires_bike_rack`
- `boarding_stop_rule`
- `policy_source`
- `policy_version`
- `verified_at`

Suggested `bike_policy` values:

- `not_allowed`
- `allowed_conditional`
- `allowed_rack_only`
- `allowed_time_window`

### Time-aware planner rules

Planner behavior should be time-based, not a static label:

- block `surface_without_rack` legs on weekdays between `06:30` and `20:00`
- allow `surface_without_rack` legs outside that window and on weekends / public holidays
- allow `surface_with_rack` legs all day, but only for lines / runs we have positively flagged as rack-equipped
- keep `metro` behind a policy switch until the `2025-10-09` amendment and the operator-facing text are reconciled

### UI behavior

If a route uses transit with a bike, show:

- a `Bike on metro` or `Bike on tram/bus/trolley` badge
- the exact boarding rule, for example `Last carriage` or `Allowed after 20:00`
- a `Conditional` note when crowding or operator discretion may still block boarding

Do not:

- promise rack availability unless we have verified line/run data
- present bike+transit as the default fastest route without showing the rule window

## Rider Guidance Popup

Separate legal rule text from practical rider etiquette.

The product can show a short helper note such as:

- board where bike carriage is allowed for that mode
- use the last carriage or designated boarding area when required
- keep the bike clean
- do not block other passengers or mobility space
- if the vehicle is crowded or staff deny boarding, take the next option

This should be labeled as `rider guidance`, not as the full legal rule.

## What still needs verification before public launch

- confirm with `CGM` and `Metropolitan` which rule text is actually enforced after `2025-10-09`
- verify whether `metro` is present in the public static GTFS package; if not, ingest metro separately
- verify which lines / runs actually have `bike racks`, and whether designated loading stops are published in a machine-readable source
- verify the official public-holiday source the planner should use for the `weekends / holidays all day` rule
- verify whether there are extra operational limits not visible in the current public sources:
  - max bike count per vehicle
  - line-specific exclusions
  - crowding-related refusals
  - driver/operator discretion rules

## Shipping recommendation

For the first public beta:

- ship `bike only` routing first
- expose `bike + transit` as `beta`
- keep the feature behind a clear policy note until the `2025-10-09` ordinance text and the operator-facing pages are aligned
