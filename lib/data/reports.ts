export type ReportSeverity = "S3" | "S2" | "S1" | "S0";

export type CommunityReport = {
  id: string;
  titleKey: string;
  categoryKey: string;
  severity: ReportSeverity;
  ageMinutes: number;
  confirmations: number;
  coordinates: [number, number];
};

export const communityReports: CommunityReport[] = [
  {
    id: "tram-danger",
    titleKey: "tramDanger",
    categoryKey: "critical",
    severity: "S3",
    ageMinutes: 18,
    confirmations: 4,
    coordinates: [23.3227, 42.697]
  },
  {
    id: "good-parking",
    titleKey: "goodParking",
    categoryKey: "positive",
    severity: "S0",
    ageMinutes: 95,
    confirmations: 11,
    coordinates: [23.3149, 42.691]
  },
  {
    id: "construction",
    titleKey: "construction",
    categoryKey: "important",
    severity: "S2",
    ageMinutes: 230,
    confirmations: 6,
    coordinates: [23.3334, 42.6867]
  },
  {
    id: "quiet-shortcut",
    titleKey: "quietShortcut",
    categoryKey: "positive",
    severity: "S0",
    ageMinutes: 410,
    confirmations: 8,
    coordinates: [23.309, 42.6991]
  },
  {
    id: "shkembe-stop",
    titleKey: "shkembeStop",
    categoryKey: "positive",
    severity: "S0",
    ageMinutes: 520,
    confirmations: 5,
    coordinates: [23.3294, 42.7021]
  }
];
