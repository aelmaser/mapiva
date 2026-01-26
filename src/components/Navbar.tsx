import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    // nav: Semantik HTML etiketi (SEO için önemli)
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO ALANI */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 tracking-tighter"
            >
              MapivA
            </Link>
          </div>

          {/* MENÜ LİNKLERİ (Şimdilik placeholder) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Haritam
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Hakkında
              </Link>
            </div>
          </div>

          {/* SAĞ TARAF BUTONLAR */}
          <div className="flex items-center gap-4">
            {/* 1. Kullanıcı Giriş YAPMAMIŞSA bunu göster */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  Giriş Yap
                </button>
              </SignInButton>
            </SignedOut>

            {/* 2. Kullanıcı Giriş YAPMIŞSA bunu göster */}
            <SignedIn>
              {/* Opsiyonel: Giriş yapınca 'Haritam' linki çıksın istersen */}
              {/* <Link href="/haritam" className="text-gray-600 hover:text-black">Haritam</Link> */}

              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
