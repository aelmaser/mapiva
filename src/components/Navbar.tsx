import Link from 'next/link';

export default function Navbar() {
  return (
    // nav: Semantik HTML etiketi (SEO için önemli)
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO ALANI */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tighter">
              MapivA
            </Link>
          </div>

          {/* MENÜ LİNKLERİ (Şimdilik placeholder) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Hakkında
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* SAĞ TARAF BUTONLAR */}
          <div>
            <Link 
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Giriş Yap
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}