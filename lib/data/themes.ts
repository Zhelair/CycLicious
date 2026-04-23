export type RouteTheme = {
  id: string;
  labelKey: string;
  accent: string;
  vibeKey: string;
  distanceKm: string;
  elevationM: string;
  safetyKey: string;
  previewPath: [number, number][];
};

export const routeThemes: RouteTheme[] = [
  {
    id: "safe-commute",
    labelKey: "safeCommute",
    accent: "var(--accent-sky)",
    vibeKey: "fastestUseful",
    distanceKm: "6.8",
    elevationM: "48",
    safetyKey: "lowStress",
    previewPath: [
      [23.3089, 42.7034],
      [23.3132, 42.7022],
      [23.3198, 42.6997],
      [23.3269, 42.6967],
      [23.3335, 42.6948]
    ]
  },
  {
    id: "historical-route",
    labelKey: "historicalRoute",
    accent: "var(--accent-amber)",
    vibeKey: "cityStories",
    distanceKm: "11.4",
    elevationM: "72",
    safetyKey: "balanced",
    previewPath: [
      [23.3148, 42.7004],
      [23.3192, 42.6987],
      [23.3228, 42.6968],
      [23.3281, 42.6962],
      [23.3338, 42.6981]
    ]
  },
  {
    id: "beer-snack",
    labelKey: "beerSnack",
    accent: "var(--accent-hop)",
    vibeKey: "afterRide",
    distanceKm: "8.3",
    elevationM: "36",
    safetyKey: "chill",
    previewPath: [
      [23.3057, 42.6792],
      [23.3109, 42.6815],
      [23.3185, 42.6841],
      [23.3255, 42.6858],
      [23.333, 42.6861]
    ]
  },
  {
    id: "shkembe-route",
    labelKey: "shkembeRoute",
    accent: "var(--accent-poppy)",
    vibeKey: "lateNightRecovery",
    distanceKm: "9.1",
    elevationM: "58",
    safetyKey: "funRoute",
    previewPath: [
      [23.3093, 42.6919],
      [23.3158, 42.6927],
      [23.3224, 42.6949],
      [23.3296, 42.6976],
      [23.3364, 42.6991]
    ]
  },
  {
    id: "shade-route",
    labelKey: "shadeRoute",
    accent: "var(--accent-forest)",
    vibeKey: "summerEscape",
    distanceKm: "7.5",
    elevationM: "40",
    safetyKey: "coolerRide",
    previewPath: [
      [23.3325, 42.6917],
      [23.3364, 42.6945],
      [23.3413, 42.6971],
      [23.3477, 42.7005],
      [23.3533, 42.7032]
    ]
  }
];
