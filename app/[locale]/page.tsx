import {getTranslations, setRequestLocale} from "next-intl/server";

import {AppShell} from "../../components/app-shell";
import {placeCategoryKeys} from "../../lib/data/places";
import {featuredMeetup} from "../../lib/data/meetups";
import {reportPresets} from "../../lib/data/report-presets";
import {communityReports} from "../../lib/data/reports";
import {routeThemes} from "../../lib/data/themes";
import type {Locale} from "../../lib/i18n/config";

export default async function LocaleHomePage({
  params
}: {
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const reportT = await getTranslations("reportTypes");
  const themeT = await getTranslations("routeThemes");
  const miscT = await getTranslations("misc");

  return (
    <AppShell
      hero={{
        eyebrow: t("eyebrow"),
        title: t("title"),
        subtitle: t("subtitle")
      }}
      stats={[
        {label: t("stats.saferSegments"), value: "214"},
        {label: t("stats.liveSignals"), value: "38"},
        {label: t("stats.themedRoutes"), value: "12"}
      ]}
      metaLabels={{
        prototype: t("prototypeBadge"),
        cityPulse: miscT("cityPulse"),
        routePreview: miscT("routePreview"),
        freshSignals: miscT("freshSignals"),
        officialLayer: miscT("officialLayer"),
        gpsReady: miscT("gpsReady"),
        gpsLocating: miscT("gpsLocating"),
        gpsActive: miscT("gpsActive"),
        gpsBlocked: miscT("gpsBlocked"),
        gpsUnsupported: miscT("gpsUnsupported"),
        transitBeta: miscT("transitBeta"),
        fullMap: miscT("fullMap"),
        backToSplit: miscT("backToSplit"),
        safety: miscT("safety"),
        distance: miscT("distance"),
        elevation: miscT("elevation"),
        when: miscT("when"),
        pace: miscT("pace"),
        people: miscT("people")
      }}
      labels={{
        rideMode: t("rideMode"),
        exploreMode: t("exploreMode"),
        reports: t("reportsOverlay"),
        meetup: t("meetupOverlay"),
        meetupJoined: t("meetupActions.joined"),
        meetupMaybe: t("meetupActions.maybe"),
        meetupShared: t("meetupActions.shared"),
        meetupShareUnavailable: t("meetupActions.shareUnavailable"),
        locationPrecise: t("reportLocation.precise"),
        locationFallback: t("reportLocation.fallback"),
        locationBlocked: t("reportLocation.blocked"),
        locationManual: t("reportLocation.manual")
      }}
      placeForm={{
        title: t("placeTitle"),
        subtitle: t("placeSubtitle"),
        nameLabel: t("placeNameLabel"),
        namePlaceholder: t("placeNamePlaceholder"),
        noteLabel: t("placeNoteLabel"),
        notePlaceholder: t("placeNotePlaceholder"),
        categoryLabel: t("placeCategoryLabel"),
        submitLabel: t("placeSubmit"),
        savingLabel: t("placeSaving"),
        savedLabel: t("placeSaved"),
        safetyNote: t("placeSafetyNote"),
        categories: placeCategoryKeys.map((id) => ({
            id,
            label: miscT(id)
          })),
        pickerLabels: {
          start: t("placeMapPick.start"),
          change: t("placeMapPick.change"),
          clear: t("placeMapPick.clear"),
          active: t("placeMapPick.active"),
          picked: t("placeMapPick.picked"),
          required: t("placeMapPick.required")
        },
        resultLabels: {
          submitted: t("placeResult.submitted"),
          authRequired: t("placeResult.authRequired"),
          unavailable: t("placeResult.unavailable")
        }
      }}
      meetupForm={{
        title: t("meetupTitle"),
        subtitle: t("meetupSubtitle"),
        meetupTitleLabel: t("meetupNameLabel"),
        meetupTitlePlaceholder: t("meetupNamePlaceholder"),
        whenLabel: t("meetupWhenLabel"),
        areaLabel: t("meetupAreaLabel"),
        areaPlaceholder: t("meetupAreaPlaceholder"),
        paceLabel: t("meetupPaceLabel"),
        pacePlaceholder: t("meetupPacePlaceholder"),
        noteLabel: t("meetupNoteLabel"),
        notePlaceholder: t("meetupNotePlaceholder"),
        visibilityLabel: t("meetupVisibilityLabel"),
        visibilityOptions: [
          {id: "public", label: miscT("public")},
          {id: "unlisted", label: miscT("unlisted")},
          {id: "private", label: miscT("private")}
        ],
        submitLabel: t("meetupSubmit"),
        savingLabel: t("meetupSaving"),
        savedLabel: t("meetupSaved"),
        safetyNote: t("meetupComposerSafetyNote"),
        pickerLabels: {
          start: t("meetupMapPick.start"),
          change: t("meetupMapPick.change"),
          clear: t("meetupMapPick.clear"),
          active: t("meetupMapPick.active"),
          picked: t("meetupMapPick.picked"),
          required: t("meetupMapPick.required")
        },
        resultLabels: {
          submitted: t("meetupResult.submitted"),
          authRequired: t("meetupResult.authRequired"),
          unavailable: t("meetupResult.unavailable")
        }
      }}
      reportForm={{
        title: t("reportTitle"),
        subtitle: t("reportSubtitle"),
        notePlaceholder: t("notePlaceholder"),
        submitLabel: t("submitReport"),
        savingLabel: t("savingReport"),
        savedLabel: t("savedReport"),
        safetyNote: t("reportSafetyNote"),
        chipOptions: reportPresets
          .filter((preset) =>
            [
              "blockedLane",
              "tramDanger",
              "construction",
              "goodParking",
              "beerSnack",
              "shkembeStop"
            ].includes(preset.id)
          )
          .map((preset) => ({
            id: preset.id,
            label: reportT(preset.titleKey),
            severity: preset.severity,
            categoryKey: preset.categoryKey
          })),
        syncLabels: {
          sharedSaved: t("reportSync.sharedSaved"),
          authRequired: t("reportSync.authRequired"),
          unavailable: t("reportSync.unavailable")
        },
        mapPickLabels: {
          start: t("reportMapPick.start"),
          change: t("reportMapPick.change"),
          clear: t("reportMapPick.clear"),
          active: t("reportMapPick.active"),
          picked: t("reportMapPick.picked")
        }
      }}
      meetup={{
        title: t(`meetups.${featuredMeetup.titleKey}`),
        visibility: miscT(featuredMeetup.visibilityKey),
        when: miscT(featuredMeetup.whenKey),
        pace: miscT(featuredMeetup.paceKey),
        attendees: featuredMeetup.attendees,
        note: t(`meetups.${featuredMeetup.noteKey}`),
        safetyNote: t("meetupSafetyNote"),
        joinLabel: t("join"),
        maybeLabel: t("maybe"),
        shareLabel: t("share"),
        coordinates: featuredMeetup.coordinates
      }}
      transit={{
        title: t("transit.title"),
        badge: t("transit.badge"),
        intro: t("transit.intro"),
        metroTitle: t("transit.metroTitle"),
        metroRule: t("transit.metroRule"),
        surfaceTitle: t("transit.surfaceTitle"),
        surfaceRule: t("transit.surfaceRule"),
        etiquetteTitle: t("transit.etiquetteTitle"),
        etiquetteItems: [
          t("transit.etiquetteItems.0"),
          t("transit.etiquetteItems.1"),
          t("transit.etiquetteItems.2")
        ]
      }}
      themesLabel={t("themeRailTitle")}
      themeCards={routeThemes.map((theme) => ({
        id: theme.id,
        title: themeT(theme.labelKey),
        vibe: miscT(theme.vibeKey),
        safety: miscT(theme.safetyKey),
        distanceKm: theme.distanceKm,
        elevationM: theme.elevationM,
        accent: theme.accent,
        previewPath: theme.previewPath
      }))}
      reports={communityReports.map((report) => ({
        ...report,
        title: reportT(report.titleKey),
        category: miscT(report.categoryKey)
      }))}
    />
  );
}
