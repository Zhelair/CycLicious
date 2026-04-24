# Routing Safety Model

## Goal

Route through Sofia in a way that feels realistic for cyclists:

- use bike lanes when they exist
- still route on ordinary streets when that is safer or more practical
- avoid stressful turns, crossings, and surfaces
- explain *why* a route was chosen

## Core Principle

The app should not behave as if cycling is only possible on official bike alleys.

In Sofia, many useful bike routes will be a mix of:

- official bike infrastructure
- calm local streets
- short connector streets
- park paths
- occasional necessary crossings of larger roads

So the routing engine should score every segment, not only select from bike lanes.

## Segment Inputs

### Positive signals

- physically protected bike lane
- painted lane with low adjacent traffic stress
- local street with low speed
- one-lane or small residential street
- street with lower traffic counts
- greenway / park path
- good lighting
- smooth pavement
- confirmed rider preference from community data

### Negative signals

- large arterial road
- tram corridor risk
- trolley / bus corridor with heavy conflict
- dangerous or complex crossing
- left turn across fast traffic
- missing crossing refuge
- cobblestones / brick paving
- rough or broken surface
- stairs / dismount section
- unlit segment for night routing

## Sofia-Specific Scoring

### Surface

Treat surface as a real routing cost.

Examples:

- `asphalt / smooth concrete`: low penalty
- `sett / cobblestone / bricks`: medium or high penalty depending on length
- broken pavement or patchy surface: additional penalty

This matters especially in the center where short historical sections can be tolerable, but long cobbled corridors should usually be avoided for comfort-focused routes.

### Crossing stress

Crossings should have their own score, not just inherit the road score.

Penalize:

- multi-stage crossings
- big diagonals
- crossings over tram-heavy corridors
- crossings with poor visibility
- left turns onto major streets

This is important because many cyclists will accept a longer ride to avoid one ugly crossing.

### Turn cost

Turns are not equal.

Penalize:

- left turns onto major roads
- left turns without protected phase
- turns that force lane merging
- turns that require crossing tram rails at a bad angle

Prefer:

- right turns
- continuing straight on calm streets
- signalized crossings where the cyclist can cross in simpler stages

## Route Profiles

### Safe

Strongly prioritize:

- protected lanes
- calm streets
- lower-speed network
- simpler crossings
- low surface stress

Accept:

- slightly longer distance

### Balanced

Balance:

- comfort
- time
- moderate crossing stress

Accept:

- ordinary streets when they are still reasonable

### Fast

Prioritize:

- directness
- fewer detours

Still avoid:

- the worst crossings
- clearly hostile arterials
- severe surface penalties where practical

## Data Sources To Feed This

- `OpenStreetMap` for street graph, cycle tags, surface, lighting, crossings, ramps, stairs
- `Sofiaplan` for official bike network, planned corridors, major-road context, priority intersections
- later community confirmations for segment comfort scoring

## MVP Rule

For the first real routing version:

1. calculate a stress score per segment
2. calculate an extra penalty per crossing / turn
3. expose `safe / balanced / fast`
4. explain the choice in simple human terms

Example explanation:

- `Safer because it stays on smaller streets, avoids one major left turn, and skips the cobbled central segment.`
