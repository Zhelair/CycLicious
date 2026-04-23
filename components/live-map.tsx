"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {useTranslations} from "next-intl";

import maplibregl, {type StyleSpecification} from "maplibre-gl";

import {appDb} from "../lib/db/app-db";
import {MapFallback} from "./map-fallback";

type LiveMapProps = {
  isOfficialLayerVisible: boolean;
  locateRequestCount: number;
  mode: "ride" | "explore";
  meetup: {
    coordinates: [number, number];
  };
  onGpsStateChange?: (
    value: "idle" | "locating" | "active" | "blocked" | "unsupported"
  ) => void;
  theme: {
    accent: string;
    previewPath: [number, number][];
  };
  reports: {
    id: string;
    title: string;
    severity: string;
    coordinates: [number, number];
  }[];
};

const prototypeRasterStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors"
    }
  },
  layers: [
    {
      id: "osm-raster",
      type: "raster",
      source: "osm"
    }
  ]
};

function toRouteFeature(path: [number, number][]) {
  return {
    type: "Feature" as const,
    properties: {},
    geometry: {
      type: "LineString" as const,
      coordinates: path
    }
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function LiveMap({
  isOfficialLayerVisible,
  locateRequestCount,
  mode,
  meetup,
  onGpsStateChange,
  theme,
  reports
}: LiveMapProps) {
  const mapStatusT = useTranslations("mapStatus");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker[]>([]);
  const riderMarkerRef = useRef<maplibregl.Marker | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading"
  );
  const [isOnline, setIsOnline] = useState(true);
  const [officialLayerState, setOfficialLayerState] = useState<
    "loading" | "live" | "cached" | "unavailable"
  >("loading");
  const [officialLayerUpdatedAt, setOfficialLayerUpdatedAt] = useState<number | null>(
    null
  );

  const center = useMemo<[number, number]>(() => {
    return theme.previewPath[0] ?? [23.3219, 42.6977];
  }, [theme.previewPath]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncNetworkState = () => {
      setIsOnline(window.navigator.onLine);
    };

    syncNetworkState();
    window.addEventListener("online", syncNetworkState);
    window.addEventListener("offline", syncNetworkState);

    return () => {
      window.removeEventListener("online", syncNetworkState);
      window.removeEventListener("offline", syncNetworkState);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: prototypeRasterStyle,
      center,
      zoom: 13.8,
      pitch: 0,
      bearing: 0,
      attributionControl: false
    });

    map.addControl(
      new maplibregl.NavigationControl({showCompass: false}),
      "bottom-right"
    );
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        showAccuracyCircle: true,
        trackUserLocation: true
      }),
      "bottom-right"
    );

    map.on("load", () => {
      setStatus("ready");
      window.setTimeout(() => map.resize(), 80);
      window.setTimeout(() => map.resize(), 320);
    });

    mapRef.current = map;

    return () => {
      markerRef.current.forEach((marker) => marker.remove());
      markerRef.current = [];
      riderMarkerRef.current?.remove();
      riderMarkerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, [center]);

  useEffect(() => {
    const map = mapRef.current;
    const container = containerRef.current;

    if (!map || !container || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      map.resize();
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStatus((current) => (current === "ready" ? current : "fallback"));
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [reports, theme.previewPath]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const syncMap = () => {
      const routeData = {
        type: "FeatureCollection" as const,
        features: [toRouteFeature(theme.previewPath)]
      };

      if (!map.getSource("route")) {
        map.addSource("route", {
          type: "geojson",
          data: routeData
        });

        map.addLayer({
          id: "route-base",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#ffffff",
            "line-width": 8,
            "line-opacity": 0.9
          },
          layout: {
            "line-cap": "round",
            "line-join": "round"
          }
        });

        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          paint: {
            "line-color": mode === "ride" ? "#1274ff" : "#d4931f",
            "line-width": 4.6,
            "line-opacity": 0.96
          },
          layout: {
            "line-cap": "round",
            "line-join": "round"
          }
        });
      } else {
        const source = map.getSource("route") as maplibregl.GeoJSONSource;
        source.setData(routeData);
        map.setPaintProperty("route-line", "line-color", mode === "ride" ? "#1274ff" : "#d4931f");
      }

      if (!map.getSource("meetup")) {
        map.addSource("meetup", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: meetup.coordinates
                }
              }
            ]
          }
        });

        map.addLayer({
          id: "meetup-area",
          type: "circle",
          source: "meetup",
          paint: {
            "circle-color": mode === "ride" ? "#1274ff" : "#e3a43a",
            "circle-opacity": 0.13,
            "circle-radius": 22,
            "circle-stroke-color": mode === "ride" ? "#1274ff" : "#e3a43a",
            "circle-stroke-opacity": 0.34,
            "circle-stroke-width": 2
          }
        });
      } else {
        const source = map.getSource("meetup") as maplibregl.GeoJSONSource;
        source.setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: meetup.coordinates
              }
            }
          ]
        });
      }

      markerRef.current.forEach((marker) => marker.remove());
      markerRef.current = reports.map((report) => {
        const element = document.createElement("button");
        element.className = `live-pin live-pin-${report.severity.toLowerCase()}`;
        element.type = "button";
        element.setAttribute("aria-label", report.title);
        element.innerHTML = `<span>${report.severity}</span>`;

        return new maplibregl.Marker({element})
          .setLngLat(report.coordinates)
          .addTo(map);
      });

      const bounds = theme.previewPath.reduce(
        (accumulator, coordinate) => accumulator.extend(coordinate),
        new maplibregl.LngLatBounds(theme.previewPath[0], theme.previewPath[0])
      );

      bounds.extend(meetup.coordinates);
      reports.forEach((report) => bounds.extend(report.coordinates));

      const compactViewport = window.innerWidth <= 720;

      map.fitBounds(bounds, {
        padding: compactViewport
          ? {
              top: 88,
              right: 18,
              bottom: 116,
              left: 18
            }
          : {
              top: 88,
              right: 42,
              bottom: 118,
              left: 42
            },
        duration: 700,
        maxZoom: 15.6
      });
    };

    if (map.isStyleLoaded()) {
      syncMap();
      return;
    }

    map.once("load", syncMap);
  }, [meetup.coordinates, mode, reports, theme.previewPath]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const visibility = isOfficialLayerVisible ? "visible" : "none";

    if (map.getLayer("sofiaplan-bike-network-glow")) {
      map.setLayoutProperty("sofiaplan-bike-network-glow", "visibility", visibility);
    }

    if (map.getLayer("sofiaplan-bike-network")) {
      map.setLayoutProperty("sofiaplan-bike-network", "visibility", visibility);
    }
  }, [isOfficialLayerVisible]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const syncOfficialLayer = async () => {
      try {
        const response = await fetch("/api/layers/sofiaplan?layer=bike-network");

        if (response.ok) {
          const payload = (await response.json()) as {data?: unknown};

          if (isObject(payload) && isObject(payload.data)) {
            if (!map.getSource("sofiaplan-bike-network")) {
              map.addSource("sofiaplan-bike-network", {
                type: "geojson",
                data: payload.data as never
              });

              map.addLayer({
                id: "sofiaplan-bike-network-glow",
                type: "line",
                source: "sofiaplan-bike-network",
                layout: {
                  "line-cap": "round",
                  "line-join": "round",
                  visibility: isOfficialLayerVisible ? "visible" : "none"
                },
                paint: {
                  "line-color": mode === "ride" ? "#6eaef9" : "#f3d391",
                  "line-width": 4.2,
                  "line-opacity": 0.2
                }
              });

              map.addLayer({
                id: "sofiaplan-bike-network",
                type: "line",
                source: "sofiaplan-bike-network",
                layout: {
                  "line-cap": "round",
                  "line-join": "round",
                  visibility: isOfficialLayerVisible ? "visible" : "none"
                },
                paint: {
                  "line-color": mode === "ride" ? "#1b79ff" : "#c8891c",
                  "line-width": 1.8,
                  "line-opacity": 0.62
                }
              });
            } else {
              const source = map.getSource(
                "sofiaplan-bike-network"
              ) as maplibregl.GeoJSONSource;
              source.setData(payload.data as never);
            }

            const updatedAt = Date.now();
            await appDb.cachedLayers.put({
              key: "sofiaplan-bike-network",
              data: payload.data,
              updatedAt
            });
            setOfficialLayerState("live");
            setOfficialLayerUpdatedAt(updatedAt);
            return;
          }
        }
      } catch {
        // Prototype should gracefully fall back to a cached layer.
      }

      const cachedLayer = await appDb.cachedLayers.get("sofiaplan-bike-network");

      if (cachedLayer && isObject(cachedLayer.data)) {
        if (!map.getSource("sofiaplan-bike-network")) {
          map.addSource("sofiaplan-bike-network", {
            type: "geojson",
            data: cachedLayer.data as never
          });

          map.addLayer({
            id: "sofiaplan-bike-network-glow",
            type: "line",
            source: "sofiaplan-bike-network",
            layout: {
              "line-cap": "round",
              "line-join": "round",
              visibility: isOfficialLayerVisible ? "visible" : "none"
            },
            paint: {
              "line-color": mode === "ride" ? "#6eaef9" : "#f3d391",
              "line-width": 4.2,
              "line-opacity": 0.2
            }
          });

          map.addLayer({
            id: "sofiaplan-bike-network",
            type: "line",
            source: "sofiaplan-bike-network",
            layout: {
              "line-cap": "round",
              "line-join": "round",
              visibility: isOfficialLayerVisible ? "visible" : "none"
            },
            paint: {
              "line-color": mode === "ride" ? "#1b79ff" : "#c8891c",
              "line-width": 1.8,
              "line-opacity": 0.62
            }
          });
        } else {
          const source = map.getSource(
            "sofiaplan-bike-network"
          ) as maplibregl.GeoJSONSource;
          source.setData(cachedLayer.data as never);
        }

        setOfficialLayerState("cached");
        setOfficialLayerUpdatedAt(cachedLayer.updatedAt);
        return;
      }

      setOfficialLayerState("unavailable");
      setOfficialLayerUpdatedAt(null);
    };

    if (map.isStyleLoaded()) {
      void syncOfficialLayer();
      return;
    }

    map.once("load", () => {
      void syncOfficialLayer();
    });
  }, [isOfficialLayerVisible, mode]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    if (map.getLayer("route-line")) {
      map.setPaintProperty(
        "route-line",
        "line-color",
        mode === "ride" ? "#1274ff" : "#d4931f"
      );
    }

    if (map.getLayer("sofiaplan-bike-network-glow")) {
      map.setPaintProperty(
        "sofiaplan-bike-network-glow",
        "line-color",
        mode === "ride" ? "#6eaef9" : "#f3d391"
      );
    }

    if (map.getLayer("sofiaplan-bike-network")) {
      map.setPaintProperty(
        "sofiaplan-bike-network",
        "line-color",
        mode === "ride" ? "#1b79ff" : "#c8891c"
      );
    }
  }, [mode]);

  useEffect(() => {
    if (locateRequestCount === 0) {
      return;
    }

    const map = mapRef.current;

    if (!map || typeof navigator === "undefined" || !navigator.geolocation) {
      onGpsStateChange?.("unsupported");
      return;
    }

    onGpsStateChange?.("locating");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates: [number, number] = [
          position.coords.longitude,
          position.coords.latitude
        ];
        const markerElement = document.createElement("div");

        markerElement.className = "rider-pin";
        riderMarkerRef.current?.remove();
        riderMarkerRef.current = new maplibregl.Marker({element: markerElement})
          .setLngLat(coordinates)
          .addTo(map);

        map.flyTo({
          center: coordinates,
          zoom: Math.max(map.getZoom(), 14.8),
          essential: true
        });
        onGpsStateChange?.("active");
      },
      (error) => {
        onGpsStateChange?.(error.code === 1 ? "blocked" : "idle");
      },
      {
        enableHighAccuracy: true,
        timeout: 8_000,
        maximumAge: 60_000
      }
    );
  }, [locateRequestCount, onGpsStateChange]);

  const minutesSinceLayerUpdate = officialLayerUpdatedAt
    ? Math.max(1, Math.round((Date.now() - officialLayerUpdatedAt) / 60_000))
    : null;

  const statusLabel =
    officialLayerState === "cached"
      ? mapStatusT("cached")
      : officialLayerState === "unavailable"
        ? mapStatusT("unavailable")
        : officialLayerState === "live"
          ? mapStatusT("live")
          : mapStatusT("loading");

  const statusDetail = !isOnline
    ? mapStatusT("offline")
    : officialLayerState === "live"
      ? mapStatusT("online")
      : minutesSinceLayerUpdate
        ? mapStatusT("updatedMinutes", {minutes: minutesSinceLayerUpdate})
        : mapStatusT("waiting");

  return (
    <>
      {status !== "ready" ? (
        <MapFallback mode={mode} status={status} />
      ) : null}
      <div className={`live-map-status status-${officialLayerState}`}>
        <strong>{statusLabel}</strong>
        <span>{statusDetail}</span>
      </div>
      <div
        className={`live-map ${status === "ready" ? "is-ready" : ""}`}
        ref={containerRef}
      />
    </>
  );
}
