"use client";

import React, { useState } from "react"; // useEffect'i sildik

interface CityModalProps {
  isOpen: boolean;
  cityName: string;
  initialData?: VisitData; // <--- YENİ: Opsiyonel başlangıç verisi
  onClose: () => void;
  onSave: (data: VisitData) => void;
}

export interface VisitData {
  isVisited: boolean;
  visitDate: string;
  notes: string;
}

export default function CityModal({
  isOpen,
  cityName,
  initialData,
  onClose,
  onSave,
}: CityModalProps) {
  // useEffect SİLİNDİ. Artık state'ler otomatik sıfır başlayacak.
  const [isVisited, setIsVisited] = useState(initialData?.isVisited || false);
  const [visitDate, setVisitDate] = useState(initialData?.visitDate || "");
  const [notes, setNote] = useState(initialData?.notes || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Başlık */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white tracking-wide">
            {cityName}
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Form İçeriği */}
        <div className="p-6 space-y-6">
          <div
            className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100 cursor-pointer"
            onClick={() => setIsVisited(!isVisited)}
          >
            <input
              type="checkbox"
              checked={isVisited}
              onChange={(e) => setIsVisited(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label className="text-gray-700 font-medium cursor-pointer select-none">
              Ben burayı gezdim! 🚩
            </label>
          </div>

          {isVisited && (
            <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ne zaman oradaydın?
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seyahat Notların
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Yediğim yemekler, gördüğüm yerler..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            İptal
          </button>
          <button
            onClick={() => {
              onSave({ isVisited, visitDate, notes });
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
