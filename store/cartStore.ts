import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/lib/products'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  total: number
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (id: string) => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (product: Product) => {
        const { items } = get()
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          set((state) => ({
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            total: state.total + product.price
          }))
        } else {
          set((state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
            total: state.total + product.price
          }))
        }
      },
      
      removeItem: (id: string) => {
        const { items } = get()
        const item = items.find(item => item.id === id)
        if (!item) return
        
        set((state) => ({
          items: state.items.filter(item => item.id !== id),
          total: state.total - (item.price * item.quantity)
        }))
      },
      
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        const { items } = get()
        const item = items.find(item => item.id === id)
        if (!item) return
        
        const quantityDiff = quantity - item.quantity
        
        set((state) => ({
          items: state.items.map(item =>
            item.id === id
              ? { ...item, quantity }
              : item
          ),
          total: state.total + (item.price * quantityDiff)
        }))
      },
      
      clearCart: () => {
        set({ items: [], total: 0 })
      },
      
      getItemQuantity: (id: string) => {
        const { items } = get()
        const item = items.find(item => item.id === id)
        return item ? item.quantity : 0
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
) 