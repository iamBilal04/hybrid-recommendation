// components/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type ProductCardProps = {
  id: number
  name: string
  description: string
  image_url: string
  price: number
  onAddToCart: (id: number) => void
}

export default function ProductCard({ id, name, description, image_url, price, onAddToCart }: ProductCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <Image src={image_url} alt={name} width={300} height={200} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <p className="mt-2 text-gray-600">{description}</p>
        <p className="mt-2 font-bold">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/products/${id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        <Button onClick={() => onAddToCart(id)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}