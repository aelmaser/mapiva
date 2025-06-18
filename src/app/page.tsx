//import Image from "next/image";
//import styles from "./page.module.css";

'use client'

import { signIn, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return <div className="p-4 text-xl">👋 Hoş geldin, {session.user?.email}</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
         style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-3xl font-bold mb-4">Mapiva'ya Hoş Geldin</h1>
      <p className="mb-6">Gezdiğin yerleri haritada işaretle, notlarını sakla.</p>
      <button
        onClick={() => signIn('email')}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Email ile Giriş Yap
      </button>
    </div>
  )
}

