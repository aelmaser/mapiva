"use client";

import React from "react";

// Veri tipi (Diğer dosyalarla uyumlu)
interface VisitRecord {
  id: string;
  cityName: string;
  notes: string | null;
  isVisited: boolean;
  userId: string;
  visitDate: Date | null;
  rating: number | null;
}

export default function StatsSection({ visits }: { visits: VisitRecord[] }) {
  // --- HESAPLAMALAR ---
  const totalProvinces = 81;
  const visitedCount = visits.length;
  const progressPercentage = ((visitedCount / totalProvinces) * 100).toFixed(1);

  // Ortalama Puan Hesabı
  const ratedVisits = visits.filter((v) => v.rating && v.rating > 0);
  const averageRating =
    ratedVisits.length > 0
      ? (
          ratedVisits.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
          ratedVisits.length
        ).toFixed(1)
      : "0.0";

  // Listeyi Tarihe Göre Sırala (En yeniden en eskiye)
  // Tarihi olmayanları en sona atar
  const sortedVisits = [...visits].sort((a, b) => {
    const dateA = a.visitDate ? new Date(a.visitDate).getTime() : 0;
    const dateB = b.visitDate ? new Date(b.visitDate).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 space-y-8 pb-12">
      {/* 1. ÜST KARTLAR (İSTATİSTİKLER) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kart 1: Toplam İl */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-blue-600 mb-1">
            {visitedCount}
          </span>
          <span className="text-gray-500 text-sm font-medium">Gezilen İl</span>
        </div>

        {/* Kart 2: İlerleme Durumu */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center w-full">
          <div className="flex items-end gap-1 mb-2">
            <span className="text-4xl font-bold text-green-600">
              %{progressPercentage}
            </span>
            <span className="text-gray-400 text-sm mb-1.5">Tamamlandı</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Kart 3: Ortalama Puan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-4xl font-bold text-yellow-500">
              {averageRating}
            </span>
            <svg
              className="w-8 h-8 text-yellow-400 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
          <span className="text-gray-500 text-sm font-medium">
            Ortalama Puan
          </span>
        </div>
      </div>

      {/* 2. DETAYLI LİSTE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Seyahat Günlüğüm</h3>
        </div>

        <div className="divide-y divide-gray-50">
          {sortedVisits.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              Henüz hiç seyahat kaydı yok. Haritadan bir il seçip başla! 🚀
            </div>
          ) : (
            sortedVisits.map((visit) => (
              <div
                key={visit.id}
                className="p-4 hover:bg-gray-50 transition flex items-center justify-between group"
              >
                {/* Sol Taraf: Şehir ve Tarih */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                    {visit.cityName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {visit.cityName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {visit.visitDate
                        ? new Date(visit.visitDate).toLocaleDateString(
                            "tr-TR",
                            { day: "numeric", month: "long", year: "numeric" },
                          )
                        : "Tarih belirtilmemiş"}
                    </p>
                  </div>
                </div>

                {/* Orta: Not (Varsa) */}
                {visit.notes && (
                  <div className="hidden md:block text-sm text-gray-600 italic max-w-xs truncate">
                    &quot;{visit.notes}&quot;
                  </div>
                )}

                {/* Sağ: Puan */}
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                  <span className="font-bold text-yellow-700 text-sm">
                    {visit.rating || "-"}
                  </span>
                  <svg
                    className="w-4 h-4 text-yellow-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
