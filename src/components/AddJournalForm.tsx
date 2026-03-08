"use client";

import React, { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
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
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          required
          rows={4}
          placeholder="Neler yaşadın?"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50">
          {imageUrl ? (
            <div className="flex flex-col items-center">
              <img
                src={imageUrl}
                alt="Önizleme"
                className="h-40 w-full object-cover rounded-lg mb-2"
              />
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="text-red-500 text-sm font-medium"
              >
                Fotoğrafı Değiştir
              </button>
            </div>
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  setImageUrl(res[0].url); // İşte "Bitti" sinyalini burada yakalayacağız
                  console.log("Yükleme Başarılı:", res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`HATA: ${error.message}`);
              }}
              appearance={{
                container: "min-h-[120px] cursor-pointer",
                label: "text-blue-600 font-bold",
                button: "bg-blue-600 px-4 py-2 rounded-lg text-sm",
              }}
            />
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
