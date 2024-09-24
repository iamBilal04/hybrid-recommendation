// app/cart/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, placeOrder } from '@/lib/api'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from 'next/image'

export default function Cart() {
  const [cart, setCart] = useState<any>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart()
        setCart(data)
      } catch (err) {
        setError('Failed to fetch cart')
      }
    }
    fetchCart()
  }, [])

  const handlePlaceOrder = async () => {
    try {
      await placeOrder()
      router.push('/checkout')
    } catch (err) {
      setError('Failed to place order')
    }
  }

  if (!cart) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {cart.quantity === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.data.map((item: any) => (
            <Card key={item.id} className="mb-4">
              <CardHeader className="flex flex-row space-x-4">
                <Image src={item.image_url} alt={item.name} width={100} height={100} className="w-24 h-24 object-cover" />
                <div>
                  <CardTitle>{item.name}</CardTitle>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Total: ${item.total_price.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
          <CardFooter className="justify-between">
            <p className="text-xl font-bold">Total Items: {cart.quantity}</p>
            <Button onClick={handlePlaceOrder}>Place Order</Button>
          </CardFooter>
        </>
      )}
    </div>
  )
}