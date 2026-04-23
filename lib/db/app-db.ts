import Dexie, {type EntityTable} from "dexie";

import type {ReportSeverity} from "../data/reports";
import type {ReportCategoryKey, ReportTypeKey} from "../data/report-presets";

export type UiPreference = {
  key: string;
  value: string;
  updatedAt: number;
};

export type ReportDraft = {
  key: string;
  activeChipId: ReportTypeKey;
  note: string;
  updatedAt: number;
};

export type LocalReportRecord = {
  id: string;
  reportTypeKey: ReportTypeKey;
  categoryKey: ReportCategoryKey;
  severity: ReportSeverity;
  note: string;
  coordinates: [number, number];
  confirmations: number;
  createdAt: number;
};

export type CachedLayerRecord = {
  key: string;
  data: unknown;
  updatedAt: number;
};

export class AppDatabase extends Dexie {
  uiPreferences!: EntityTable<UiPreference, "key">;
  reportDrafts!: EntityTable<ReportDraft, "key">;
  localReports!: EntityTable<LocalReportRecord, "id">;
  cachedLayers!: EntityTable<CachedLayerRecord, "key">;

  constructor() {
    super("sofia-bike-companion");
    this.version(3).stores({
      uiPreferences: "key, updatedAt",
      reportDrafts: "key, updatedAt, activeChipId",
      localReports: "id, createdAt, reportTypeKey, severity",
      cachedLayers: "key, updatedAt"
    });
  }
}

export const appDb = new AppDatabase();
