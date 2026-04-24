import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '@/types';

interface OrderState {
  userOrders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      userOrders: [],
      setOrders: (orders) => set({ userOrders: orders }),
      addOrder: (order) => set((state) => ({ userOrders: [order, ...state.userOrders] })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        userOrders: state.userOrders.map(o => 
          o.id === orderId ? { ...o, status } : o
        )
      })),
    }),
    {
      name: 'order-storage',
    }
  )
);
