"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

import {appDb, type LocalReportRecord} from "../lib/db/app-db";
import {ModeToggle} from "./mode-toggle";
<<<<<<< Updated upstream
=======
import {PlaceComposer, type PlaceSaveResult} from "./place-composer";
>>>>>>> Stashed changes
import {ReportComposer, type SharedReportSaveResult} from "./report-composer";
import {MapStage} from "./map-stage";
import {MeetupCard} from "./meetup-card";
import {ThemeRail} from "./theme-rail";
import {TransitRulesCard} from "./transit-rules-card";
import {LegalConsentGate} from "./legal-consent-gate";
import type {ReportCategoryKey, ReportTypeKey} from "../lib/data/report-presets";
import type {ReportSeverity} from "../lib/data/reports";
import {seededPlaces, type PlaceCategoryKey} from "../lib/data/places";
import {normalizeSharedReport, type SharedReportRecord} from "../lib/supabase/reports";
<<<<<<< Updated upstream
=======
import {normalizeSharedPlace as normalizeSharedPlaceRecord, type SharedPlaceRecord as SharedPlaceRecordType} from "../lib/supabase/places";
>>>>>>> Stashed changes
import {getSupabaseBrowserClient} from "../lib/supabase/browser";

type AppTab = "dashboard" | "routes" | "social";

type AppShellProps = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  metaLabels: {
    prototype: string;
    cityPulse: string;
    routePreview: string;
    freshSignals: string;
    officialLayer: string;
    gpsReady: string;
    gpsLocating: string;
    gpsActive: string;
    gpsBlocked: string;
    gpsUnsupported: string;
    transitBeta: string;
    fullMap: string;
    backToSplit: string;
    safety: string;
    distance: string;
    elevation: string;
    when: string;
    pace: string;
    people: string;
  };
  labels: {
    rideMode: string;
    exploreMode: string;
    reports: string;
    meetup: string;
    meetupJoined: string;
    meetupMaybe: string;
    meetupShared: string;
    meetupShareUnavailable: string;
    locationPrecise: string;
    locationFallback: string;
    locationBlocked: string;
    locationManual: string;
<<<<<<< Updated upstream
=======
  };
  placeForm: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    noteLabel: string;
    notePlaceholder: string;
    categoryLabel: string;
    submitLabel: string;
    savingLabel: string;
    savedLabel: string;
    safetyNote: string;
    categories: {
      id: PlaceCategoryKey;
      label: string;
    }[];
    pickerLabels: {
      start: string;
      change: string;
      clear: string;
      active: string;
      picked: string;
      required: string;
    };
    resultLabels: {
      submitted: string;
      authRequired: string;
      unavailable: string;
    };
>>>>>>> Stashed changes
  };
  reportForm: {
    title: string;
    subtitle: string;
    notePlaceholder: string;
    submitLabel: string;
    savingLabel: string;
    savedLabel: string;
    safetyNote: string;
    chipOptions: {
      id: ReportTypeKey;
      label: string;
      severity: ReportSeverity;
      categoryKey: ReportCategoryKey;
    }[];
    syncLabels: {
      sharedSaved: string;
      authRequired: string;
      unavailable: string;
    };
    mapPickLabels: {
      start: string;
      change: string;
      clear: string;
      active: string;
      picked: string;
    };
  };
  meetup: {
    title: string;
    visibility: string;
    when: string;
    pace: string;
    attendees: string;
    note: string;
    safetyNote: string;
    joinLabel: string;
    maybeLabel: string;
    shareLabel: string;
    coordinates: [number, number];
  };
  transit: {
    title: string;
    badge: string;
    intro: string;
    metroTitle: string;
    metroRule: string;
    surfaceTitle: string;
    surfaceRule: string;
    etiquetteTitle: string;
    etiquetteItems: string[];
  };
  themesLabel: string;
  themeCards: {
    id: string;
    title: string;
    vibe: string;
    safety: string;
    distanceKm: string;
    elevationM: string;
    accent: string;
    previewPath: [number, number][];
  }[];
  reports: {
    id: string;
    title: string;
    category: string;
    severity: string;
    ageMinutes: number;
    confirmations: number;
    coordinates: [number, number];
  }[];
};

export function AppShell({
  hero,
  stats,
  metaLabels,
  labels,
  placeForm,
  reportForm,
  meetup,
  transit,
  themesLabel,
  themeCards,
  reports
}: AppShellProps) {
  const homeT = useTranslations("home");
  const reportT = useTranslations("reportTypes");
  const miscT = useTranslations("misc");
  const [mode, setMode] = useState<"ride" | "explore">("explore");
  const [activeTab, setActiveTab] = useState<AppTab>("dashboard");
  const [selectedThemeId, setSelectedThemeId] = useState(themeCards[0]?.id ?? "");
  const [localReports, setLocalReports] = useState<LocalReportRecord[]>([]);
  const [sharedReports, setSharedReports] = useState<SharedReportRecord[]>([]);
  const [sharedPlaces, setSharedPlaces] = useState<SharedPlaceRecordType[]>([]);
  const [hasLoadedSharedReports, setHasLoadedSharedReports] = useState(false);
  const [hasLoadedSharedPlaces, setHasLoadedSharedPlaces] = useState(false);
  const [mapWindowMode, setMapWindowMode] = useState<"split" | "focus">("split");
  const [reportPickerCoordinates, setReportPickerCoordinates] = useState<[number, number] | null>(
    null
  );
  const [isPickingReportCoordinates, setIsPickingReportCoordinates] = useState(false);
<<<<<<< Updated upstream
=======
  const [placePickerCoordinates, setPlacePickerCoordinates] = useState<[number, number] | null>(
    null
  );
  const [isPickingPlaceCoordinates, setIsPickingPlaceCoordinates] = useState(false);
>>>>>>> Stashed changes
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadPreferences = async () => {
      const [savedMode, savedTheme, savedTab] = await Promise.all([
        appDb.uiPreferences.get("mode"),
        appDb.uiPreferences.get("theme"),
        appDb.uiPreferences.get("tab")
      ]);

      if (isCancelled) {
        return;
      }

      if (savedMode?.value === "ride" || savedMode?.value === "explore") {
        setMode(savedMode.value);
      } else {
        const legacyMode = window.localStorage.getItem("bike-sofia-mode");

        if (legacyMode === "ride" || legacyMode === "explore") {
          setMode(legacyMode);
        }
      }

      if (savedTheme?.value && themeCards.some((theme) => theme.id === savedTheme.value)) {
        setSelectedThemeId(savedTheme.value);
      } else {
        const legacyTheme = window.localStorage.getItem("bike-sofia-theme");

        if (legacyTheme && themeCards.some((theme) => theme.id === legacyTheme)) {
          setSelectedThemeId(legacyTheme);
        }
      }

      if (
        savedTab?.value === "dashboard" ||
        savedTab?.value === "routes" ||
        savedTab?.value === "social"
      ) {
        setActiveTab(savedTab.value);
      }

      setPreferencesReady(true);
    };

    void loadPreferences();

    return () => {
      isCancelled = true;
    };
  }, [themeCards]);

  useEffect(() => {
    if (!preferencesReady) {
      return;
    }

    void appDb.uiPreferences.put({
      key: "mode",
      value: mode,
      updatedAt: Date.now()
    });
  }, [mode, preferencesReady]);

  useEffect(() => {
    if (!preferencesReady || !selectedThemeId) {
      return;
    }

    void appDb.uiPreferences.put({
      key: "theme",
      value: selectedThemeId,
      updatedAt: Date.now()
    });
  }, [preferencesReady, selectedThemeId]);

  useEffect(() => {
    if (!preferencesReady) {
      return;
    }

    void appDb.uiPreferences.put({
      key: "tab",
      value: activeTab,
      updatedAt: Date.now()
    });
  }, [activeTab, preferencesReady]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    if (mapWindowMode === "focus") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mapWindowMode]);

  useEffect(() => {
    let isCancelled = false;

    const loadLocalReports = async () => {
      const storedReports = await appDb.localReports.orderBy("createdAt").reverse().toArray();

      if (!isCancelled) {
        setLocalReports(storedReports);
      }
    };

    void loadLocalReports();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadSharedPlaces = async () => {
      try {
        const response = await fetch("/api/places", {
          cache: "no-store"
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as {data?: SharedPlaceRecordType[]};

        if (!isCancelled && Array.isArray(payload.data)) {
          setSharedPlaces(payload.data);
          setHasLoadedSharedPlaces(true);
        }
      } catch {
        // Keep seeded places when the backend is not configured yet.
      }
    };

    void loadSharedPlaces();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadSharedReports = async () => {
      try {
        const response = await fetch("/api/reports", {
          cache: "no-store"
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as {data?: SharedReportRecord[]};

        if (!isCancelled && Array.isArray(payload.data)) {
          setSharedReports(payload.data);
          setHasLoadedSharedReports(true);
        }
      } catch {
        // Keep seeded reports when the shared backend is not configured yet.
      }
    };

    void loadSharedReports();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const syncTime = () => {
      setCurrentTime(Date.now());
    };

    syncTime();
    const interval = window.setInterval(syncTime, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const selectedTheme =
    themeCards.find((theme) => theme.id === selectedThemeId) ?? themeCards[0];
  const seededOrSharedReports = hasLoadedSharedReports
    ? sharedReports.map(normalizeSharedReport).map((report) => ({
        id: report.id,
        title: reportT(report.reportTypeKey),
        category: miscT(report.categoryKey),
        severity: report.severity,
        ageMinutes: report.ageMinutes,
        confirmations: report.confirmations,
        coordinates: report.coordinates
      }))
    : reports;

  const mergedReports = [
    ...localReports.map((report) => ({
      id: report.id,
      title: reportT(report.reportTypeKey),
      category: miscT(report.categoryKey),
      severity: report.severity,
      ageMinutes: Math.max(
        1,
        Math.round(((currentTime ?? report.createdAt) - report.createdAt) / 60_000)
      ),
      confirmations: report.confirmations,
      coordinates: report.coordinates
    })),
    ...seededOrSharedReports
  ];
  const mergedPlaces = hasLoadedSharedPlaces
    ? sharedPlaces.map(normalizeSharedPlaceRecord)
    : seededPlaces;
  const pulseReports = mergedReports.slice(0, 4);
  const pulsePlaces = mergedPlaces.slice(0, 4);
  const weeklyStats = [
    {label: homeT("weekly.streak"), value: "3x"},
    {label: homeT("weekly.rides"), value: "4"},
    {label: homeT("weekly.calmKm"), value: "42 km"}
  ];
  const mapIsFocused = mapWindowMode === "focus";
<<<<<<< Updated upstream
=======
  const activePicker =
    activeTab === "social"
      ? {
          isActive: isPickingPlaceCoordinates,
          labels: {
            idle: placeForm.pickerLabels.start,
            active: placeForm.pickerLabels.active,
            picked: placeForm.pickerLabels.picked
          },
          selectedCoordinates: placePickerCoordinates,
          onPickCoordinates: (coordinates: [number, number]) => {
            setPlacePickerCoordinates(coordinates);
            setIsPickingPlaceCoordinates(false);
          }
        }
      : {
          isActive: isPickingReportCoordinates,
          labels: {
            idle: reportForm.mapPickLabels.start,
            active: reportForm.mapPickLabels.active,
            picked: reportForm.mapPickLabels.picked
          },
          selectedCoordinates: reportPickerCoordinates,
          onPickCoordinates: (coordinates: [number, number]) => {
            setReportPickerCoordinates(coordinates);
            setIsPickingReportCoordinates(false);
          }
        };
>>>>>>> Stashed changes
  const createSharedReport = async ({
    reportTypeKey,
    note,
    coordinates
  }: {
    reportTypeKey: ReportTypeKey;
    note: string;
    coordinates: [number, number];
  }): Promise<SharedReportSaveResult> => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return "unavailable";
    }

    const {
      data: {session}
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (!accessToken) {
      return "auth-required";
    }

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          reportTypeKey,
          note,
          coordinates
        })
      });

      if (response.status === 401) {
        return "auth-required";
      }

      if (response.status === 503) {
        return "unavailable";
      }

      if (!response.ok) {
        return "unavailable";
      }

      const payload = (await response.json()) as {data?: SharedReportRecord};

      if (!payload.data) {
        return "unavailable";
      }

      setHasLoadedSharedReports(true);
      setSharedReports((current) => [payload.data!, ...current]);
      return "shared";
    } catch {
      return "unavailable";
    }
  };
<<<<<<< Updated upstream
=======
  const createPlace = async ({
    title,
    categoryKey,
    description,
    coordinates
  }: {
    title: string;
    categoryKey: PlaceCategoryKey;
    description: string;
    coordinates: [number, number];
  }): Promise<PlaceSaveResult> => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return "unavailable";
    }

    const {
      data: {session}
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (!accessToken) {
      return "auth-required";
    }

    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title,
          categoryKey,
          description,
          coordinates
        })
      });

      if (response.status === 401) {
        return "auth-required";
      }

      if (response.status === 503) {
        return "unavailable";
      }

      if (!response.ok) {
        return "unavailable";
      }

      return "submitted";
    } catch {
      return "unavailable";
    }
  };
>>>>>>> Stashed changes

  if (!selectedTheme) {
    return null;
  }

  return (
    <main className={`page-shell mode-${mode}`}>
      <LegalConsentGate />
      {mapIsFocused ? (
        <button
          aria-label="Close full window map"
          className="map-focus-backdrop"
          type="button"
          onClick={() => setMapWindowMode("split")}
        />
      ) : null}
      <nav className="section-tabs shell-card" aria-label={homeT("tabs.dashboard")}>
        {([
          {id: "dashboard", label: homeT("tabs.dashboard")},
          {id: "routes", label: homeT("tabs.routes")},
          {id: "social", label: homeT("tabs.social")}
        ] as {id: AppTab; label: string}[]).map((tab) => (
          <button
            className={`section-tab ${activeTab === tab.id ? "active" : ""}`}
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "dashboard" ? (
        <>
          <section
            className={`dashboard-grid tab-panel-grid dashboard-primary-grid ${
              mapIsFocused ? "map-focused" : ""
            }`}
          >
            <MapStage
              expanded={mapIsFocused}
              featuredReports={pulseReports}
              labels={labels}
              metaLabels={metaLabels}
              meetup={meetup}
              mode={mode}
<<<<<<< Updated upstream
              picker={{
                isActive: isPickingReportCoordinates,
                labels: {
                  idle: reportForm.mapPickLabels.start,
                  active: reportForm.mapPickLabels.active,
                  picked: reportForm.mapPickLabels.picked
                },
                selectedCoordinates: reportPickerCoordinates,
                onPickCoordinates: (coordinates) => {
                  setReportPickerCoordinates(coordinates);
                  setIsPickingReportCoordinates(false);
                }
              }}
=======
              picker={activePicker}
              places={mergedPlaces}
>>>>>>> Stashed changes
              onOpenRoutes={() => setActiveTab("routes")}
              onOpenSocial={() => setActiveTab("social")}
              onToggleExpanded={() =>
                setMapWindowMode((current) => (current === "focus" ? "split" : "focus"))
              }
              reports={mergedReports}
              theme={selectedTheme}
            />

            <div className="dashboard-sidebar">
              <ReportComposer
                {...reportForm}
                locationLabels={{
                  precise: labels.locationPrecise,
                  fallback: labels.locationFallback,
                  blocked: labels.locationBlocked,
                  manual: labels.locationManual
                }}
                mapPickLabels={reportForm.mapPickLabels}
                isPickingCoordinates={isPickingReportCoordinates}
                onCreateSharedReport={createSharedReport}
                onClearCoordinatePick={() => {
                  setReportPickerCoordinates(null);
                  setIsPickingReportCoordinates(false);
                }}
                onCreateLocalReport={(report) => {
                  setLocalReports((current) => [
                    report,
                    ...current.filter((entry) => entry.id !== report.id)
                  ]);
                }}
                onRemoveLocalReport={(reportId) => {
                  setLocalReports((current) => current.filter((entry) => entry.id !== reportId));
                }}
                onStartCoordinatePick={() => {
                  setMapWindowMode("focus");
                  setIsPickingReportCoordinates(true);
                }}
                selectedCoordinates={reportPickerCoordinates}
              />
              <section className="panel-card shell-card">
                <div className="panel-header">
                  <h2>{homeT("quickSignalsTitle")}</h2>
                  <p>{homeT("quickSignalsSubtitle")}</p>
                </div>
                <div className="signal-stack">
                  {pulseReports.map((report) => (
                    <article className="signal-card" key={report.id}>
                      <span className={`signal-badge severity-${report.severity.toLowerCase()}`}>
                        {report.severity}
                      </span>
                      <div>
                        <strong>{report.title}</strong>
                        <p>
                          {report.confirmations}x | {report.ageMinutes}m
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="panel-card shell-card">
                <div className="panel-header">
                  <h2>{homeT("dashboardActionsTitle")}</h2>
                  <p>{homeT("dashboardActionsSubtitle")}</p>
                </div>
                <div className="button-stack">
                  <button
                    className="primary-button full-width-button"
                    type="button"
                    onClick={() => setActiveTab("routes")}
                  >
                    {homeT("lastRide.repeat")}
                  </button>
                  <button
                    className="ghost-button full-width-button"
                    type="button"
                    onClick={() => setActiveTab("social")}
                  >
                    {homeT("socialHub.openSocial")}
                  </button>
                </div>
              </section>
            </div>
          </section>

          <section className="dashboard-secondary-grid">
            <section className="hero-panel shell-card dashboard-story-panel">
              <div className="hero-toolbar">
                <span className="prototype-pill">{metaLabels.prototype}</span>
                <ModeToggle
                  rideLabel={labels.rideMode}
                  exploreLabel={labels.exploreMode}
                  value={mode}
                  onChange={setMode}
                />
              </div>
              <div className="hero-copy">
                <p className="eyebrow">{hero.eyebrow}</p>
                <h1>{hero.title}</h1>
                <p className="hero-subtitle">{hero.subtitle}</p>
              </div>
              <section className="stat-ribbon">
                {stats.map((stat) => (
                  <article className="stat-card" key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </article>
                ))}
              </section>
            </section>

            <div className="hero-stack">
              <section className="panel-card shell-card hero-summary-card">
                <div className="panel-header">
                  <h2>{homeT("weekly.title")}</h2>
                  <span className="status-chip accent-chip">{homeT("weekly.badge")}</span>
                </div>
                <p className="summary-copy">{homeT("weekly.subtitle")}</p>
                <div className="summary-metrics">
                  {weeklyStats.map((stat) => (
                    <article className="summary-stat" key={stat.label}>
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </article>
                  ))}
                </div>
              </section>

              <section className="panel-card shell-card hero-summary-card">
                <div className="panel-header">
                  <h2>{homeT("lastRide.title")}</h2>
                  <span className="status-chip">{selectedTheme.title}</span>
                </div>
                <p className="summary-copy">{homeT("lastRide.subtitle")}</p>
                <div className="summary-metrics route-summary-metrics">
                  <article className="summary-stat">
                    <span>{metaLabels.safety}</span>
                    <strong>{selectedTheme.safety}</strong>
                  </article>
                  <article className="summary-stat">
                    <span>{metaLabels.distance}</span>
                    <strong>{selectedTheme.distanceKm} km</strong>
                  </article>
                  <article className="summary-stat">
                    <span>{metaLabels.elevation}</span>
                    <strong>{selectedTheme.elevationM} m</strong>
                  </article>
                </div>
                <div className="button-row">
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => setActiveTab("routes")}
                  >
                    {homeT("lastRide.repeat")}
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => setActiveTab("routes")}
                  >
                    {homeT("lastRide.openRoutes")}
                  </button>
                </div>
              </section>
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "routes" ? (
        <section className={`dashboard-grid tab-panel-grid ${mapIsFocused ? "map-focused" : ""}`}>
          <MapStage
            expanded={mapIsFocused}
            featuredReports={pulseReports}
            labels={labels}
            metaLabels={metaLabels}
            meetup={meetup}
            mode={mode}
<<<<<<< Updated upstream
            picker={{
              isActive: isPickingReportCoordinates,
              labels: {
                idle: reportForm.mapPickLabels.start,
                active: reportForm.mapPickLabels.active,
                picked: reportForm.mapPickLabels.picked
              },
              selectedCoordinates: reportPickerCoordinates,
              onPickCoordinates: (coordinates) => {
                setReportPickerCoordinates(coordinates);
                setIsPickingReportCoordinates(false);
              }
            }}
=======
            picker={activePicker}
            places={mergedPlaces}
>>>>>>> Stashed changes
            onOpenRoutes={() => setActiveTab("routes")}
            onOpenSocial={() => setActiveTab("social")}
            onToggleExpanded={() =>
              setMapWindowMode((current) => (current === "focus" ? "split" : "focus"))
            }
            reports={mergedReports}
            theme={selectedTheme}
          />

          <div className="dashboard-sidebar">
            <ThemeRail
              label={themesLabel}
              metricLabels={metaLabels}
              onSelect={setSelectedThemeId}
              selectedId={selectedTheme.id}
              themes={themeCards}
            />
            <section className="panel-card shell-card">
              <div className="panel-header">
                <h2>{homeT("routePlanner.title")}</h2>
                <p>{homeT("routePlanner.subtitle")}</p>
              </div>
              <div className="summary-metrics route-summary-metrics">
                <article className="summary-stat">
                  <span>{metaLabels.safety}</span>
                  <strong>{selectedTheme.safety}</strong>
                </article>
                <article className="summary-stat">
                  <span>{metaLabels.distance}</span>
                  <strong>{selectedTheme.distanceKm} km</strong>
                </article>
                <article className="summary-stat">
                  <span>{metaLabels.elevation}</span>
                  <strong>{selectedTheme.elevationM} m</strong>
                </article>
              </div>
              <div className="button-row">
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setActiveTab("dashboard")}
                >
                  {homeT("routePlanner.primary")}
                </button>
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => setActiveTab("social")}
                >
                  {homeT("routePlanner.secondary")}
                </button>
              </div>
            </section>
          </div>
        </section>
      ) : null}

      {activeTab === "social" ? (
        <section className={`dashboard-grid tab-panel-grid ${mapIsFocused ? "map-focused" : ""}`}>
          <MapStage
            expanded={mapIsFocused}
            featuredReports={pulseReports}
            labels={labels}
            metaLabels={metaLabels}
            meetup={meetup}
            mode={mode}
            picker={activePicker}
            places={mergedPlaces}
            onOpenRoutes={() => setActiveTab("routes")}
            onOpenSocial={() => setActiveTab("social")}
            onToggleExpanded={() =>
              setMapWindowMode((current) => (current === "focus" ? "split" : "focus"))
            }
            reports={mergedReports}
            theme={selectedTheme}
          />

          <div className="dashboard-sidebar">
            <section className="panel-card shell-card">
              <div className="panel-header">
                <h2>{homeT("socialHub.title")}</h2>
                <p>{homeT("socialHub.subtitle")}</p>
              </div>
              <div className="summary-metrics">
                <article className="summary-stat">
                  <span>{homeT("socialHub.reports")}</span>
                  <strong>{reportForm.chipOptions.length}</strong>
                </article>
                <article className="summary-stat">
                  <span>{homeT("socialHub.meetups")}</span>
                  <strong>1</strong>
                </article>
                <article className="summary-stat">
                  <span>{homeT("socialHub.transit")}</span>
                  <strong>{miscT("beta")}</strong>
                </article>
              </div>
            </section>

            <PlaceComposer
              {...placeForm}
              isPickingCoordinates={isPickingPlaceCoordinates}
              onClearCoordinatePick={() => {
                setPlacePickerCoordinates(null);
                setIsPickingPlaceCoordinates(false);
              }}
              onCreatePlace={createPlace}
              onStartCoordinatePick={() => {
                setMapWindowMode("focus");
                setIsPickingPlaceCoordinates(true);
              }}
              selectedCoordinates={placePickerCoordinates}
            />

            <section className="panel-card shell-card">
              <div className="panel-header">
                <h2>{homeT("socialHub.placesTitle")}</h2>
                <p>{homeT("socialHub.placesSubtitle")}</p>
              </div>
              <div className="signal-stack">
                {pulsePlaces.map((place) => (
                  <article className="signal-card" key={place.id}>
                    <span className={`place-badge source-${place.sourceKind}`}>{miscT(place.categoryKey)}</span>
                    <div>
                      <strong>{place.title}</strong>
                      <p>{place.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <MeetupCard
              actionFeedbackLabels={{
                joined: labels.meetupJoined,
                maybe: labels.meetupMaybe,
                shared: labels.meetupShared,
                shareUnavailable: labels.meetupShareUnavailable
              }}
              labels={metaLabels}
              {...meetup}
            />
            <TransitRulesCard {...transit} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
