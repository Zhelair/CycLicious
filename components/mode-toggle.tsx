type ModeToggleProps = {
  rideLabel: string;
  exploreLabel: string;
  value: "ride" | "explore";
  onChange: (value: "ride" | "explore") => void;
};

export function ModeToggle({
  rideLabel,
  exploreLabel,
  value,
  onChange
}: ModeToggleProps) {
  return (
    <div className="mode-toggle" role="tablist" aria-label="Mode switch">
      <button
        className={value === "ride" ? "active" : ""}
        type="button"
        onClick={() => onChange("ride")}
      >
        {rideLabel}
      </button>
      <button
        className={value === "explore" ? "active" : ""}
        type="button"
        onClick={() => onChange("explore")}
      >
        {exploreLabel}
      </button>
    </div>
  );
}
