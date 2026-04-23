export default function PrivacyPage() {
  return (
    <main className="policy-shell">
      <section className="policy-header shell-card">
        <p className="eyebrow">Draft privacy note</p>
        <h1>Privacy and data use</h1>
        <p className="policy-intro">
          This prototype is designed to keep private rider data on the device by
          default and reserve shared storage for community features only.
        </p>
      </section>

      <section className="policy-grid">
        <article className="panel-card shell-card policy-section">
          <h2>What stays local</h2>
          <ul className="policy-list">
            <li>Language and interface preferences.</li>
            <li>Draft reports before you choose to publish them.</li>
            <li>Saved routes, notes and future private ride history.</li>
            <li>Fine-grained location history and background tracking data.</li>
          </ul>
        </article>

        <article className="panel-card shell-card policy-section">
          <h2>What may be shared later</h2>
          <ul className="policy-list">
            <li>Public reports and confirmations.</li>
            <li>Meetup records and moderation state.</li>
            <li>Optional account identity for cross-device access.</li>
            <li>Optional rider presence only when you explicitly opt in.</li>
          </ul>
        </article>

        <article className="panel-card shell-card policy-section">
          <h2>Location boundary</h2>
          <p>
            The MVP is intended to use foreground location while the app is open.
            It should not collect background ride tracking or long-term server-side
            location history by default.
          </p>
        </article>

        <article className="panel-card shell-card policy-section">
          <h2>Safety and moderation</h2>
          <p>
            Routes, signals and meetup information are guidance only. Shared
            features should be protected with validation, rate limits, moderation
            flags and row-level security before public beta.
          </p>
        </article>

        <article className="panel-card shell-card policy-section">
          <h2>Current status</h2>
          <p>
            This page is a product-facing draft, not legal advice. Before a hosted
            beta, it should be replaced with lawyer-reviewed Terms, Privacy and
            community rules.
          </p>
        </article>
      </section>
    </main>
  );
}
