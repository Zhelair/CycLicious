type HeroPreviewProps = {
  metaLabels: {
    cityPulse: string;
    routePreview: string;
    safety: string;
    distance: string;
    elevation: string;
    when: string;
    pace: string;
    people: string;
  };
  theme: {
    title: string;
    vibe: string;
    safety: string;
    distanceKm: string;
    elevationM: string;
    accent: string;
  };
  meetup: {
    title: string;
    visibility: string;
    when: string;
    pace: string;
    attendees: string;
  };
  report?: {
    title: string;
    category: string;
    severity: string;
  };
};

export function HeroPreview({
  metaLabels,
  theme,
  meetup,
  report
}: HeroPreviewProps) {
  return (
    <section className="hero-preview">
      <article className="preview-phone preview-map-card">
        <div className="preview-topline">
          <span>{metaLabels.routePreview}</span>
          <span className="preview-chip">{theme.title}</span>
        </div>
        <div className="preview-grid" />
        <div className="preview-route preview-route-main" />
        <div className="preview-route preview-route-alt" />
        <div className="preview-dot preview-dot-a" />
        <div className="preview-dot preview-dot-b" />
        <div className="preview-dot preview-dot-c" />
        <div className="preview-summary">
          <p>{theme.vibe}</p>
          <dl>
            <div>
              <dt>{metaLabels.safety}</dt>
              <dd>{theme.safety}</dd>
            </div>
            <div>
              <dt>{metaLabels.distance}</dt>
              <dd>{theme.distanceKm} km</dd>
            </div>
            <div>
              <dt>{metaLabels.elevation}</dt>
              <dd>{theme.elevationM} m</dd>
            </div>
          </dl>
        </div>
      </article>

      <article className="preview-phone preview-community-card">
        <div className="preview-topline">
          <span>{metaLabels.cityPulse}</span>
          <span className="preview-chip soft">{meetup.visibility}</span>
        </div>
        <h2>{meetup.title}</h2>
        <dl className="preview-meta">
          <div>
            <dt>{metaLabels.when}</dt>
            <dd>{meetup.when}</dd>
          </div>
          <div>
            <dt>{metaLabels.pace}</dt>
            <dd>{meetup.pace}</dd>
          </div>
          <div>
            <dt>{metaLabels.people}</dt>
            <dd>{meetup.attendees}</dd>
          </div>
        </dl>
        {report ? (
          <div className="preview-alert">
            <strong>{report.title}</strong>
            <span>{report.severity}</span>
          </div>
        ) : null}
      </article>
    </section>
  );
}
