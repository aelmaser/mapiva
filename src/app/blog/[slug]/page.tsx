import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blogData";

// Next.js params tipi (Asenkron kullanım için Promise olarak tanımlanmalı)
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  // params'ı await ile çözüyoruz (Next.js son sürüm zorunluluğu)
  const { slug } = await params;

  // URL'deki slug ile bizim verimizdeki slug eşleşiyor mu?
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound(); // Bulamazsa 404'e at
  }

  return (
    <article className="min-h-screen bg-white pb-20">
      <div className="w-full h-[400px] relative">
        <div className="absolute inset-0 bg-black/40 z-10" />
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

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div
          className="prose prose-lg prose-blue max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 p-6 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-100">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            M
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Mapiva Ekibi</h4>
            <p className="text-sm text-gray-500">
              Türkiye'yi karış karış geziyor ve not alıyoruz.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
