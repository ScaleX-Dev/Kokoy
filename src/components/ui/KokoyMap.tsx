"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { Map as MapLibre, Marker, NavigationControl, AttributionControl, setWorkerUrl, type StyleSpecification, type LayerSpecification, type ExpressionSpecification } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

// Free OpenStreetMap vector tiles, no key or account needed. Recoloured below to the brand.
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

// The worker is served from /public: its URL is computed at runtime, so the bundler can't
// emit it. Copy node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs there when upgrading.
const WORKER_URL = "/vendor/maplibre-gl-worker-6.16.0.mjs";

const C = {
  sea: "#25232B", // brand charcoal
  land: "#34313B",
  green: "#3A3842",
  built: "#3D3A45",
  building: "#46424E",
  cream: "#FFF1D9",
  orange: "#FF9D38",
  coral: "#FF654F",
};

// Road shields, borders and airport detail add noise at beach-club zoom levels.
const HIDDEN = /shield|boundary|aeroway|airport|railway.*dash|landcover_(ice|glacier)|highway_.*_subtle/;

type Paint = Record<string, unknown>;

function themed(style: StyleSpecification, lang: Locale): StyleSpecification {
  const name: ExpressionSpecification = ["coalesce", ["get", `name:${lang}`], ["get", "name:latin"], ["get", "name"]];

  const layers = style.layers
    .filter((l) => !HIDDEN.test(l.id))
    .map((layer): LayerSpecification => {
      const l = { ...layer, paint: { ...(layer as { paint?: Paint }).paint } } as LayerSpecification & { paint: Paint; layout?: Paint };
      const id = l.id;

      if (l.type === "background") l.paint["background-color"] = C.land;
      else if (id === "water") l.paint["fill-color"] = C.sea;
      else if (id === "waterway") l.paint["line-color"] = C.sea;
      else if (id === "park" || id.startsWith("landcover")) {
        l.paint["fill-color"] = C.green;
        l.paint["fill-opacity"] = 1;
      } else if (id === "landuse_residential") {
        l.paint["fill-color"] = C.built;
        l.paint["fill-opacity"] = 1;
      } else if (id === "building") {
        l.paint["fill-color"] = C.building;
        l.paint["fill-outline-color"] = C.building;
      } else if (l.type === "line" && id.includes("casing")) {
        l.paint["line-color"] = C.land;
      } else if (l.type === "line" && /motorway|major/.test(id)) {
        l.paint["line-color"] = C.orange;
        l.paint["line-opacity"] = 0.75;
      } else if (l.type === "line") {
        l.paint["line-color"] = C.cream;
        l.paint["line-opacity"] = 0.16;
      } else if (l.type === "symbol") {
        const water = id.startsWith("water");
        l.layout = { ...l.layout, "text-field": name };
        l.paint["text-color"] = water ? C.coral : C.cream;
        l.paint["text-opacity"] = water ? 0.9 : 0.75;
        l.paint["text-halo-color"] = water ? C.sea : C.land;
        l.paint["text-halo-width"] = 1.4;
      }
      return l;
    });

  return { ...style, layers };
}

// TODO(confirm): KOKOY's exact location. This is the middle of Unawatuna beach.
const KOKOY_LNG_LAT: [number, number] = [80.2497, 6.0099];

/** A real, interactive map of Unawatuna drawn in KOKOY colours, with the sun as the pin. */
export default function KokoyMap({ lang, gestureHelp }: { lang: Locale; gestureHelp: { desktop: string; mobile: string } }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = el.current;
    if (!container) return;
    let map: MapLibre | null = null;
    let cancelled = false;

    setWorkerUrl(WORKER_URL);

    fetch(STYLE_URL)
      .then((r) => r.json() as Promise<StyleSpecification>)
      .then((style) => {
        if (cancelled) return;
        map = new MapLibre({
          container,
          style: themed(style, lang),
          center: KOKOY_LNG_LAT,
          zoom: 13.6,
          minZoom: 9,
          maxZoom: 18,
          attributionControl: false,
          // The page owns the scroll: a plain wheel or one-finger swipe keeps scrolling
          // the page, and the map only moves with Ctrl/⌘ + scroll or two fingers.
          cooperativeGestures: true,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
          locale: {
            "CooperativeGesturesHandler.WindowsHelpText": gestureHelp.desktop.replace("{key}", "Ctrl"),
            "CooperativeGesturesHandler.MacHelpText": gestureHelp.desktop.replace("{key}", "⌘"),
            "CooperativeGesturesHandler.MobileHelpText": gestureHelp.mobile,
          },
        });
        map.touchZoomRotate.disableRotation();
        map.addControl(new NavigationControl({ showCompass: false }), "top-right");
        map.addControl(new AttributionControl({ compact: true }), "bottom-right");
        // The compact credit opens itself on load and covers the map on phones; start it closed (ⓘ).
        map.once("load", () => container.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show"));

        // The pin: the brand sun, pulsing, with the name beside it.
        const pin = document.createElement("a");
        pin.href = SITE.maps[lang === "ru" ? "yandex" : "google"];
        pin.target = "_blank";
        pin.rel = "noopener noreferrer";
        pin.setAttribute("aria-label", "KOKOY");
        pin.className = "kk-pin";
        pin.innerHTML =
          '<span class="kk-pin-ping"></span><span class="kk-pin-sun"></span><span class="kk-pin-label">KOKOY</span>';
        new Marker({ element: pin, anchor: "center" }).setLngLat(KOKOY_LNG_LAT).addTo(map);
      })
      .catch(() => {
        // Offline or blocked tiles: the placeholder underneath stays visible.
      });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [lang, gestureHelp]);

  // MapLibre's stylesheet makes the map element position: relative, so the absolute
  // fill lives on a wrapper and the map itself just takes the wrapper's full size.
  return (
    <div className="absolute inset-0">
      <div ref={el} className="kk-map size-full" />
    </div>
  );
}
