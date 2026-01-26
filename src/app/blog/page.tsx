import React from "react";
import Link from "next/link";
import Image from "next/image";

// Örnek Blog Verileri
const BLOG_POSTS = [
  {
    id: 1,
    slug: "ege-turu-rehberi",
    title: "Ege'nin Saklı Köyleri: 3 Günlük Rota",
    excerpt:
      "Mavinin her tonuna şahit olacağınız, zeytinyağlılara doyacağınız harika bir hafta sonu kaçamağı planı.",
    date: "20 Mayıs 2024",
    readTime: "5 dk",
    image:
      "https://images.unsplash.com/photo-1658052418044-e635b8f54002??auto=format&fit=crop&q=80&w=800",
    category: "Gezi Rehberi",
  },
  {
    id: 2,
    slug: "kapadokya-balon-turu",
    title: "Kapadokya'da Gün Doğumu: Balon Turuna Değer mi?",
    excerpt:
      "Peri bacalarının üzerinden güneşe merhaba demek. Fiyatlar, ipuçları ve en iyi fotoğraf noktaları.",
    date: "15 Nisan 2024",
    readTime: "7 dk",
    image:
      "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&q=80&w=800",
    category: "Deneyim",
  },
  {
    id: 3,
    slug: "gaziantep-yemek-turu",
    title: "Gaziantep'te 24 Saatte Ne Yenir?",
    excerpt:
      "Baklavadan beyran çorbasına, mideniz bayram edecek. İşte nokta atışı lezzet durakları.",
    date: "10 Mart 2024",
    readTime: "4 dk",
    image:
      "https://images.unsplash.com/photo-1654465442143-cd40c7649b0e?auto=format&fit=crop&q=80&w=800",
    category: "Gastronomi",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 md:px-8">
      {/* Başlık Alanı */}
      <div className="max-w-5xl mx-auto mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Seyahat Günlüğü</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Türkiye&apos;nin dört bir yanından gezi notları, lezzet durakları ve
          ipuçları.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group">
            <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 h-full flex flex-col">
              {/* Resim Alanı */}
              <div className="relative h-48 w-full overflow-hidden">
                {/* next/image kullanmak istersen domain ayarı gerekir, şimdilik img kullanıyoruz */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                  {post.category}
                </div>
              </div>

              {/* İçerik */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span>📅 {post.date}</span>
                  <span>⏱️ {post.readTime} okuma</span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="text-blue-600 font-medium text-sm flex items-center gap-1">
                  Devamını Oku
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
