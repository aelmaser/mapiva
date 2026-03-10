"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { saveVisit, deleteVisit } from "@/app/actions";
import { getCityData } from "@/data/cities"; // YENİ: Veri çekme fonksiyonumuz

const geoUrl = "/turkey-map.json";

interface VisitRecord {
  id: string;
  cityName: string;
  notes: string | null;
  isVisited: boolean;
  userId: string;
  visitDate: Date | null;
  rating: number | null;
}

interface TurkeyMapProps {
  visitedCities: VisitRecord[];
}

export default function TurkeyMap({ visitedCities }: TurkeyMapProps) {
  const [activeCity, setActiveCity] = useState<{ name: string } | null>(null);
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tooltip, setTooltip] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);
  const [visitDate, setVisitDate] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (activeCity) {
      const existing = visitedCities.find(
        (v) => v.cityName === activeCity.name,
      );
      setNote(existing?.notes || "");

      if (existing?.visitDate) {
        const d = new Date(existing.visitDate);
        setVisitDate(d.toISOString().split("T")[0]);
      } else {
        setVisitDate("");
      }

      setRating(existing?.rating || 0);
    }
  }, [activeCity, visitedCities]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCity) return;
    setIsSaving(true);

    const formData = new FormData();
    formData.append("cityName", activeCity.name);
    formData.append("notes", note);
    formData.append("isVisited", "on");
    formData.append("visitDate", visitDate);
    formData.append("rating", rating.toString());

    try {
      await saveVisit(formData);
      setActiveCity(null);
    } catch (error) {
      alert("Bir hata oluştu!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activeCity) return;
    if (
      !confirm(
        `${activeCity.name} şehrini gezdiğin şehirler listenden silmek istediğine emin misin?`,
      )
    )
      return;

    setIsDeleting(true);
    const formData = new FormData();
    formData.append("cityName", activeCity.name);

    try {
      await deleteVisit(formData);
      setActiveCity(null);
    } catch (error) {
      alert("Silinirken bir hata oluştu!");
    } finally {
      setIsDeleting(false);
    }
  };

  const isCityVisited = (geoName: string) => {
    return visitedCities.some((v) => v.cityName === geoName);
  };

  // YENİ: Tıklanan şehrin detaylarını çekiyoruz
  const cityInfo = activeCity ? getCityData(activeCity.name) : null;

  return (
    <div className="w-full h-auto relative bg-blue-50 rounded-xl overflow-hidden shadow-2xl border border-blue-100">
      {/* Harita Başlığı */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-sm z-10 pointer-events-none">
        <h2 className="text-gray-800 font-bold text-sm md:text-lg leading-tight">
          Türkiye Seyahat Haritam
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mt-0.5">
          Toplam:{" "}
          <span className="text-green-600 font-bold">
            {visitedCities.length}
          </span>{" "}
          il gezildi
        </p>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 2300, center: [35.2, 39] }}
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const cityName = geo.properties.name;
              const isVisited = isCityVisited(cityName);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => setActiveCity({ name: cityName })}
                  onMouseEnter={(e) =>
                    setTooltip({ name: cityName, x: e.clientX, y: e.clientY })
                  }
                  onMouseMove={(e) =>
                    setTooltip({ name: cityName, x: e.clientX, y: e.clientY })
                  }
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: {
                      fill: isVisited ? "#22c55e" : "#e5e7eb",
                      stroke: "#ffffff",
                      strokeWidth: 0.75,
                      outline: "none",
                      transition: "all 0.3s ease",
                    },
                    hover: {
                      fill: isVisited ? "#16a34a" : "#93c5fd",
                      stroke: "#ffffff",
                      strokeWidth: 1.5,
                      outline: "none",
                      cursor: "pointer",
                      filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))",
                    },
                    pressed: { fill: "#2563eb", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* YENİ ŞEHİR DETAY MODALI */}
      {activeCity && cityInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 relative max-h-[90vh] flex flex-col animate-in zoom-in duration-200">
            {/* Şehir Görseli ve Kapatma Butonu (Header yerine geçti) */}
            <div className="relative h-48 md:h-56 shrink-0 w-full">
              <img
                src={cityInfo.imageUrl}
                alt={cityInfo.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <button
                onClick={() => setActiveCity(null)}
                className="absolute top-4 right-4 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-md transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="absolute bottom-4 left-5 right-5">
                <h3 className="text-3xl font-extrabold text-white drop-shadow-lg flex items-center gap-2">
                  📍 {cityInfo.name}
                </h3>
              </div>
            </div>

            {/* Kaydırılabilir Alan: Açıklama + Mevcut Form */}
            <div className="overflow-y-auto p-6 flex flex-col gap-6">
              {/* Şehir Tanıtım Metni */}
              <div className="text-gray-600 text-sm md:text-base leading-relaxed border-b border-gray-100 pb-5">
                {cityInfo.description}
              </div>

              {/* Senin Orijinal Kayıt Formun */}
              <form onSubmit={handleSave} className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ziyaret Tarihi
                    </label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 bg-gray-50"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Puanın ({rating}/5)
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transform hover:scale-110 transition-transform"
                        >
                          <svg
                            className={`w-7 h-7 md:w-8 md:h-8 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-100"}`}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bu şehre dair notların:
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-gray-50 text-gray-800"
                    rows={3}
                    placeholder="Gezdiğim yerler, yediğim yemekler..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  {isCityVisited(activeCity.name) && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="py-2.5 px-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {isDeleting ? "..." : "🗑️ Sil"}
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-2.5 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSaving ? "Kaydediliyor..." : "Kaydet & Boya"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed pointer-events-none z-[60] bg-gray-900 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-full border border-gray-700 backdrop-blur-sm bg-opacity-90 hidden md:block"
          style={{ left: tooltip.x, top: tooltip.y - 15 }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}
