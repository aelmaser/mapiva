import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blogData"; // Veriyi içe aktar

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Seyahat Günlüğü</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Türkiye'nin dört bir yanından gezi notları, lezzet durakları ve
          ipuçları.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group">
            <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 h-full flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                  {post.category}
                </div>
              </div>
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
                  Devamını Oku{" "}
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
