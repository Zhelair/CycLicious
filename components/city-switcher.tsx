type CityOption = {
  id: string;
  name: string;
  state: "live" | "planned";
};

type CitySwitcherProps = {
  activeCityId: string;
  cities: CityOption[];
  description: string;
  label: string;
  liveLabel: string;
  plannedLabel: string;
};

export function CitySwitcher({
  activeCityId,
  cities,
  description,
  label,
  liveLabel,
  plannedLabel
}: CitySwitcherProps) {
  return (
    <section className="city-switcher" aria-label={label}>
      <div className="city-switcher-copy">
        <strong>{label}</strong>
        <span>{description}</span>
      </div>
      <div className="city-switcher-options">
        {cities.map((city) => {
          const isActive = city.id === activeCityId;

          return (
            <button
              aria-pressed={isActive}
              className={`city-option ${isActive ? "active" : ""}`}
              disabled={city.state !== "live"}
              key={city.id}
              type="button"
            >
              <span>{city.name}</span>
              <small>{city.state === "live" ? liveLabel : plannedLabel}</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
