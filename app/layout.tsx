// app/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hybrid Recommendation System',
  description: 'A Next.js e-commerce app with hybrid recommendation system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-6 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}