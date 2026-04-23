import type {ReportSeverity} from "./reports";

export type ReportCategoryKey = "critical" | "important" | "positive";
export type ReportTypeKey =
  | "blockedLane"
  | "tramDanger"
  | "construction"
  | "goodParking"
  | "quietShortcut"
  | "beerSnack"
  | "shkembeStop";

export type ReportPreset = {
  id: ReportTypeKey;
  titleKey: ReportTypeKey;
  categoryKey: ReportCategoryKey;
  severity: ReportSeverity;
};

export const reportPresets: ReportPreset[] = [
  {
    id: "blockedLane",
    titleKey: "blockedLane",
    categoryKey: "important",
    severity: "S2"
  },
  {
    id: "tramDanger",
    titleKey: "tramDanger",
    categoryKey: "critical",
    severity: "S3"
  },
  {
    id: "construction",
    titleKey: "construction",
    categoryKey: "important",
    severity: "S2"
  },
  {
    id: "goodParking",
    titleKey: "goodParking",
    categoryKey: "positive",
    severity: "S0"
  },
  {
    id: "quietShortcut",
    titleKey: "quietShortcut",
    categoryKey: "positive",
    severity: "S0"
  },
  {
    id: "beerSnack",
    titleKey: "beerSnack",
    categoryKey: "positive",
    severity: "S0"
  },
  {
    id: "shkembeStop",
    titleKey: "shkembeStop",
    categoryKey: "positive",
    severity: "S0"
  }
];

export function getReportPreset(id: ReportTypeKey) {
  return reportPresets.find((preset) => preset.id === id);
}
