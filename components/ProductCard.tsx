'use client'
import React from 'react'
import { Product } from '@/lib/products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/Button'
import { ShoppingCart, Tag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/hooks/use-toast'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, getItemQuantity } = useCartStore()
  const { toast } = useToast()
  const currentQuantity = getItemQuantity(product.id)

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="glass-effect border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group">
      <CardHeader className="pb-4">
        <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="text-4xl text-white/60 group-hover:text-white/80 transition-colors">
              {product.category === 'Card' && '💳'}
              {product.category === 'Wristband' && '⌚'}
              {product.category === 'Keychain' && '🔑'}
              {product.category === 'Sticker' && '🏷️'}
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <div className="bg-blue-600/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {product.category}
            </div>
          </div>
        </div>
        <CardTitle className="text-white text-lg font-semibold group-hover:text-blue-300 transition-colors">
          {product.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-white">
            ₹{product.price}
          </div>
          {currentQuantity > 0 && (
            <div className="text-sm text-blue-400">
              {currentQuantity} in cart
            </div>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"
          size="md"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCard 