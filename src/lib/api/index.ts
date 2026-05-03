import { User, Product, Order, Role } from '@/types';

const MOCK_CATEGORIES = [
  'Fruits',
  'Vegetables',
  'Bakery',
  'Dairy',
  'Snacks',
  'Groceries',
];

const categoryDetails: Record<
  string,
  {
    keywords: string[];
    prefix: string;
  }
> = {
  Fruits: {
    keywords: ['apple', 'banana', 'mango', 'strawberry'],
    prefix: 'Fresh',
  },

  Vegetables: {
    keywords: ['broccoli', 'carrot', 'tomato', 'cabbage'],
    prefix: 'Organic',
  },

  Bakery: {
    keywords: ['bread', 'croissant', 'bagel', 'bun'],
    prefix: 'Daily',
  },

  Dairy: {
    keywords: ['milk', 'cheese', 'butter', 'yogurt'],
    prefix: 'Farm',
  },

  Snacks: {
    keywords: ['chips', 'cookies', 'popcorn', 'granola'],
    prefix: 'Tasty',
  },

  Groceries: {
    keywords: ['rice', 'pasta', 'flour', 'oats'],
    prefix: 'Premium',
  },
};

const realisticImages: Record<string, string[]> = {
  Fruits: [
    'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800',
    'https://images.unsplash.com/photo-1574226516831-e1dff420e37f?w=800',
    'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800',
    'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800',
  ],

  Vegetables: [
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800',
    'https://images.unsplash.com/photo-1467453678174-768ec283a940?w=800',
    'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800',
  ],

  Bakery: [
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800',
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800',
    'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800',
  ],

  Dairy: [
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800',
    'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800',
    'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=800',
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800',
  ],

  Snacks: [
    'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800',
    'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800',
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
    'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800',
  ],

  Groceries: [
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
    'https://images.unsplash.com/photo-1603048719539-9ecb4f9c8f04?w=800',
    'https://images.unsplash.com/photo-1514996937319-344454492b37?w=800',
  ],
};

const generateMockProducts = (): Product[] => {
  const products: Product[] = [];

  for (let i = 1; i <= 24; i++) {
    const category =
      MOCK_CATEGORIES[i % MOCK_CATEGORIES.length];

    const details = categoryDetails[category];

    const keyword =
      details.keywords[i % details.keywords.length];

    const productName = `${details.prefix} ${
      keyword.charAt(0).toUpperCase() + keyword.slice(1)
    }`;

    const categoryImages = realisticImages[category];

    const mainImage =
      categoryImages[i % categoryImages.length];

    products.push({
      id: `prod-${i}`,

      name: productName,

      description: `${productName} sourced from trusted farms and suppliers. Fresh quality guaranteed.`,

      price: parseFloat(
        (Math.random() * (20 - 3) + 3).toFixed(2)
      ),

      stock: Math.floor(Math.random() * 80) + 20,

      imageUrl: mainImage,

      images: [
        mainImage,
        categoryImages[(i + 1) % categoryImages.length],
      ],

      category,

      trending: i % 3 === 0,
    });
  }

  return products;
};

let MOCK_PRODUCTS = generateMockProducts();

let MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',

    userId: 'user-1',

    totalAmount: MOCK_PRODUCTS[0].price,

    status: 'processing',

    items: [
      {
        product: MOCK_PRODUCTS[0],
        quantity: 1,
      },
    ],

    createdAt: new Date().toISOString(),
  },
];

let MOCK_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin',
  },

  {
    id: 'delivery-1',
    name: 'Swift Delivery',
    email: 'delivery@example.com',
    role: 'delivery',
    avatar: 'https://i.pravatar.cc/150?u=delivery',
  },

  {
    id: 'user-1',
    name: 'Jane Doe',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=jane',
  },
];

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (
      email: string,
      role: string
    ): Promise<User> => {
      await delay(800);

      let user = MOCK_USERS.find(
        u => u.email === email
      );

      if (!user) {
        user = {
          id: `mock-${role}-id-${Date.now()}`,

          name: `Mock ${
            role.charAt(0).toUpperCase() + role.slice(1)
          }`,

          email,

          role: role as Role,

          avatar: `https://i.pravatar.cc/150?u=${email}`,
        };

        MOCK_USERS.push(user);
      }

      return user;
    },
  },

  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(500);

      return [...MOCK_PRODUCTS];
    },

    getById: async (
      id: string
    ): Promise<Product | undefined> => {
      await delay(300);

      return MOCK_PRODUCTS.find(p => p.id === id);
    },

    create: async (
      product: Omit<Product, 'id'>
    ): Promise<Product> => {
      await delay(600);

      const newProduct = {
        ...product,
        id: `prod-${Date.now()}`,
      };

      MOCK_PRODUCTS.push(newProduct);

      return newProduct;
    },

    delete: async (id: string): Promise<void> => {
      await delay(400);

      MOCK_PRODUCTS = MOCK_PRODUCTS.filter(
        p => p.id !== id
      );
    },
  },

  orders: {
    getAll: async (): Promise<Order[]> => {
      await delay(600);

      return [...MOCK_ORDERS];
    },

    getByUserId: async (
      userId: string
    ): Promise<Order[]> => {
      await delay(400);

      return MOCK_ORDERS.filter(
        o => o.userId === userId
      );
    },

    getAssignedToDelivery: async (
      deliveryAgentId: string
    ): Promise<Order[]> => {
      await delay(400);

      return MOCK_ORDERS.filter(
        o =>
          o.deliveryAgentId === deliveryAgentId ||
          o.status === 'processing'
      );
    },

    updateStatus: async (
      orderId: string,
      status: Order['status']
    ): Promise<Order> => {
      await delay(500);

      const order = MOCK_ORDERS.find(
        o => o.id === orderId
      );

      if (!order) {
        throw new Error('Order not found');
      }

      order.status = status;

      return { ...order };
    },

    create: async (
      orderData: Omit<
        Order,
        'id' | 'createdAt' | 'status'
      >
    ): Promise<Order> => {
      await delay(800);

      const newOrder: Order = {
        ...orderData,

        id: `ORD-${Date.now()}`,

        createdAt: new Date().toISOString(),

        status: 'pending',
      };

      MOCK_ORDERS.push(newOrder);

      return newOrder;
    },
  },

  users: {
    getAll: async (): Promise<User[]> => {
      await delay(400);

      return [...MOCK_USERS];
    },

    updateRole: async (
      userId: string,
      role: Role
    ): Promise<User> => {
      await delay(300);

      const user = MOCK_USERS.find(
        u => u.id === userId
      );

      if (!user) {
        throw new Error('User not found');
      }

      user.role = role;

      return { ...user };
    },
  },
};