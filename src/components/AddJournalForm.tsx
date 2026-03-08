"use client";

import React, { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing"; // Dropzone daha stabil çalışır
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
      }
    } catch (error) {
      console.error(error);
      alert("Hata oluştu.");
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
            placeholder="Nereyi gezdin?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
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
            placeholder="Neler yaşadın?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fotoğraf
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
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs"
              >
                Sil ve Yenisini Yükle
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50">
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setImageUrl(res[0].url);
                    console.log("Yükleme bitti:", res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`Hata: ${error.message}`);
                }}
                content={{
                  // Devasa ikonu burada manuel küçültüyoruz
                  uploadIcon: (
                    <svg
                      className="w-8 h-8 text-blue-500 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  label: "Fotoğraf Seç veya Sürükle",
                  allowedContent: "Maksimum 4MB",
                }}
                appearance={{
                  container:
                    "flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer min-h-[140px]",
                  label: "text-blue-600 font-semibold text-sm",
                  allowedContent: "text-gray-400 text-[10px] mt-1",
                  // Butonu küçük ve şık yapıyoruz ki "Loading" aşamasını görebilelim
                  button:
                    "bg-blue-600 text-white text-xs px-4 py-2 rounded-lg mt-3 ut-ready:bg-blue-600 ut-uploading:cursor-not-allowed",
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !imageUrl}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition shadow-lg"
        >
          {isSubmitting ? "Kaydediliyor..." : "Günlüğümü Paylaş 🚀"}
        </button>
      </form>
    </div>
  );
}
