// app/products/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getProduct, addToCart } from '@/lib/api'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(Number(id))
        setProduct(data.product)
        setRecommendedProducts(data.recommended_products)
      } catch (err) {
        setError('Failed to fetch product details')
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    try {
      await addToCart(Number(id))
      setError('Product added to cart successfully')
    } catch (err) {
      setError('Failed to add product to cart')
    }
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <Image src={product.image_url} alt={product.name} width={400} height={300} className="w-full h-64 object-cover" />
        </CardHeader>
        <CardContent>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
          <p className="mt-2 font-bold text-lg">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant={error.includes('successfully') ? 'default' : 'destructive'} className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedProducts.map((product: any) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  )
}