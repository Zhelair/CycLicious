export type PlaceCategoryKey =
  | "bikeParking"
  | "repairStop"
  | "coffeeStop"
  | "waterPoint"
  | "quietConnector";

export const placeCategoryKeys: PlaceCategoryKey[] = [
  "bikeParking",
  "repairStop",
  "coffeeStop",
  "waterPoint",
  "quietConnector"
];

export type SeedPlace = {
  id: string;
  title: string;
  categoryKey: PlaceCategoryKey;
  description: string;
  sourceKind: "official" | "admin" | "community";
  coordinates: [number, number];
};

export const seededPlaces: SeedPlace[] = [
  {
    id: "seed-rack-ndk",
    title: "NDK bike parking",
    categoryKey: "bikeParking",
    description: "Reliable central rack close to the park and metro access.",
    sourceKind: "official",
    coordinates: [23.3198, 42.6851]
  },
  {
    id: "seed-repair-lozenets",
    title: "Lozenets repair stop",
    categoryKey: "repairStop",
    description: "Trusted fix point for tubes and quick adjustments.",
    sourceKind: "admin",
    coordinates: [23.3242, 42.6765]
  },
  {
    id: "seed-water-south-park",
    title: "South Park fountain",
    categoryKey: "waterPoint",
    description: "Useful refill point before or after a park loop.",
    sourceKind: "official",
    coordinates: [23.318, 42.6762]
  }
];
