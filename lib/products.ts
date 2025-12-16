export interface Product {
  id: string
  name: string
  price: number
  category: 'Card' | 'Wristband' | 'Keychain' | 'Sticker'
  imageUrl: string
  description: string
  features: string[]
}

export const products: Product[] = [
  {
    id: "ice_card_001",
    name: "Classic ICE Beacon Card",
    price: 199,
    category: "Card",
    imageUrl: "/products/classic-card.png",
    description: "Premium ICE Beacon-enabled card for instant medical profile access",
    features: [
      "Instant medical profile access",
      "Water-resistant design",
      "Credit card size for easy carrying",
      "Works with all NFC-enabled devices"
    ]
  },
  {
    id: "ice_wristband_001",
    name: "Comfort ICE Beacon Wristband",
    price: 299,
    category: "Wristband",
    imageUrl: "/products/comfort-wristband.png",
    description: "Comfortable silicone wristband with embedded ICE Beacon technology",
    features: [
      "Soft silicone material",
      "Adjustable fit",
      "24/7 medical profile access",
      "Sweat and water resistant"
    ]
  },
  {
    id: "ice_keychain_001",
    name: "Durable ICE Beacon Keychain",
    price: 249,
    category: "Keychain",
    imageUrl: "/products/durable-keychain.png",
    description: "Rugged keychain with ICE Beacon chip for reliable medical information access",
    features: [
      "Aluminum construction",
      "Carabiner clip design",
      "Shock-resistant ICE Beacon chip",
      "Perfect for keys or bags"
    ]
  },
  {
    id: "ice_sticker_001",
    name: "Smart ICE Beacon Sticker",
    price: 99,
    category: "Sticker",
    imageUrl: "/products/smart-sticker.png",
    description: "Adhesive ICE Beacon sticker for easy application to any surface",
    features: [
      "Peel and stick application",
      "Thin and discreet design",
      "Works on phones, wallets, cases",
      "Affordable medical profile access"
    ]
  },
  {
    id: "ice_wristband_kids",
    name: "Kids ICE Beacon Wristband",
    price: 249,
    category: "Wristband",
    imageUrl: "/products/kids-wristband.png",
    description: "Colorful and safe ICE Beacon wristband designed specifically for children",
    features: [
      "Child-safe materials",
      "Bright, fun colors",
      "Easy for parents to access",
      "Breakaway safety clasp"
    ]
  },
  {
    id: "ice_card_premium",
    name: "Premium ICE Beacon Card",
    price: 399,
    category: "Card",
    imageUrl: "/products/premium-card.png",
    description: "Luxury ICE Beacon card with premium materials and enhanced durability",
    features: [
      "Carbon fiber construction",
      "RFID blocking technology",
      "Lifetime warranty",
      "Premium packaging included"
    ]
  }
]

export const categories = ['All', 'Card', 'Wristband', 'Keychain', 'Sticker'] as const 
