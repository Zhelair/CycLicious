import type {PlaceCategoryKey} from "../data/places";

export type SharedPlaceRecord = {
  id: string;
  title: string;
  category_key: PlaceCategoryKey;
  description: string;
  source_kind: "official" | "admin" | "community";
  latitude: number;
  longitude: number;
  status: "pending" | "approved" | "rejected" | "hidden";
  created_at: string;
};

export function normalizeSharedPlace(record: SharedPlaceRecord) {
  return {
    id: record.id,
    title: record.title,
    categoryKey: record.category_key,
    description: record.description,
    sourceKind: record.source_kind,
    coordinates: [record.longitude, record.latitude] as [number, number]
  };
}
