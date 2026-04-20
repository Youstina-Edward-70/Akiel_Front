import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/UserSchema';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User/*, remember: boolean*/) => void;
    logout: () => void;
    getRole: () => string | undefined;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,

            login: (userData/*, remember*/) => set({
                user: userData,
                isAuthenticated: true
            }),

            logout: () => {
                set({ user: null, isAuthenticated: false });
                localStorage.removeItem('akiel-auth-storage');
            },

            getRole: () => get().user?.role
        }),
        {
            name: 'akiel-auth-storage',
        }
    )
);