import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from './AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mapiva',
  description: 'Şehirleri işaretle, notlarını sakla',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
