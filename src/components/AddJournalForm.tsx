"use client";

import React, { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

export default function AddJournalForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      if (response.ok) {
        alert("Günlük başarıyla paylaşıldı! 🌍");
        setTitle("");
        setContent("");
        setImageUrl(null);
        router.refresh();
      } else {
        const errorData = await response.text();
        alert(`Hata: ${errorData}`);
      }
    } catch (error) {
      alert("Kayıt sırasında bir hata oluştu.");
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
        <input
          type="text"
          required
          placeholder="Nereyi gezdin?"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          required
          rows={4}
          placeholder="Neler yaşadın?"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex flex-col items-start gap-4">
          <label className="text-sm font-medium text-gray-700">
            Fotoğraf Yükle
          </label>

          {imageUrl ? (
            <div className="relative rounded-xl overflow-hidden border h-48 w-full md:w-1/2">
              <img
                src={imageUrl}
                alt="Önizleme"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-xs shadow-lg"
              >
                Değiştir
              </button>
            </div>
          ) : (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  setImageUrl(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`Yükleme Hatası: ${error.message}`);
              }}
              appearance={{
                button:
                  "bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition w-auto",
                allowedContent: "hidden", // O alt yazıları gizleyip sade tutuyoruz
              }}
              content={{
                button({ isUploading }) {
                  if (isUploading) return "Yükleniyor...";
                  return "Fotoğraf Seç";
                },
              }}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !imageUrl}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition shadow-xl shadow-blue-600/20"
        >
          {isSubmitting ? "Kaydediliyor..." : "Günlüğümü Paylaş 🚀"}
        </button>
      </form>
    </div>
  );
}
