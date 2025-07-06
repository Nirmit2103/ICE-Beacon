'use client'
import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

interface CartIconProps {
  className?: string
}

const CartIcon: React.FC<CartIconProps> = ({ className = '' }) => {
  const { items } = useCartStore()
  const itemCount = items.reduce((total: number, item: any) => total + item.quantity, 0)

  return (
    <Link href="/cart" className={`relative inline-flex items-center justify-center ${className}`}>
      <div className="relative">
        <ShoppingCart className="w-6 h-6 text-white hover:text-blue-300 transition-colors" />
        {itemCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
            {itemCount > 99 ? '99+' : itemCount}
          </div>
        )}
      </div>
    </Link>
  )
}

export default CartIcon 