"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { saveVisit } from "@/app/actions"; // Server Action'ı çağırıyoruz

// Türkiye Haritası TopoJSON verisi
/*const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/turkey/turkey-provinces.json";*/

const geoUrl = "/turkey-map.json";

// 1. Veri Tipi Tanımı (Veritabanı ile uyumlu)
interface VisitRecord {
  id: string;
  cityName: string;
  notes: string | null;
  isVisited: boolean;
  userId: string;
  // Yeni alanları tipe ekle
  visitDate: Date | null;
  rating: number | null;
}

// 2. Props Tanımı
interface TurkeyMapProps {
  visitedCities: VisitRecord[]; // page.tsx'ten gelen veri
}

export default function TurkeyMap({ visitedCities }: TurkeyMapProps) {
  // Seçilen şehir (Modal açmak için)
  const [activeCity, setActiveCity] = useState<{ name: string } | null>(null);

  // Form verileri
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [tooltip, setTooltip] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);
  const [visitDate, setVisitDate] = useState("");
  const [rating, setRating] = useState(0); // 0 ile 5 arası

  // Modal açılınca o şehrin eski notunu bulup kutuya yazalım
  useEffect(() => {
    if (activeCity) {
      const existing = visitedCities.find(
        (v) => v.cityName === activeCity.name,
      );

      setNote(existing?.notes || "");

      // Tarih formatı HTML input için YYYY-MM-DD olmalı
      if (existing?.visitDate) {
        const d = new Date(existing.visitDate);
        setVisitDate(d.toISOString().split("T")[0]);
      } else {
        setVisitDate("");
      }

      setRating(existing?.rating || 0);
    }
  }, [activeCity, visitedCities]);

  // Kaydetme Fonksiyonu
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCity) return;

    setIsSaving(true);

    // FormData oluşturup sunucuya gönderiyoruz
    const formData = new FormData();
    formData.append("cityName", activeCity.name);
    formData.append("notes", note);
    formData.append("isVisited", "on"); // Checkbox mantığı
    formData.append("visitDate", visitDate);
    formData.append("rating", rating.toString());

    try {
      // Server Action'ı çağır (Tek parametre: formData)
      await saveVisit(formData);

      // İşlem bitince modalı kapat
      setActiveCity(null);
    } catch (error) {
      console.error("Kayıt hatası:", error);
      alert("Bir hata oluştu!");
    } finally {
      setIsSaving(false);
    }
  };

  // Bir ilin boyalı olup olmadığını kontrol eden yardımcı fonksiyon
  const isCityVisited = (geoName: string) => {
    // 'visits' hatası buradaydı, 'visitedCities' olarak düzelttik
    return visitedCities.some((v) => v.cityName === geoName);
  };

  return (
    <div className="w-full h-auto relative bg-blue-50 rounded-xl overflow-hidden shadow-2xl border border-blue-100">
      {/* Harita Başlığı */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm z-10">
        <h2 className="text-gray-700 font-bold text-lg">
          Türkiye Seyahat Haritam
        </h2>
        <p className="text-sm text-gray-500">
          Toplam:{" "}
          <span className="text-green-600 font-bold">
            {visitedCities.length}
          </span>{" "}
          il gezildi
        </p>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 2300,
          center: [35.2, 39],
        }}
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
                  onMouseEnter={(e) => {
                    setTooltip({
                      name: cityName,
                      x: e.clientX,
                      y: e.clientY,
                    });
                  }}
                  onMouseMove={(e) => {
                    // Mouse hareket ettikçe etiketi de hareket ettir
                    setTooltip({
                      name: cityName,
                      x: e.clientX,
                      y: e.clientY,
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltip(null); // Mouse şehirden çıkınca etiketi gizle
                  }}
                  style={{
                    default: {
                      fill: isVisited ? "#22c55e" : "#e5e7eb", // Yeşil veya Gri
                      stroke: "#ffffff",
                      strokeWidth: 0.75,
                      outline: "none",
                      transition: "all 0.3s ease",
                    },
                    hover: {
                      fill: isVisited ? "#16a34a" : "#93c5fd", // Koyu Yeşil veya Mavi
                      stroke: "#ffffff",
                      strokeWidth: 1.5,
                      outline: "none",
                      cursor: "pointer",
                      filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))",
                    },
                    pressed: {
                      fill: "#2563eb",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Şehir Detay Modalı */}
      {activeCity && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            {/* Modal Başlık */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                📍 {activeCity.name}
              </h3>
              <button
                onClick={() => setActiveCity(null)}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="flex gap-4">
                {/* Tarih Seçici */}
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

                {/* Puanlama (Yıldızlar) */}
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
                          className={`w-8 h-8 ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 fill-gray-100"
                          }`}
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
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 text-gray-800"
                  rows={4}
                  placeholder="Gezdiğim yerler, yediğim yemekler..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveCity(null)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-2.5 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Kaydet & Boya"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {tooltip && (
        <div
          className="fixed pointer-events-none z-[60] bg-gray-900 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-full border border-gray-700 backdrop-blur-sm bg-opacity-90"
          style={{
            left: tooltip.x,
            top: tooltip.y - 15, // Mouse'un biraz üstünde dursun
          }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}
