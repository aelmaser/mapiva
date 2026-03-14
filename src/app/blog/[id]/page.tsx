import React from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

// Next.js 15'te params artık asenkron bir yapıdır
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // URL'deki ID'ye göre veritabanından tek bir postu çekiyoruz
  const post = await db.blogPost.findUnique({
    where: { id },
  });

  // Eğer böyle bir post yoksa Next.js'in 404 sayfasına yönlendirir
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 md:py-16">
      <article className="max-w-4xl mx-auto px-4">
        {/* Geri Dön Butonu */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Günlüklere Dön
          </Link>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          {/* Dev Kapak Fotoğrafı */}
          <div className="w-full h-[40vh] md:h-[60vh] relative">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            {/* Yazar ve Tarih Bilgisi */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
                Mapiva Editör
              </span>
              <span>•</span>
              <time dateTime={post.createdAt.toISOString()}>
                {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Başlık ve Tam Metin */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
