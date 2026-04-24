import {useState} from "react";

import {LiveMap} from "./live-map";

type MapStageProps = {
  expanded: boolean;
  featuredReports: {
    id: string;
    title: string;
    category: string;
    severity: string;
    ageMinutes: number;
    confirmations: number;
    coordinates: [number, number];
  }[];
  mode: "ride" | "explore";
  labels: {
    reports: string;
    meetup: string;
  };
  metaLabels: {
    routePreview: string;
    freshSignals: string;
    officialLayer: string;
    gpsReady: string;
    gpsLocating: string;
    gpsActive: string;
    gpsBlocked: string;
    gpsUnsupported: string;
    transitBeta: string;
    fullMap: string;
    backToSplit: string;
    safety: string;
    distance: string;
    elevation: string;
  };
  meetup: {
    title: string;
    coordinates: [number, number];
  };
<<<<<<< HEAD
  places: {
    id: string;
    title: string;
    categoryKey: string;
    description: string;
    sourceKind: string;
    coordinates: [number, number];
  }[];
=======
>>>>>>> 4fb1fa70f4cb1f2c1da90e74f12bfaed367cb1f2
  picker: {
    isActive: boolean;
    labels: {
      idle: string;
      active: string;
      picked: string;
    };
    selectedCoordinates: [number, number] | null;
    onPickCoordinates: (coordinates: [number, number]) => void;
  };
  onOpenRoutes: () => void;
  onOpenSocial: () => void;
  onToggleExpanded: () => void;
  theme: {
    title: string;
    vibe: string;
    safety: string;
    distanceKm: string;
    elevationM: string;
    accent: string;
    previewPath: [number, number][];
  };
  reports: {
    id: string;
    title: string;
    category: string;
    severity: string;
    ageMinutes: number;
    confirmations: number;
    coordinates: [number, number];
  }[];
};

export function MapStage({
  expanded,
  featuredReports,
  mode,
  metaLabels,
  meetup,
<<<<<<< HEAD
  places,
=======
>>>>>>> 4fb1fa70f4cb1f2c1da90e74f12bfaed367cb1f2
  picker,
  onOpenRoutes,
  onOpenSocial,
  onToggleExpanded,
  theme,
  reports
}: MapStageProps) {
  const [isOfficialLayerVisible, setIsOfficialLayerVisible] = useState(true);
  const [locateRequestCount, setLocateRequestCount] = useState(0);
  const [gpsState, setGpsState] = useState<
    "idle" | "locating" | "active" | "blocked" | "unsupported"
  >("idle");
  const liveReports = featuredReports.slice(0, 3);
  const gpsLabel =
    gpsState === "locating"
      ? metaLabels.gpsLocating
      : gpsState === "active"
        ? metaLabels.gpsActive
        : gpsState === "blocked"
          ? metaLabels.gpsBlocked
          : gpsState === "unsupported"
            ? metaLabels.gpsUnsupported
            : metaLabels.gpsReady;

  return (
    <section className={`map-stage shell-card map-stage-${mode} ${expanded ? "is-focused" : ""}`}>
      <LiveMap
        isOfficialLayerVisible={isOfficialLayerVisible}
        locateRequestCount={locateRequestCount}
        meetup={meetup}
        mode={mode}
        onGpsStateChange={setGpsState}
<<<<<<< HEAD
        places={places}
=======
>>>>>>> 4fb1fa70f4cb1f2c1da90e74f12bfaed367cb1f2
        picker={picker}
        reports={reports}
        theme={theme}
      />
      <div className="map-overlay rail-left">
        <aside className="map-tool-rail">
          <button className="map-pill button-pill" type="button" onClick={onOpenRoutes}>
            {metaLabels.routePreview}
          </button>
          <button
            aria-pressed={isOfficialLayerVisible}
            className={`map-tool-chip ${isOfficialLayerVisible ? "active" : ""}`}
            type="button"
            onClick={() => setIsOfficialLayerVisible((current) => !current)}
          >
            {metaLabels.officialLayer}
          </button>
          <button
            aria-live="polite"
            className={`map-tool-chip ${
              gpsState === "active" || gpsState === "locating" ? "active" : ""
            }`}
            type="button"
            onClick={() => setLocateRequestCount((current) => current + 1)}
          >
            {gpsLabel}
          </button>
          <button className="map-tool-chip" type="button" onClick={onOpenSocial}>
            {metaLabels.transitBeta}
          </button>
          <button className="map-tool-chip utility" type="button" onClick={onToggleExpanded}>
            {expanded ? metaLabels.backToSplit : metaLabels.fullMap}
          </button>
        </aside>
      </div>
      <div className="map-overlay top-right">
        <div className="map-signal-stack">
          <span className="map-pill">
            {picker.isActive
              ? picker.labels.active
              : picker.selectedCoordinates
                ? picker.labels.picked
                : metaLabels.freshSignals}
          </span>
          {liveReports.map((report) => (
            <article className="map-signal-inline-card" key={report.id}>
              <span className={`signal-badge severity-${report.severity.toLowerCase()}`}>
                {report.severity}
              </span>
              <div>
                <strong>{report.title}</strong>
                <p>
                  {report.confirmations}x | {report.ageMinutes}m
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <article className="map-route-card">
        <div className="map-route-head">
          <span className="status-chip accent-chip">{theme.title}</span>
          <strong>{theme.vibe}</strong>
        </div>
        <dl className="map-route-metrics">
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
      </article>
    </section>
  );
}
