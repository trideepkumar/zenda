export type Product = {
  id: string;
  name: string;
  unit: string;
  price: number;
  originalPrice?: number;
  img: string;
  offer?: string | null;
  inStock: boolean;
  category: string;
};

export type Shop = {
  id: string;
  name: string;
  tagline: string;
  img: string;
  type: "supermarket" | "organic" | "dairy" | "meat" | "bakery";
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  badge?: string;
  badgeType?: "promo" | "hot" | "new";
  categories: string[];
  products: Product[];
};

export const SHOPS: Shop[] = [
  {
    id: "shop-1",
    name: "Fresh Mart",
    tagline: "Your daily essentials, delivered fresh",
    img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600",
    type: "supermarket",
    rating: 4.7,
    reviewCount: 1240,
    deliveryTime: "18–25",
    deliveryFee: 20,
    minOrder: 149,
    badge: "Bestseller",
    badgeType: "promo",
    categories: ["All", "Fruits & Veg", "Dairy & Eggs", "Grains & Pulses", "Snacks", "Beverages"],
    products: [
      { id: "p1-1", name: "Bananas", unit: "1 kg", price: 49, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300", offer: null, inStock: true, category: "Fruits & Veg" },
      { id: "p1-2", name: "Tomatoes", unit: "500 g", price: 35, originalPrice: 42, img: "https://images.unsplash.com/photo-1546470427-f5a2e5f1ef3c?w=300", offer: "10% off", inStock: true, category: "Fruits & Veg" },
      { id: "p1-3", name: "Full Cream Milk", unit: "1 L", price: 68, img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300", offer: null, inStock: true, category: "Dairy & Eggs" },
      { id: "p1-4", name: "Amul Butter", unit: "100 g", price: 57, img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300", offer: null, inStock: true, category: "Dairy & Eggs" },
      { id: "p1-5", name: "Basmati Rice", unit: "1 kg", price: 120, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300", offer: null, inStock: true, category: "Grains & Pulses" },
      { id: "p1-6", name: "Whole Wheat Bread", unit: "400 g", price: 45, originalPrice: 50, img: "https://images.unsplash.com/photo-1559181567-c3190958d982?w=300", offer: "5% off", inStock: true, category: "Snacks" },
      { id: "p1-7", name: "Orange Juice", unit: "1 L", price: 95, img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300", offer: null, inStock: true, category: "Beverages" },
      { id: "p1-8", name: "Greek Yogurt", unit: "400 g", price: 89, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300", offer: null, inStock: true, category: "Dairy & Eggs" },
      { id: "p1-9", name: "Fresh Apples", unit: "1 kg", price: 130, img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300", offer: null, inStock: true, category: "Fruits & Veg" },
      { id: "p1-10", name: "Toor Dal", unit: "1 kg", price: 130, originalPrice: 148, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300", offer: "12% off", inStock: true, category: "Grains & Pulses" },
    ],
  },
  {
    id: "shop-2",
    name: "Green Basket",
    tagline: "100% certified organic produce",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600",
    type: "organic",
    rating: 4.9,
    reviewCount: 876,
    deliveryTime: "22–30",
    deliveryFee: 0,
    minOrder: 299,
    badge: "Free Delivery",
    badgeType: "promo",
    categories: ["All", "Organic Veg", "Seeds & Nuts", "Superfoods", "Herbs"],
    products: [
      { id: "p2-1", name: "Organic Spinach", unit: "250 g", price: 55, originalPrice: 70, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300", offer: "20% off", inStock: true, category: "Organic Veg" },
      { id: "p2-2", name: "Chia Seeds", unit: "200 g", price: 180, img: "https://images.unsplash.com/photo-1614112991671-4bbf7e284427?w=300", offer: null, inStock: true, category: "Seeds & Nuts" },
      { id: "p2-3", name: "Avocados", unit: "2 pcs", price: 149, img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300", offer: null, inStock: true, category: "Organic Veg" },
      { id: "p2-4", name: "Organic Carrots", unit: "500 g", price: 65, img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300", offer: null, inStock: true, category: "Organic Veg" },
      { id: "p2-5", name: "Mixed Nuts", unit: "200 g", price: 220, img: "https://images.unsplash.com/photo-1536591375667-e3bf2ec8a8de?w=300", offer: null, inStock: true, category: "Seeds & Nuts" },
      { id: "p2-6", name: "Fresh Basil", unit: "50 g", price: 30, img: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=300", offer: null, inStock: true, category: "Herbs" },
    ],
  },
  {
    id: "shop-3",
    name: "Daily Dairy",
    tagline: "Farm-fresh dairy, straight to you",
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600",
    type: "dairy",
    rating: 4.5,
    reviewCount: 543,
    deliveryTime: "12–18",
    deliveryFee: 15,
    minOrder: 99,
    badge: "Fast",
    badgeType: "hot",
    categories: ["All", "Milk", "Cheese", "Butter & Cream", "Eggs"],
    products: [
      { id: "p3-1", name: "Fresh Eggs", unit: "12 pcs", price: 96, img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300", offer: null, inStock: true, category: "Eggs" },
      { id: "p3-2", name: "Paneer", unit: "200 g", price: 75, originalPrice: 88, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300", offer: "15% off", inStock: true, category: "Cheese" },
      { id: "p3-3", name: "Cheddar Slices", unit: "200 g", price: 145, img: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=300", offer: null, inStock: true, category: "Cheese" },
      { id: "p3-4", name: "Skimmed Milk", unit: "1 L", price: 58, img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300", offer: null, inStock: true, category: "Milk" },
      { id: "p3-5", name: "Dahi (Curd)", unit: "400 g", price: 49, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300", offer: null, inStock: true, category: "Milk" },
    ],
  },
  {
    id: "shop-4",
    name: "Ocean Catch",
    tagline: "Fresh from the sea, today's catch",
    img: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600",
    type: "meat",
    rating: 4.6,
    reviewCount: 329,
    deliveryTime: "25–35",
    deliveryFee: 30,
    minOrder: 199,
    badge: "Today's Catch",
    badgeType: "hot",
    categories: ["All", "Fish", "Prawns & Shrimp", "Chicken", "Mutton"],
    products: [
      { id: "p4-1", name: "Pomfret Fish", unit: "500 g", price: 380, img: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=300", offer: "Fresh today", inStock: true, category: "Fish" },
      { id: "p4-2", name: "Tiger Prawns", unit: "250 g", price: 320, img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300", offer: null, inStock: true, category: "Prawns & Shrimp" },
      { id: "p4-3", name: "Chicken Breast", unit: "500 g", price: 180, originalPrice: 200, img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300", offer: "10% off", inStock: true, category: "Chicken" },
      { id: "p4-4", name: "Rohu Fish", unit: "1 kg", price: 280, img: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300", offer: null, inStock: true, category: "Fish" },
      { id: "p4-5", name: "Mutton Keema", unit: "500 g", price: 450, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300", offer: null, inStock: true, category: "Mutton" },
    ],
  },
  {
    id: "shop-5",
    name: "Baker's Nook",
    tagline: "Baked fresh every morning",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
    type: "bakery",
    rating: 4.8,
    reviewCount: 712,
    deliveryTime: "10–15",
    deliveryFee: 0,
    minOrder: 149,
    badge: "Free Delivery",
    badgeType: "promo",
    categories: ["All", "Bread", "Pastries", "Cakes", "Cookies"],
    products: [
      { id: "p5-1", name: "Sourdough Loaf", unit: "500 g", price: 120, img: "https://images.unsplash.com/photo-1585478259715-4d5223f54139?w=300", offer: null, inStock: true, category: "Bread" },
      { id: "p5-2", name: "Butter Croissant", unit: "2 pcs", price: 85, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300", offer: null, inStock: true, category: "Pastries" },
      { id: "p5-3", name: "Blueberry Muffin", unit: "2 pcs", price: 90, img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300", offer: "Buy 2+1", inStock: true, category: "Pastries" },
      { id: "p5-4", name: "Chocolate Cake", unit: "500 g", price: 350, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", offer: null, inStock: true, category: "Cakes" },
      { id: "p5-5", name: "Oat Cookies", unit: "200 g", price: 110, img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", offer: null, inStock: true, category: "Cookies" },
      { id: "p5-6", name: "Pita Bread", unit: "6 pcs", price: 75, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300", offer: null, inStock: true, category: "Bread" },
    ],
  },
  {
    id: "shop-6",
    name: "Big Bazaar Express",
    tagline: "Everything you need, one stop",
    img: "https://images.unsplash.com/photo-1528323273322-d81458248d40?w=600",
    type: "supermarket",
    rating: 4.3,
    reviewCount: 2100,
    deliveryTime: "30–40",
    deliveryFee: 0,
    minOrder: 199,
    badge: "Free Delivery",
    badgeType: "promo",
    categories: ["All", "Staples", "Snacks", "Beverages", "Cleaning", "Personal Care"],
    products: [
      { id: "p6-1", name: "Toor Dal", unit: "1 kg", price: 130, originalPrice: 148, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300", offer: "12% off", inStock: true, category: "Staples" },
      { id: "p6-2", name: "Sunflower Oil", unit: "1 L", price: 165, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300", offer: null, inStock: true, category: "Staples" },
      { id: "p6-3", name: "Kurkure", unit: "78 g", price: 20, img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300", offer: null, inStock: true, category: "Snacks" },
      { id: "p6-4", name: "Maggi Noodles", unit: "4 pack", price: 72, img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300", offer: null, inStock: true, category: "Snacks" },
      { id: "p6-5", name: "Pepsi", unit: "1.25 L", price: 65, img: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=300", offer: null, inStock: true, category: "Beverages" },
      { id: "p6-6", name: "Dettol Handwash", unit: "200 ml", price: 89, img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=300", offer: null, inStock: true, category: "Personal Care" },
    ],
  },
];