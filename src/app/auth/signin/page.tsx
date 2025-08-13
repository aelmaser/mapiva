'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    const res = await signIn('email', {
      email,
      callbackUrl: '/',
      redirect: false,
    })

    setLoading(false)

    if (!res?.error) {
      setMessage('📬 E-posta adresinize giriş bağlantısı gönderildi.')
    } else {
      setMessage('❌ Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Email ile Giriş Yap</h1>

        {message && (
          <div className="text-center text-sm text-green-600 font-medium mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="ornek@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className={`py-2 px-4 text-white rounded-md font-semibold ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Gönderiliyor...' : 'Giriş Bağlantısı Gönder'}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          Giriş bağlantısı gelen kutunuzda görünmüyorsa, spam klasörünü kontrol edin.
        </p>
      </div>
    </div>
  )
}
