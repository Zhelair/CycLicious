type TransitRulesCardProps = {
  title: string;
  badge: string;
  intro: string;
  metroTitle: string;
  metroRule: string;
  surfaceTitle: string;
  surfaceRule: string;
  etiquetteTitle: string;
  etiquetteItems: string[];
};

export function TransitRulesCard({
  title,
  badge,
  intro,
  metroTitle,
  metroRule,
  surfaceTitle,
  surfaceRule,
  etiquetteTitle,
  etiquetteItems
}: TransitRulesCardProps) {
  return (
    <section className="panel-card transit-card shell-card">
      <div className="panel-header">
        <h2>{title}</h2>
        <span className="status-chip accent-chip">{badge}</span>
      </div>
      <p className="transit-intro">{intro}</p>

      <div className="transit-rule-block">
        <strong>{metroTitle}</strong>
        <p>{metroRule}</p>
      </div>

      <div className="transit-rule-block">
        <strong>{surfaceTitle}</strong>
        <p>{surfaceRule}</p>
      </div>

      <div className="transit-guidance">
        <strong>{etiquetteTitle}</strong>
        <ul>
          {etiquetteItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
