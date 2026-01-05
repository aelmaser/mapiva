"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "/data/turkey-topology.json";

// 1. TİP TANIMI (INTERFACE)
// Harita verisinin şeklini burada tanımlıyoruz.
// Böylece 'any' kullanmamıza gerek kalmıyor.
interface MapGeo {
  rsmKey: string;
  properties: {
    name: string;
    [key: string]: unknown; // Başka özellikler olabilir ama bizi 'name' ilgilendiriyor
  };
}

export default function TurkeyMap() {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50/50 rounded-xl shadow-lg border border-blue-100 p-4">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Türkiye Seyahat Haritam
      </h2>

      <div className="w-full max-w-4xl relative"> 
        <ComposableMap
          projection="geoMercator"
          viewBox="0 0 800 450" 
          projectionConfig={{
            scale: 2370, 
            center: [35, 38] 
          }}
          className="w-full h-full"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const turkeyGeo = geo as MapGeo;
                
                return (
                  <Geography
                    key={turkeyGeo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { name } = turkeyGeo.properties;
                      setTooltipContent(name);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "#3B82F6",
                        cursor: "pointer",
                        outline: "none",
                        transition: "all 250ms"
                      },
                      pressed: {
                        fill: "#1E40AF",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {tooltipContent && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm py-1 px-3 rounded shadow-lg pointer-events-none z-10 whitespace-nowrap">
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  );
}