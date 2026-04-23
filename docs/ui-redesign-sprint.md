# UI Redesign Sprint

## Sprint Goal

Turn the current localhost prototype from a spacious concept screen into a credible mobile-first product shell.

This pass should improve visual quality, hierarchy, and usability without expanding scope beyond the agreed roadmap.

Keep the work inside Phase 1 and Phase 2 boundaries:

- no production auth
- no live routing engine
- no real moderation tools
- no heavy backend work disguised as UI work

## Visual Goals

- Make the app feel closer to a premium mobile map product than a landing page.
- Bring in `Waze` energy through clear map actions, live community signals, and stronger route/report presence.
- Keep `Explore Mode` atmospheric and collectible, with subtle atlas and game-map flavor.
- Keep `Ride Mode` crisp, calm, and more utility-first than decorative.
- Preserve a strong local identity for Sofia instead of generic startup styling.

## Layout Changes

- Replace the oversized hero composition with a map-first layout that shows useful content in the first viewport.
- Make the primary map stage the visual anchor on both desktop and mobile.
- Move secondary content into stacked cards and bottom-sheet style panels instead of wide empty blocks.
- Compress the top bar so language and mode controls feel like navigation tools, not marketing chrome.
- Turn stats into compact live chips or mini-cards that support the map instead of competing with it.
- Make themed routes feel like a swipeable or stackable collection, not static text blocks.

## Component Priorities

- `Map shell`: strongest visual focus, with better framing, route presence, and community pins.
- `Mode switch`: clearly separate `Ride Mode` and `Explore Mode` in color, density, and card styling.
- `Route card`: compact, premium, and immediately scannable for safety, distance, elevation, and vibe.
- `Report flow`: bottom-sheet style quick actions with severity and category chips that feel fast on mobile.
- `Meetup card`: stronger trust signals, cleaner note area, and more obvious privacy state.
- `Themed route cards`: support local routes like `Historical route`, `Beer + snack`, `Шкембе route`, `Coffee + rack`, and `Shade route`.

## Color And Type Direction

- `Ride Mode` palette: off-white, charcoal, cobalt, safety amber, traffic coral, and a restrained mint or teal accent.
- `Explore Mode` palette: warm parchment, dark ink, moss, brass, and one brighter accent for active pins and collectibles.
- Avoid flat beige-on-beige screens; use stronger contrast, clearer surfaces, and more deliberate depth.
- Use one expressive serif for editorial or atlas moments and one clean sans for controls and utility text.
- Any font pair must work well in `BG`, `EN`, and `RU`, especially in short chips, route labels, and dense card UI.

## Acceptance Criteria

1. On a mobile viewport, the first screen shows a compact header, language switch, mode switch, and a real map-focused composition without a large empty hero block.
2. `Ride Mode` and `Explore Mode` are visually distinct in palette and component treatment while still feeling like one product.
3. The localhost prototype uses card or bottom-sheet patterns for route, report, and meetup interactions instead of large static text sections.
4. The redesigned route area includes themed route cards for at least `Historical route`, `Beer + snack`, `Шкембе route`, `Coffee + rack`, and `Shade route`, each with safety, distance, and elevation metadata.
5. The main UI holds cleanly in `BG`, `EN`, and `RU` on the prototype without obvious overflow, broken spacing, or unreadable contrast.
