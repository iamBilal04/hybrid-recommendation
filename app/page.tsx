"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Zap, Shield, Gift } from 'lucide-react'
import ACERTENITY from 'vanta/dist/vanta.net.min'
import * as THREE from 'three'

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="rounded-full bg-primary p-3 text-primary-foreground mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        ACERTENITY({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3b82f6,
          backgroundColor: 0x0,
          points: 10.00,
          maxDistance: 25.00,
          spacing: 20.00
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div className="min-h-screen">
      {/* Hero Section with Vanta.js Acertenity background */}
      <section ref={vantaRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center text-white">
          <motion.h1
            className="text-5xl font-extrabold mb-4 text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}

          >
            Welcome to Our Hybrid Shop
          </motion.h1>
          <motion.p
            className="text-xl mb-8 text-purple-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover amazing products tailored just for you
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/products">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<ShoppingBag className="h-6 w-6" />}
              title="Wide Selection"
              description="Browse through our extensive catalog of products"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Fast Delivery"
              description="Get your orders delivered quickly and efficiently"
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Secure Payments"
              description="Shop with confidence using our secure payment methods"
            />
            <FeatureCard
              icon={<Gift className="h-6 w-6" />}
              title="Special Offers"
              description="Enjoy exclusive deals and discounts on select items"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=Product+${i}`}
                    alt={`Featured Product ${i}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Featured Product {i}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This is a brief description of the featured product.
                    </p>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Start Shopping?
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join our community of satisfied customers today!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}