import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Gerçek bir veritabanı olmadığı için veriyi burada simüle ediyoruz
// Normalde burası veritabanından "where slug = X" diye çekilirdi.
const POSTS_DATA: Record<
  string,
  { title: string; content: string; image: string; date: string }
> = {
  "ege-turu-rehberi": {
    title: "Ege'nin Saklı Köyleri: 3 Günlük Rota",
    date: "20 Mayıs 2024",
    image:
      "https://images.unsplash.com/photo-1548625361-98711815197b?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>Ege denilince akla Bodrum veya Çeşme gelir ama asıl hazine kıyıda köşede kalmış köylerdedir. Bu yazıda sizinle kimsenin bilmediği o özel rotayı paylaşıyorum.</p>
      <h3 class="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Gün: Adatepe'de Tarihe Yolculuk</h3>
      <p>Kaz Dağları'nın eteklerinde, oksijeni en bol yerde güne başlıyoruz. Taş evler, zeytin ağaçları ve sessizlik...</p>
      <h3 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Ne Yenir?</h3>
      <p>Köy meydanındaki çınarın altında kabak çiçeği dolması yemeden dönmeyin.</p>
    `,
  },
  "kapadokya-balon-turu": {
    title: "Kapadokya'da Gün Doğumu",
    date: "15 Nisan 2024",
    image:
      "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&q=80&w=1200",
    content:
      "<p>Kapadokya anlatılmaz, yaşanır. Sabah 04:00'te kalkmaya değer mi? Kesinlikle evet.</p>",
  },
  "gaziantep-yemek-turu": {
    title: "Gaziantep Lezzet Durakları",
    date: "10 Mart 2024",
    image:
      "https://images.unsplash.com/photo-1604439167232-a544976451be?auto=format&fit=crop&q=80&w=1200",
    content:
      "<p>Midemize bayram ettirecek o tura hoş geldiniz. İmam Çağdaş'tan Koçak'a uzanan tatlı bir yolculuk.</p>",
  },
};

// Next.js 14 params tipi
type Props = {
  params: { slug: string };
};

export default function BlogPost({ params }: Props) {
  const slug = params.slug;
  const post = POSTS_DATA[slug];

  // Eğer yazı bulunamazsa 404 sayfasına git
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Kapak Resmi */}
      <div className="w-full h-[400px] relative">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Karartma */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 p-4 md:p-8">
          <div className="max-w-3xl mx-auto text-white">
            <Link
              href="/blog"
              className="text-sm hover:underline opacity-80 mb-4 block"
            >
              ← Bloga Dön
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="opacity-90">{post.date} • Mapiva Editör</p>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div
          className="prose prose-lg prose-blue max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Yazar Kutusu */}
        <div className="mt-16 p-6 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-100">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            M
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Mapiva Ekibi</h4>
            <p className="text-sm text-gray-500">
              Türkiye&apos;yi karış karış geziyor ve not alıyoruz.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
