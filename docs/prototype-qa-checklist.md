# Prototype QA Checklist

Use this checklist for the current `localhost:3000` prototype and as the gate for the next sprint.

## P0: Must Fix Before Calling The Prototype Ready

- [ ] Mobile first pass: verify the home screen at `360x800`, `393x852`, and `430x932`.
  Success means the map area is visible above the fold, the locale switcher and mode toggle stay reachable, and no card forces sideways scrolling.
- [ ] Tap target pass: confirm all primary controls are at least `44x44 px`.
  Check locale pills, mode toggle, report chips, and meetup buttons.
- [ ] Localization pass for `BG / EN / RU`.
  No clipped text, no mixed-language labels, and no hardcoded English UI like `When`, `Pace`, or `People` inside localized screens.
- [ ] Meetup privacy default: exact meetup point must not be visible in the public card.
  Public and unlisted cards should show only an approximate area until join approval.
- [ ] Personal contact safety: no phone, Instagram, Telegram, or email shown by default.
  Any contact reveal must be opt-in, reversible, and hidden in the prototype unless the flow is explicitly designed.
- [ ] Report abuse guardrails: report creation must stay structured.
  Category first, short note second, and note length capped to a small limit such as `120` characters.
- [ ] Safety disclaimer visible in both key social flows.
  Add short copy near `Submit report` and `Join meetup` explaining that community data may be stale and users should meet carefully in public places.

## P1: Next Sprint Build Gates

- [ ] Device-first persistence: locale, mode, draft report, and dismissed UI state survive refresh.
  Store locally first and recover cleanly after reload.
- [ ] Offline behavior: the shell should still open with flaky or no network.
  At minimum, show the last local state and keep new reports in a local queue instead of losing them.
- [ ] Report trust states: every report needs visible freshness and confidence hints.
  Add age, confirmation count, and a clear difference between critical hazards and fun or positive pins.
- [ ] Spam and duplicate friction: prevent repeated local submits from the same screen state.
  Disable rapid double-submit and add a small cooldown or dedupe check for identical draft content.
- [ ] Meetup safety actions: reserve space in the UI and data model for `Block`, `Report user`, and `Leave meetup`.
  These actions do not need full backend wiring yet, but the flow must be planned before public testing.
- [ ] Translation QA for long Cyrillic strings.
  Test cards, buttons, chips, and stat labels with the longest BG and RU copy, not only the English layout.
- [ ] Motion and distraction pass.
  No playful or gamified UI should interrupt the rider while moving; game feedback belongs after the ride or in explore mode.

## P2: Nice To Lock Before Public Beta

- [ ] Accessibility smoke pass: visible focus states, keyboard access for core controls, and sufficient contrast in both ride and explore modes.
- [ ] Face and plate safety plan for future photos.
  If photo uploads are added later, default to blur guidance and moderation hooks before rollout.
- [ ] Premium safety boundary check.
  Hazard visibility, safer defaults, and core meetup privacy protections must remain free.

## Current Prototype Notes

- The current prototype already proves locale routing, mock reports, mode switching, and the meetup card flow.
- The biggest QA gaps right now are mobile density, hardcoded localized fragments, missing disclaimers, no persistence, and weak privacy or abuse guardrails around reports and meetups.
