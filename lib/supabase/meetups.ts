export type SharedMeetupRecord = {
  id: string;
  title: string;
  note: string;
  visibility: "public" | "unlisted" | "private";
  pace_label: string;
  scheduled_for: string;
  area_label: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
};

export function normalizeSharedMeetup(record: SharedMeetupRecord) {
  return {
    id: record.id,
    title: record.title,
    note: record.note,
    visibility: record.visibility,
    paceLabel: record.pace_label,
    scheduledFor: record.scheduled_for,
    areaLabel: record.area_label,
    coordinates:
      typeof record.longitude === "number" && typeof record.latitude === "number"
        ? ([record.longitude, record.latitude] as [number, number])
        : null
  };
}
