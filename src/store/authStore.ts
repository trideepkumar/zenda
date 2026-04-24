import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setRole: (role: Role) => void; // for easy testing/switching
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => {
        document.cookie = `user-role=${user.role}; path=/; max-age=86400`;
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        document.cookie = `user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        set({ user: null, isAuthenticated: false });
      },
      setRole: (role) => {
        document.cookie = `user-role=${role}; path=/; max-age=86400`;
        set((state) => ({ 
          user: state.user ? { ...state.user, role } : null 
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
