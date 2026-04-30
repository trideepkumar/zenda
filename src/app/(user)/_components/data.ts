export type ShopCategory =
  | "all"
  | "supermarket"
  | "organic"
  | "dairy"
  | "meat"
  | "bakery";

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  img: string;
  offer?: string | null;
  category: string;
}

export interface Shop {
  id: string;
  name: string;
  img: string;
  type: ShopCategory;
  rating: number;
  time: string;
  deliveryFee: number;
  badge?: string;
  badgeVariant?: "green" | "red" | "amber";
  address: string;
  categories: string[];
  products: Product[];
}

export const SHOPS: Shop[] = [
  {
    id: "shop-1",
    name: "Fresh Mart",
    img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
    type: "supermarket",
    rating: 4.7,
    time: "18–25",
    deliveryFee: 20,
    badge: "Open Now",
    badgeVariant: "green",
    address: "MG Road, Kochi",
    categories: ["All", "Fruits & Veg", "Dairy", "Grains", "Snacks", "Beverages"],
    products: [
      { id: "p1", name: "Bananas", unit: "1 kg", price: 49, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300", offer: null, category: "Fruits & Veg" },
      { id: "p2", name: "Tomatoes", unit: "500 g", price: 35, img: "https://images.unsplash.com/photo-1561155707-5e2c6e1c0c50?w=300", offer: "10% off", category: "Fruits & Veg" },
      { id: "p3", name: "Full Cream Milk", unit: "1 L", price: 68, img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300", offer: null, category: "Dairy" },
      { id: "p4", name: "Amul Butter", unit: "100 g", price: 57, img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300", offer: null, category: "Dairy" },
      { id: "p5", name: "Basmati Rice", unit: "1 kg", price: 120, img: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300", offer: null, category: "Grains" },
      { id: "p6", name: "Whole Wheat Bread", unit: "400 g", price: 45, img: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=300", offer: "5% off", category: "Grains" },
      { id: "p7", name: "Orange Juice", unit: "1 L", price: 95, img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300", offer: null, category: "Beverages" },
      { id: "p8", name: "Greek Yogurt", unit: "400 g", price: 89, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300", offer: null, category: "Dairy" },
      { id: "p9", name: "Lays Classic", unit: "78 g", price: 20, img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300", offer: null, category: "Snacks" },
      { id: "p10", name: "Green Apples", unit: "4 pcs", price: 110, img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300", offer: null, category: "Fruits & Veg" },
    ],
  },
  {
    id: "shop-2",
    name: "Green Basket",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    type: "organic",
    rating: 4.9,
    time: "22–30",
    deliveryFee: 0,
    badge: "Free Delivery",
    badgeVariant: "green",
    address: "Infopark, Kochi",
    categories: ["All", "Fruits & Veg", "Organic", "Seeds & Nuts", "Herbs"],
    products: [
      { id: "p1", name: "Organic Spinach", unit: "250 g", price: 55, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300", offer: "20% off", category: "Organic" },
      { id: "p2", name: "Chia Seeds", unit: "200 g", price: 180, img: "https://images.unsplash.com/photo-1612540135601-3a7b3041c741?w=300", offer: null, category: "Seeds & Nuts" },
      { id: "p3", name: "Avocados", unit: "2 pcs", price: 149, img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300", offer: null, category: "Fruits & Veg" },
      { id: "p4", name: "Organic Carrots", unit: "500 g", price: 65, img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300", offer: null, category: "Organic" },
      { id: "p5", name: "Mixed Nuts", unit: "200 g", price: 220, img: "https://images.unsplash.com/photo-1604599340287-2042e85a3802?w=300", offer: null, category: "Seeds & Nuts" },
      { id: "p6", name: "Fresh Basil", unit: "50 g", price: 30, img: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=300", offer: null, category: "Herbs" },
    ],
  },
  {
    id: "shop-3",
    name: "Daily Dairy",
    img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
    type: "dairy",
    rating: 4.5,
    time: "12–18",
    deliveryFee: 15,
    badge: "Fast",
    badgeVariant: "amber",
    address: "Edapally, Kochi",
    categories: ["All", "Milk", "Cheese", "Butter", "Eggs"],
    products: [
      { id: "p1", name: "Fresh Eggs", unit: "12 pcs", price: 96, img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300", offer: null, category: "Eggs" },
      { id: "p2", name: "Paneer", unit: "200 g", price: 75, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300", offer: "15% off", category: "Cheese" },
      { id: "p3", name: "Cheddar Slices", unit: "200 g", price: 145, img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300", offer: null, category: "Cheese" },
      { id: "p4", name: "Skimmed Milk", unit: "1 L", price: 58, img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300", offer: null, category: "Milk" },
      { id: "p5", name: "Dahi (Curd)", unit: "400 g", price: 49, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300", offer: null, category: "Milk" },
    ],
  },
  {
    id: "shop-4",
    name: "Ocean Catch",
    img: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400",
    type: "meat",
    rating: 4.6,
    time: "25–35",
    deliveryFee: 30,
    badge: "Fresh Today",
    badgeVariant: "red",
    address: "Fort Kochi",
    categories: ["All", "Fish", "Prawns", "Chicken", "Mutton"],
    products: [
      { id: "p1", name: "Pomfret Fish", unit: "500 g", price: 380, img: "https://images.unsplash.com/photo-1535083783855-aaab6a23c30a?w=300", offer: "Fresh today", category: "Fish" },
      { id: "p2", name: "Tiger Prawns", unit: "250 g", price: 320, img: "https://images.unsplash.com/photo-1565680018093-ebb6b9ab5460?w=300", offer: null, category: "Prawns" },
      { id: "p3", name: "Chicken Breast", unit: "500 g", price: 180, img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300", offer: "10% off", category: "Chicken" },
      { id: "p4", name: "Rohu Fish", unit: "1 kg", price: 280, img: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=300", offer: null, category: "Fish" },
      { id: "p5", name: "Mutton Keema", unit: "500 g", price: 450, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300", offer: null, category: "Mutton" },
    ],
  },
  {
    id: "shop-5",
    name: "Baker's Nook",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
    type: "bakery",
    rating: 4.8,
    time: "10–15",
    deliveryFee: 0,
    badge: "Free Delivery",
    badgeVariant: "green",
    address: "Panampilly Nagar",
    categories: ["All", "Bread", "Pastries", "Cakes", "Cookies"],
    products: [
      { id: "p1", name: "Sourdough Loaf", unit: "500 g", price: 120, img: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=300", offer: null, category: "Bread" },
      { id: "p2", name: "Croissant", unit: "2 pcs", price: 85, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300", offer: null, category: "Pastries" },
      { id: "p3", name: "Blueberry Muffin", unit: "2 pcs", price: 90, img: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=300", offer: "Buy 2+1", category: "Pastries" },
      { id: "p4", name: "Chocolate Cake", unit: "500 g", price: 350, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", offer: null, category: "Cakes" },
      { id: "p5", name: "Oat Cookies", unit: "200 g", price: 110, img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300", offer: null, category: "Cookies" },
      { id: "p6", name: "Pita Bread", unit: "6 pcs", price: 75, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300", offer: null, category: "Bread" },
    ],
  },
  {
    id: "shop-6",
    name: "Big Bazaar Express",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    type: "supermarket",
    rating: 4.3,
    time: "30–40",
    deliveryFee: 0,
    badge: "Free Delivery",
    badgeVariant: "green",
    address: "Lulu Mall, Edapally",
    categories: ["All", "Staples", "Snacks", "Beverages", "Cleaning"],
    products: [
      { id: "p1", name: "Toor Dal", unit: "1 kg", price: 130, img: "https://images.unsplash.com/photo-1585996813570-fdcea2a30dbb?w=300", offer: "12% off", category: "Staples" },
      { id: "p2", name: "Sunflower Oil", unit: "1 L", price: 165, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300", offer: null, category: "Staples" },
      { id: "p3", name: "Kurkure", unit: "78 g", price: 20, img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300", offer: null, category: "Snacks" },
      { id: "p4", name: "Maggi Noodles", unit: "4 pack", price: 72, img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300", offer: null, category: "Snacks" },
      { id: "p5", name: "Pepsi 1.25 L", unit: "1.25 L", price: 65, img: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=300", offer: null, category: "Beverages" },
      { id: "p6", name: "Dettol Handwash", unit: "200 ml", price: 89, img: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300", offer: null, category: "Cleaning" },
    ],
  },
];

export const SHOP_FILTER_TABS: { label: string; value: ShopCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Supermarket", value: "supermarket" },
  { label: "Organic", value: "organic" },
  { label: "Dairy & Eggs", value: "dairy" },
  { label: "Meat & Fish", value: "meat" },
  { label: "Bakery", value: "bakery" },
];