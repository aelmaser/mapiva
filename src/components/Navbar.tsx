"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo (Her ekranda görünür) */}
          <Link
            href="/"
            className="font-bold text-xl text-blue-600 flex items-center gap-2 z-10"
          >
            🌍 Mapiva
          </Link>

          {/* Masaüstü Menü (Mobilde gizli, PC'de görünür) */}
          <div className="hidden md:flex items-center gap-8">
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
              Seyahat Günlükleri
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              Hakkında
            </Link>
          </div>

          {/* Sağ Taraf: Profil ve Hamburger */}
          <div className="flex items-center gap-4 z-10">
            {/* Giriş yapılmışsa profil fotosu */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Giriş yapılmamışsa PC'de "Giriş Yap" butonu */}
            <SignedOut>
              <div className="hidden md:block">
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition shadow-md shadow-blue-500/20">
                    Giriş Yap
                  </button>
                </SignInButton>
              </div>
            </SignedOut>

            {/* Mobil Hamburger Butonu (PC'de gizli, Mobilde görünür) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-2 text-gray-600 hover:bg-gray-50 rounded-lg focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Açılır Mobil Menü */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 px-4 py-4 space-y-4 shadow-xl absolute w-full">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-2 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            Haritam
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-2 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            Seyahat Günlükleri
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-2 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            Hakkında
          </Link>

          <SignedOut>
            <div className="pt-2 border-t border-gray-100">
              <SignInButton mode="modal">
                <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">
                  Giriş Yap
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
