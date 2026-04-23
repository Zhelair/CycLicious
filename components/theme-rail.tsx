type ThemeRailProps = {
  label: string;
  metricLabels: {
    safety: string;
    distance: string;
    elevation: string;
  };
  selectedId: string;
  onSelect: (id: string) => void;
  themes: {
    id: string;
    title: string;
    vibe: string;
    safety: string;
    distanceKm: string;
    elevationM: string;
    accent: string;
  }[];
};

export function ThemeRail({
  label,
  metricLabels,
  onSelect,
  selectedId,
  themes
}: ThemeRailProps) {
  return (
    <section className="theme-rail shell-card">
      <div className="panel-header">
        <h2>{label}</h2>
      </div>
      <div className="theme-cards">
        {themes.map((theme) => (
          <button
            className={`theme-card ${theme.id === selectedId ? "active" : ""}`}
            key={theme.id}
            type="button"
            onClick={() => onSelect(theme.id)}
          >
            <span
              className="theme-accent"
              style={{backgroundColor: theme.accent}}
            />
            <h3>{theme.title}</h3>
            <p>{theme.vibe}</p>
            <dl>
              <div>
                <dt>{metricLabels.safety}</dt>
                <dd>{theme.safety}</dd>
              </div>
              <div>
                <dt>{metricLabels.distance}</dt>
                <dd>{theme.distanceKm} km</dd>
              </div>
              <div>
                <dt>{metricLabels.elevation}</dt>
                <dd>{theme.elevationM} m</dd>
              </div>
            </dl>
          </button>
        ))}
      </div>
    </section>
  );
}
