import {getReportPreset, type ReportTypeKey} from "../data/report-presets";
import type {ReportSeverity} from "../data/reports";

export type SharedReportRecord = {
  id: string;
  report_type: ReportTypeKey;
  category_key: string;
  severity: ReportSeverity;
  note: string;
  latitude: number;
  longitude: number;
  created_at: string;
  status: string;
};

export function isReportTypeKey(value: string): value is ReportTypeKey {
  return Boolean(getReportPreset(value as ReportTypeKey));
}

export function normalizeSharedReport(record: SharedReportRecord) {
  return {
    id: record.id,
    reportTypeKey: record.report_type,
    categoryKey: record.category_key,
    severity: record.severity,
    ageMinutes: Math.max(
      1,
      Math.round((Date.now() - new Date(record.created_at).getTime()) / 60_000)
    ),
    confirmations: 1,
    coordinates: [record.longitude, record.latitude] as [number, number]
  };
}
