import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/UserSchema';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    getRole: () => string | undefined;
    updateUserRole: (newRole: 'user' | 'owner' | 'admin') => void;
    // الدالة الجديدة اللي هتحدث الصورة والبيانات في النافبار
    updateUser: (updatedData: Partial<User>) => void; 
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,

            login: (userData) => set({
                user: userData,
                isAuthenticated: true
            }),

            logout: () => {
                set({ user: null, isAuthenticated: false });
                localStorage.removeItem('akiel-auth-storage');
            },

            getRole: () => get().user?.role,

            updateUserRole: (newRole) => set((state) => ({
                user: state.user ? { ...state.user, role: newRole } : null
            })),

            // تنفيذ الدالة الجديدة
            updateUser: (updatedData) => set((state) => ({
                user: state.user ? { ...state.user, ...updatedData } : null
            })),
        }),
        {
            name: 'akiel-auth-storage',
        }
    )
);