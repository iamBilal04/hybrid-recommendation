// contexts/AuthContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login, register } from '@/lib/api'

type AuthContextType = {
  user: string | null
  login: (username: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser(token)
    }
  }, [])

  const loginUser = async (username: string, password: string) => {
    try {
      const token = await login(username, password)
      localStorage.setItem('token', token)
      setUser(token)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const registerUser = async (userData: any) => {
    try {
      const token = await register(userData)
      localStorage.setItem('token', token)
      setUser(token)
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login: loginUser, register: registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}