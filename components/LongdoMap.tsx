"use client";
import { useEffect, useRef } from "react";

export default function LongdoMap({ locations = [] }: any) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadScript = () => {
      const existing = document.getElementById("longdo-map-sdk");
      if (!existing) {
        const script = document.createElement("script");
        script.id = "longdo-map-sdk";
        script.src = `https://api.longdo.com/map/?key=${process.env.NEXT_PUBLIC_LONGDO_API_KEY}`;
        script.async = true;
        script.onload = initMap;
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      // @ts-ignore
      const longdo = window.longdo;
      if (!longdo || !mapRef.current) return;

      const map = new longdo.Map({
        placeholder: mapRef.current,
        zoom: 12,
        lastView: false,
      });

      // สร้าง markers และเก็บ ref ถึง marker object
      const markerObjs: any[] = [];

      locations.forEach((loc: any) => {
        const marker = new longdo.Marker(
          { lon: loc.lon, lat: loc.lat },
          {
            title: loc.name,
            clickable: true,
            icon: {
              url: "charging-station.png",
              offset: { x: 3, y: -30 },

              size: { width: 36, height: 36 },
            },
            popup: {
              html: `
                <div style="
                  padding: 10px;
                  background: white;
                  border-radius: 10px;
                  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                  width: 180px;
                  font-family: sans-serif;
                ">
                  <div style="font-weight: bold; margin-bottom: 6px;">${
                    loc.name
                  }</div>
                  <div style="color: #555;">${loc.detail ?? ""}</div>
                </div>
              `,
              anchor: "bottom",
            },
          }
        );

        map.Overlays.add(marker);
        markerObjs.push({ marker, loc });
      });

      map.Event.bind("overlayClick", (overlay: any) => {
        const found = markerObjs.find((m) => m.marker === overlay);
        if (!found) return;

        if (found) {
          const { loc, marker } = found;

          map.zoom(16, true);
          map.location({ lon: loc.lon, lat: loc.lat }, true);
        }
      });
    };

    loadScript();
  }, [locations]);

  return <div ref={mapRef} className="w-full h-full max-h-[500px] rounded-lg overflow-hidden" />;
}
