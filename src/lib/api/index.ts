import { User, Product, Order, Role } from '@/types';

// Mock Data
const MOCK_CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Accessories'];

const generateMockProducts = (): Product[] => {
  const products: Product[] = [];
  for (let i = 1; i <= 24; i++) {
    const category = MOCK_CATEGORIES[i % MOCK_CATEGORIES.length];
    products.push({
      id: `prod-${i}`,
      name: `${category} Item ${i}`,
      description: `High-quality ${category.toLowerCase()} item for everyday use. Durable and premium finish.`,
      price: Math.floor(Math.random() * 500) + 10,
      stock: Math.floor(Math.random() * 100),
      imageUrl: `https://picsum.photos/seed/${i}/500/500`,
      images: [
        `https://picsum.photos/seed/${i}/500/500`,
        `https://picsum.photos/seed/${i + 100}/500/500`,
        `https://picsum.photos/seed/${i + 200}/500/500`,
      ],
      category,
      trending: i % 5 === 0,
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
    items: [{ product: MOCK_PRODUCTS[0], quantity: 1 }], 
    createdAt: new Date().toISOString() 
  },
  { 
    id: 'ORD-002', 
    userId: 'user-2', 
    totalAmount: MOCK_PRODUCTS[1].price * 2, 
    status: 'shipped', 
    deliveryAgentId: 'delivery-1', 
    items: [{ product: MOCK_PRODUCTS[1], quantity: 2 }], 
    createdAt: new Date(Date.now() - 86400000).toISOString() 
  },
];

let MOCK_USERS: User[] = [
  { id: 'admin-1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 'delivery-1', name: 'Delivery Agent', email: 'delivery@example.com', role: 'delivery' },
  { id: 'user-1', name: 'Regular User', email: 'user@example.com', role: 'user' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (email: string, role: string): Promise<User> => {
      await delay(800);
      let user = MOCK_USERS.find(u => u.email === email);
      if (!user) {
        user = {
          id: `mock-${role}-id-${Date.now()}`,
          name: `Mock ${role.charAt(0).toUpperCase() + role.slice(1)}`,
          email,
          role: role as Role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
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
    getById: async (id: string): Promise<Product | undefined> => {
      await delay(300);
      return MOCK_PRODUCTS.find(p => p.id === id);
    },
    create: async (product: Omit<Product, 'id'>): Promise<Product> => {
      await delay(600);
      const newProduct = { ...product, id: `prod-${Date.now()}` };
      MOCK_PRODUCTS.push(newProduct);
      return newProduct;
    },
    delete: async (id: string): Promise<void> => {
      await delay(400);
      MOCK_PRODUCTS = MOCK_PRODUCTS.filter(p => p.id !== id);
    }
  },
  orders: {
    getAll: async (): Promise<Order[]> => {
      await delay(600);
      return [...MOCK_ORDERS];
    },
    getByUserId: async (userId: string): Promise<Order[]> => {
      await delay(400);
      return MOCK_ORDERS.filter(o => o.userId === userId);
    },
    getAssignedToDelivery: async (deliveryAgentId: string): Promise<Order[]> => {
      await delay(400);
      return MOCK_ORDERS.filter(o => o.deliveryAgentId === deliveryAgentId || o.status === 'processing'); // Show processing as available for mock
    },
    updateStatus: async (orderId: string, status: Order['status']): Promise<Order> => {
      await delay(500);
      const order = MOCK_ORDERS.find(o => o.id === orderId);
      if (!order) throw new Error('Order not found');
      order.status = status;
      return { ...order };
    },
    create: async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
      await delay(800);
      const newOrder: Order = {
        ...orderData,
        id: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };
      MOCK_ORDERS.push(newOrder);
      return newOrder;
    }
  },
  users: {
    getAll: async (): Promise<User[]> => {
      await delay(400);
      return [...MOCK_USERS];
    },
    updateRole: async (userId: string, role: Role): Promise<User> => {
      await delay(300);
      const user = MOCK_USERS.find(u => u.id === userId);
      if (!user) throw new Error('User not found');
      user.role = role;
      return { ...user };
    }
  }
};
