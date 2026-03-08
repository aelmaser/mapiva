import React from "react";
// DİKKAT: Navbar ve Footer importlarını sildik, çünkü layout.tsx zaten onları ekliyor!
import AddJournalForm from "@/components/AddJournalForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const staticPosts = [
  {
    id: "1",
    title: "Tarihin İzinde: Çanakkale Turu",
    excerpt:
      "Şehitlikler, Truva Antik Kenti ve o muazzam boğaz manzarası eşliğinde unutulmaz bir tarih yolculuğu yaşadım. Herkesin mutlaka görmesi gereken bir yer.",
    // Senin verdiğin Çanakkale fotoğrafı:
    imageUrl:
      "https://etstur.com/letsgo/wp-content/uploads/2018/11/canakkale-truva-ati.jpg",
    author: "Kurucu",
    date: "15 Şubat 2026",
  },
  {
    id: "2",
    title: "Kocaeli: Körfezin İncisi",
    excerpt:
      "Sekapark'ta deniz havası almak, yemyeşil doğasında yürüyüş yapmak harikaydı. Tabii ki meşhur pişmaniyesinden tatmadan dönmedim!",
    // Senin verdiğin Kocaeli fotoğrafı:
    imageUrl: "https://etstur.com/letsgo/wp-content/uploads/2024/02/22.jpg",
    author: "Kurucu",
    date: "28 Şubat 2026",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar'ı buradan kaldırdık */}

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Seyahat Günlükleri
          </h1>
          <p className="text-gray-600 text-lg">
            Topluluğumuzun keşfettiği harika yerleri incele veya kendi anılarını
            paylaş.
          </p>
        </div>

        {/* --- YENİ YAZI EKLEME FORMU --- */}
        <SignedIn>
          <AddJournalForm />
        </SignedIn>

        {/* --- GİRİŞ YAPMAYANLARA TEŞVİK --- */}
        <SignedOut>
          <div className="bg-white border border-blue-100 rounded-2xl p-6 md:p-8 text-center mb-12 shadow-sm flex flex-col items-center justify-center">
            <span className="text-5xl mb-4">🌍</span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Kendi Seyahatini Paylaş
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Sen de gezdiğin yerleri ve çektiğin harika fotoğrafları diğer
              gezginlerle paylaşmak ister misin?
            </p>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
                Giriş Yap ve Yazmaya Başla
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        {/* --- YAZILARIN LİSTELENDİĞİ KISIM --- */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📚</span> Son Eklenen Günlükler
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staticPosts.map((post) => (
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
                      {post.author}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <button className="mt-4 text-blue-600 font-medium text-sm hover:text-blue-800 transition flex items-center gap-1">
                    Devamını Oku <span className="text-lg">›</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer'ı buradan kaldırdık */}
    </main>
  );
}
