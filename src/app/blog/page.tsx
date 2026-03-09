import React from "react";
import AddJournalForm from "@/components/AddJournalForm";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { db } from "@/lib/db";

async function getPosts() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();
  const { userId } = await auth();

  // Kullanıcı Admin mi kontrol et
  const isAdmin = userId === process.env.ADMIN_USER_ID;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Seyahat Günlükleri
          </h1>
          <p className="text-gray-600 text-lg">
            Mapiva topluluğunun keşfettiği harika yerleri incele veya kendi
            hikayeni paylaş.
          </p>
        </div>

        {/* Giriş Yapan Herkese Formu Gösteriyoruz ama isAdmin bilgisini de veriyoruz */}
        <SignedIn>
          <AddJournalForm isAdmin={isAdmin} />
        </SignedIn>

        {/* Giriş Yapmayanlardan Kayıt İstiyoruz */}
        <SignedOut>
          <div className="bg-white border border-blue-100 rounded-2xl p-6 text-center mb-12 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Kendi Seyahatini Paylaş
            </h3>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
                Giriş Yap ve Yazmaya Başla
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📚</span> Son Eklenen Günlükler
          </h2>

          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 italic">
              Henüz hiç günlük paylaşılmamış. İlk adımı sen at!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="font-medium bg-gray-100 px-2.5 py-1 rounded-md">
                        Gezgin
                      </span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
