// components/Header.tsx
'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Hybrid Shop
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/products">
            <Button variant="ghost">Products</Button>
          </Link>
          {user ? (
            <>
              <Link href="/cart">
                <Button variant="ghost">Cart</Button>
              </Link>
              <Button onClick={logout} variant="outline">Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}