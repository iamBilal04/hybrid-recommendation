// app/checkout/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { getCheckoutRecommendations } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from 'next/image'

export default function Checkout() {
  const [recommendations, setRecommendations] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getCheckoutRecommendations('checkout')
        setRecommendations(data)
      } catch (err) {
        setError('Failed to fetch recommendations')
      }
    }
    fetchRecommendations()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Checkout Complete</h1>
      <Alert className="mb-6">
        <AlertDescription>Your order has been placed successfully!</AlertDescription>
      </Alert>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((product: any) => (
          <Card key={product.id}>
            <CardHeader>
              <Image src={product.image_url} alt={product.name} width={300} height={200} className="w-full h-48 object-cover" />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}