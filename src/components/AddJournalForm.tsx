"use client";

import React, { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { useRouter } from "next/navigation"; // YENİ: Sayfayı yenilemek için

export default function AddJournalForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter(); // YENİ

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Lütfen bir fotoğraf yükleyin!");
      return;
    }

    setIsSubmitting(true);

    try {
      // YENİ: Hazırladığımız API'ye verileri gönderiyoruz
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Bir hata oluştu");
      }

      alert("Harika! Günlüğünüz başarıyla eklendi. 🌍");

      // Formu temizle
      setTitle("");
      setContent("");
      setImageUrl(null);

      // Sayfayı yenile (yeni yazıyı görmek için)
      router.refresh();
    } catch (error) {
      alert("Günlük kaydedilemedi. Lütfen tekrar deneyin.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Yeni Seyahat Günlüğü Ekle ✍️
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Başlık
          </label>
          <input
            type="text"
            required
            placeholder="Örn: Hafta Sonu Kapadokya Maceram"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Anıların
          </label>
          <textarea
            required
            rows={4}
            placeholder="Neler yaşadın, nereleri gezdin? Detayları paylaş..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            En Güzel Fotoğraf (1 Adet)
          </label>

          {imageUrl ? (
            <div className="relative rounded-xl overflow-hidden border border-gray-200 h-48 w-full md:w-1/2">
              <img
                src={imageUrl}
                alt="Yüklenen"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg text-sm hover:bg-red-600 shadow-md"
              >
                Sil
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setImageUrl(res[0].url);
                    // alert yerine daha şık bir log veya küçük bir bildirim de olabilir
                    console.log("Yükleme başarılı:", res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`Hata: ${error.message}`);
                }}
                // Görsel çakışmaları engellemek için buton metinlerini sabitleyelim
                content={{
                  button({ ready, isUploading }) {
                    if (isUploading) return "Yükleniyor...";
                    if (ready) return "Fotoğraf Seç";
                    return "Hazırlanıyor...";
                  },
                  allowedContent: "Resim (Maks 4MB)",
                }}
                appearance={{
                  button:
                    "bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition w-auto",
                  allowedContent: "text-gray-500 text-xs mt-2",
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !imageUrl}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
        >
          {isSubmitting ? "Paylaşılıyor..." : "Günlüğümü Paylaş 🚀"}
        </button>
      </form>
    </div>
  );
}
