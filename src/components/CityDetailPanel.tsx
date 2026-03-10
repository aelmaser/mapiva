import React from "react";
import { citiesData } from "@/data/cities";

interface CityDetailPanelProps {
  selectedCityId: string | null;
  onClose: () => void;
}

export default function CityDetailPanel({
  selectedCityId,
  onClose,
}: CityDetailPanelProps) {
  if (!selectedCityId) return null;

  // Veri dosyamızdan tıklanan şehri buluyoruz
  // Eğer henüz eklenmemiş bir şehirse varsayılan bir içerik gösteriyoruz
  const cityInfo = citiesData[selectedCityId.toLowerCase()] || {
    name: selectedCityId.toUpperCase(),
    imageUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
    description:
      "Bu şehrin tanıtım yazısı ve görseli yakında Mapiva'ya eklenecektir. Keşfetmeye devam et!",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-300">
        {/* Kapatma Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
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

        {/* Şehir Görseli */}
        <div className="h-64 w-full relative">
          <img
            src={cityInfo.imageUrl}
            alt={cityInfo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-3xl font-extrabold text-white">
              {cityInfo.name}
            </h2>
          </div>
        </div>

        {/* Şehir Açıklaması */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            {cityInfo.description}
          </p>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Haritaya Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
