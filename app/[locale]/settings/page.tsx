import Link from "next/link";
import {setRequestLocale} from "next-intl/server";

import type {Locale} from "../../../lib/i18n/config";

const settingsSections = [
  {
    id: "account",
    title: "Account and authentication",
    badge: "Next step",
    body:
      "Supabase is now the right home for real sign-in. The app should move from anonymous prototype mode to email magic-link or OAuth sign-in, then attach reports and meetups to real profiles.",
    bullets: [
      "Wire Supabase Auth into the app shell and top-level menu.",
      "Create a profile row after first sign-in and store rider preferences there.",
      "Keep the secret key on the server only; the browser should use the publishable key."
    ]
  },
  {
    id: "sync",
    title: "Shared data and rollout",
    badge: "In progress",
    body:
      "Reports already have the first real backend path. The next rollout should make shared reports reliable first, then move meetups, confirmations and settings behind auth.",
    bullets: [
      "Reports: keep the current API route, then lock writes to signed-in users.",
      "Meetups: move the join/maybe/share flow to real Supabase tables next.",
      "Settings: split local-only preferences from shared account settings deliberately."
    ]
  },
  {
    id: "offline",
    title: "Offline map and daily sync",
    badge: "Planned",
    body:
      "The prototype already caches the app shell and the official Sofiaplan overlay. A true offline map needs two layers: the overlay refresh logic and an offline-friendly basemap source.",
    bullets: [
      "Good today: cache the shell and the official bike layer after it is fetched.",
      "Good next: refresh cached official data once a day when the app opens or when the service worker wakes up.",
      "Important: do not bulk-cache standard OpenStreetMap tiles; use an offline-capable provider or packaged PMTiles/MBTiles for real offline basemaps."
    ]
  },
  {
    id: "api",
    title: "City data and routing API",
    badge: "Research-backed",
    body:
      "Sofiaplan does give us real city data, but we should treat it as one source in a curated pipeline. Their bike-network dataset is useful for official infrastructure layers, not as a full routing engine by itself.",
    bullets: [
      "Use Sofiaplan open data for official bike network, parking and city POI overlays.",
      "Use your own Next.js API routes as the product layer that validates, normalizes and serves data to the client.",
      "Keep route explanation or AI assistance optional until auth, sync and moderation are stable."
    ]
  }
];

export default async function SettingsPage({
  params
}: {
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="settings-shell">
      <section className="settings-hero shell-card">
        <div>
          <p className="eyebrow">Product control room</p>
          <h1>Settings, sync and rollout.</h1>
        </div>
        <p className="settings-intro">
          This is the web-style control surface for the real app track: authentication,
          shared data, offline map work and API integration. Keep private preferences
          local-first, and move shared behavior to Supabase step by step.
        </p>
        <div className="button-row">
          <Link className="primary-button" href={`/${locale}`}>
            Back to map
          </Link>
          <Link className="secondary-button" href={`/${locale}/privacy`}>
            Privacy note
          </Link>
        </div>
      </section>

      <section className="settings-grid">
        <aside className="settings-nav shell-card">
          <strong>Menu</strong>
          <nav aria-label="Settings sections">
            {settingsSections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="settings-panels">
          {settingsSections.map((section) => (
            <section className="settings-panel shell-card" id={section.id} key={section.id}>
              <div className="panel-header">
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </div>
                <span className="status-chip accent-chip">{section.badge}</span>
              </div>
              <ul className="settings-list">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
