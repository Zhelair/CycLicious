"use client";

import {useEffect, useState} from "react";

import {appDb, type LocalReportRecord} from "../lib/db/app-db";
import type {ReportCategoryKey, ReportTypeKey} from "../lib/data/report-presets";
import type {ReportSeverity} from "../lib/data/reports";

type ReportComposerProps = {
  title: string;
  subtitle: string;
  notePlaceholder: string;
  submitLabel: string;
  savingLabel: string;
  savedLabel: string;
  safetyNote: string;
  locationLabels: {
    precise: string;
    fallback: string;
    blocked: string;
  };
  chipOptions: {
    id: ReportTypeKey;
    label: string;
    severity: ReportSeverity;
    categoryKey: ReportCategoryKey;
  }[];
  onCreateSharedReport?: (payload: {
    reportTypeKey: ReportTypeKey;
    note: string;
    coordinates: [number, number];
  }) => Promise<boolean>;
  onCreateLocalReport: (report: LocalReportRecord) => void;
  onRemoveLocalReport?: (id: string) => void;
};

export function ReportComposer({
  title,
  subtitle,
  notePlaceholder,
  submitLabel,
  savingLabel,
  savedLabel,
  safetyNote,
  locationLabels,
  chipOptions,
  onCreateSharedReport,
  onCreateLocalReport
  ,
  onRemoveLocalReport
}: ReportComposerProps) {
  const [activeChipId, setActiveChipId] = useState<ReportTypeKey>(
    chipOptions[0]?.id ?? "blockedLane"
  );
  const [note, setNote] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "saving" | "saved">(
    "idle"
  );
  const [locationMessage, setLocationMessage] = useState(locationLabels.precise);

  useEffect(() => {
    let isCancelled = false;

    const loadDraft = async () => {
      const savedDraft = await appDb.reportDrafts.get("composer");

      if (isCancelled) {
        return;
      }

      if (savedDraft && chipOptions.some((chip) => chip.id === savedDraft.activeChipId)) {
        setActiveChipId(savedDraft.activeChipId);
        setNote(savedDraft.note);
        setIsHydrated(true);
        return;
      }

      const legacyChip = window.localStorage.getItem("bike-sofia-report-chip");
      const legacyNote = window.localStorage.getItem("bike-sofia-report-note");
      const migratedChip = chipOptions.find((chip) => chip.label === legacyChip)?.id;

      if (migratedChip || legacyNote) {
        const nextChipId = migratedChip ?? chipOptions[0]?.id ?? "blockedLane";
        const nextNote = legacyNote ?? "";

        await appDb.reportDrafts.put({
          key: "composer",
          activeChipId: nextChipId,
          note: nextNote,
          updatedAt: Date.now()
        });

        if (!isCancelled) {
          setActiveChipId(nextChipId);
          setNote(nextNote);
        }
      }

      if (!isCancelled) {
        setIsHydrated(true);
      }
    };

    void loadDraft();

    return () => {
      isCancelled = true;
    };
  }, [chipOptions]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void appDb.reportDrafts.put({
      key: "composer",
      activeChipId,
      note,
      updatedAt: Date.now()
    });
  }, [activeChipId, isHydrated, note]);

  const activeChip =
    chipOptions.find((chip) => chip.id === activeChipId) ?? chipOptions[0];

  async function resolveCoordinates(): Promise<{
    coordinates: [number, number];
    source: "precise" | "fallback" | "blocked";
  }> {
    const fallback: [number, number] = [23.3219, 42.6977];

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return {coordinates: fallback, source: "fallback"};
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            coordinates: [position.coords.longitude, position.coords.latitude],
            source: "precise"
          });
        },
        (error) =>
          resolve({
            coordinates: fallback,
            source: error.code === 1 ? "blocked" : "fallback"
          }),
        {
          enableHighAccuracy: true,
          timeout: 4000,
          maximumAge: 60_000
        }
      );
    });
  }

  async function handleSubmit() {
    if (!activeChip || submitState === "saving") {
      return;
    }

    setSubmitState("saving");

    const {coordinates, source} = await resolveCoordinates();
    const createdAt = Date.now();
    const localReport: LocalReportRecord = {
      id: `local-${createdAt}`,
      reportTypeKey: activeChip.id,
      categoryKey: activeChip.categoryKey,
      severity: activeChip.severity,
      note: note.trim(),
      coordinates,
      confirmations: 1,
      createdAt
    };

    await appDb.localReports.put(localReport);
    await appDb.reportDrafts.put({
      key: "composer",
      activeChipId: activeChip.id,
      note: "",
      updatedAt: Date.now()
    });

    setNote("");
    setSubmitState("saved");
    setLocationMessage(
      source === "precise"
        ? locationLabels.precise
        : source === "blocked"
          ? locationLabels.blocked
          : locationLabels.fallback
    );
    onCreateLocalReport(localReport);

    const sharedSaved = await onCreateSharedReport?.({
      reportTypeKey: activeChip.id,
      note: note.trim(),
      coordinates
    });

    if (sharedSaved) {
      await appDb.localReports.delete(localReport.id);
      onRemoveLocalReport?.(localReport.id);
    }

    window.setTimeout(() => setSubmitState("idle"), 1800);
  }

  return (
    <section className="panel-card shell-card">
      <div className="panel-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="chip-row">
        {chipOptions.map((chip) => (
          <button
            className={chip.id === activeChipId ? "active" : ""}
            key={chip.id}
            type="button"
            onClick={() => setActiveChipId(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <textarea
        maxLength={120}
        placeholder={notePlaceholder}
        rows={3}
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <div className="field-foot">
        <p className="field-note">{safetyNote}</p>
        <span>{note.length}/120</span>
      </div>
      <p className="field-note location-note">{locationMessage}</p>
      <button className="primary-button" type="button" onClick={handleSubmit}>
        {submitState === "saving"
          ? savingLabel
          : submitState === "saved"
            ? savedLabel
            : submitLabel}
      </button>
    </section>
  );
}
