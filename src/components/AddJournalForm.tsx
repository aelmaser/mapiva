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
                    console.log("Dosya başarıyla yüklendi:", res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Yükleme Hatası:", error);
                  alert(`Hata: ${error.message}`);
                }}
                content={{
                  label: "Fotoğraf Sürükle veya Tıkla",
                  allowedContent: "Resim (Maks 4MB)",
                }}
                appearance={{
                  container:
                    "border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 cursor-pointer hover:border-blue-400 transition min-h-[150px]",
                  label: "text-blue-600 font-semibold",
                  allowedContent: "text-gray-400 text-xs",
                  // Butonu tamamen gizlemek yerine, sadece dosya seçildikten sonra
                  // "Upload" demek için küçük ve şık bir hale getirelim
                  button:
                    "bg-blue-600 text-white text-sm px-4 py-2 rounded-lg mt-2 ut-ready:bg-blue-600 ut-uploading:bg-blue-400",
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
