"use client";
import { useState, useEffect } from 'react';
import { getProducts, addToCart } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activity, setActivity] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load activity from local storage
    const storedActivity = localStorage.getItem('activity');
    if (storedActivity) {
      setActivity(JSON.parse(storedActivity));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts(activity);
        console.log('Complete Backend response:', response);
        
        if (response && Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response && typeof response === 'object' && Object.keys(response).length > 0) {
          // @ts-ignore
          const extractedProducts = Object.values(response).flat().filter(item => typeof item === 'object' && item.id);
          if (extractedProducts.length > 0) {
            setProducts(extractedProducts as Product[]);
          } else {
            setError('No valid products found in the response');
          }
        } else {
          setError('Unexpected response structure');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch products if activity has items
    if (activity.length > 0) {
      const debounceTimeout = setTimeout(() => {
        fetchProducts();
      }, 500); // Debounce delay in milliseconds

      return () => clearTimeout(debounceTimeout); // Cleanup on component unmount or on new activity change
    }
  }, [activity]);

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId);
      const updatedActivity = [productId.toString(), ...activity.slice(0, 4)];
      setActivity(updatedActivity);
      localStorage.setItem('activity', JSON.stringify(updatedActivity)); // Store activity in local storage
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full" />
          ))
        ) : products.length > 0 ? (
          products.map((product: Product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
