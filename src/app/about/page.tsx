import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Alanı */}
      <div className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Haritan, Senin Hikayen.
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            Mapiva, gezginlerin anılarını dijital bir haritada ölümsüzleştirmesi
            için tasarlandı. Hangi şehre gittin, ne yedin, kaç puan verdin?
            Hepsi tek bir yerde.
          </p>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="max-w-4xl mx-auto py-16 px-4 space-y-16">
        {/* Biz Kimiz? */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Neden Mapiva?</h2>
            <p className="text-gray-600 leading-relaxed">
              Gezmeyi seviyoruz ama &quot;Geçen sene gittiğimiz o güzel
              restoranın adı neydi?&quot; sorusunu sormaktan sıkıldık. Mapiva,
              sadece bir işaretleme aracı değil, kişisel bir seyahat
              asistanıdır.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                ✅ <span className="font-medium">81 İl Desteği:</span> Tüm
                Türkiye avucunun içinde.
              </li>
              <li className="flex items-center gap-2">
                ✅ <span className="font-medium">Detaylı Notlar:</span>{" "}
                Anılarını unutma, kaydet.
              </li>
              <li className="flex items-center gap-2">
                ✅ <span className="font-medium">Puanlama Sistemi:</span> En
                iyileri hatırla.
              </li>
            </ul>
          </div>

          {/* YENİ EKLENEN GÖRSEL ALANI */}
          <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
              alt="Seyahat ve Harita"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </section>

        {/* Teknoloji Stack */}
        <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Hangi Teknolojilerle Yapıldı?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Next.js 14",
              "TypeScript",
              "Tailwind CSS",
              "Prisma ORM",
              "Supabase",
              "Clerk Auth",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white shadow-sm rounded-full text-gray-600 font-medium border border-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA (Eylem Çağrısı) */}
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-bold text-gray-900">
            Senin Haritan Ne Kadar Yeşil?
          </h3>
          <p className="text-gray-600">
            Hemen ücretsiz hesabını oluştur ve boyamaya başla.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Haritama Git 🚀
          </Link>
        </div>
      </div>
    </main>
  );
}
