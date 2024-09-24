// app/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Register() {
  const [formData, setFormData] = useState({
    uname: '',
    password1: '',
    password2: '',
    name: '',
    mobile: '',
    email: ''
  })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match')
      return
    }
    const success = await register(formData)
    if (success) {
      router.push('/products')
    } else {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="uname">Username</Label>
            <Input id="uname" name="uname" value={formData.uname} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password1">Password</Label>
            <Input id="password1" name="password1" type="password" value={formData.password1} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password2">Confirm Password</Label>
            <Input id="password2" name="password2" type="password" value={formData.password2} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile</Label>
            <Input id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Register</Button>
        </CardFooter>
      </form>
    </Card>
  )
}