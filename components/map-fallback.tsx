type MapFallbackProps = {
  mode: "ride" | "explore";
  status: "loading" | "fallback";
};

export function MapFallback({mode, status}: MapFallbackProps) {
  const title =
    status === "loading"
      ? "Loading Sofia map"
      : "Map temporarily unavailable";

  const body =
    status === "loading"
      ? "Preparing the real map surface and official bike layer."
      : "The prototype could not load the live map right now. Refresh and the app will try the real Sofia map again.";

  return (
    <div className={`map-fallback mode-${mode} status-${status}`}>
      <div className="map-fallback-card">
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </div>
  );
}
