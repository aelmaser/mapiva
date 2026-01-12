"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import CityModal, { VisitData } from "./CityModal";
import { saveVisit } from "@/app/actions";

const GEO_URL = "/data/turkey-topology.json";

interface MapGeo {
  rsmKey: string;
  properties: {
    name: string;
    [key: string]: unknown;
  };
}

// YENİ TİP TANIMI: Page.tsx'ten gelen veri şekli
interface VisitRecord {
  id: string;
  cityName: string;
  isVisited: boolean;
  visitDate: string; // Artık string olarak geliyor
  note: string | null;
}

interface TurkeyMapProps {
  visits: VisitRecord[]; // İsim değiştirdik: visitedCities -> visits
}

export default function TurkeyMap({ visits }: TurkeyMapProps) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // SEÇİLİ ŞEHRİN VERİSİNİ BULMA
  // Eğer selectedCity varsa, visits içinden o şehre ait kaydı buluyoruz.
  const selectedCityData = visits.find(v => v.cityName === selectedCity);

  const handleSaveVisit = async (data: VisitData) => {
    if (!selectedCity) return;
    const result = await saveVisit(selectedCity, data);
    if (result.success) {
      alert(`${selectedCity} güncellendi! ✅`);
      setSelectedCity(null); // Modalı kapat
    } else {
      alert("Hata oluştu! ❌");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50/50 rounded-xl shadow-lg border border-blue-100 p-2 md:p-4 aspect-video relative">
      
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-12 mb-6">
        Türkiye Seyahat Haritam
      </h2>

      <div className="w-full h-full relative flex items-center justify-center"> 
        <ComposableMap
          projection="geoMercator"
          viewBox="0 0 800 450" 
          projectionConfig={{
            scale: 2300,
            center: [35, 38]
          }}
          className="w-full h-full"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const turkeyGeo = geo as MapGeo;
                const cityName = turkeyGeo.properties.name;
                
                // RENK KONTROLÜ: Bu şehir visits listesinde var mı?
                const isVisited = visits.some(v => v.cityName === cityName);

                return (
                  <Geography
                    key={turkeyGeo.rsmKey}
                    geography={geo}
                    onClick={() => setSelectedCity(cityName)}
                    onMouseEnter={() => setTooltipContent(cityName)}
                    onMouseLeave={() => setTooltipContent("")}
                    style={{
                      default: {
                        fill: isVisited ? "#22c55e" : "#D6D6DA",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.7,
                        outline: "none",
                        transition: "all 0.5s"
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
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs md:text-sm py-1 px-3 rounded shadow-lg pointer-events-none z-10 whitespace-nowrap opacity-90">
            {tooltipContent}
          </div>
        )}
      </div>

      {/* MODAL'A VERİYİ GÖNDERİYORUZ (initialData) */}
      <CityModal 
        key={selectedCity}
        isOpen={!!selectedCity} 
        cityName={selectedCity || ""} 
        // Eğer kayıt varsa verisini gönder, yoksa undefined gider (Modal boş açılır)
        initialData={selectedCityData ? {
            isVisited: selectedCityData.isVisited,
            visitDate: selectedCityData.visitDate || "",
            note: selectedCityData.note || ""
        } : undefined}
        onClose={() => setSelectedCity(null)} 
        onSave={handleSaveVisit}
      />
    </div>
  );
}