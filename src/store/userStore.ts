import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Address {
    governorate: string;
    city: string;
    street: string;
    details: string;
}

export interface UserProfileData {
    fullname?: string;
    email?: string;
    phone?: string;
    profile_pic?: string;
    address?: Address[];
    favoritesCount?: number;
    reviewsCount?: number;
}

interface UserStoreState {
    profile: UserProfileData | null;
    setProfile: (profile: UserProfileData) => void;
    updateProfile: (data: Partial<UserProfileData>) => void;
    clearProfile: () => void;
}

export const useUserStore = create<UserStoreState>()(
    persist(
        (set) => ({
            profile: null,
            setProfile: (profile) => set({ profile }),
            updateProfile: (data) => set((state) => ({ 
                profile: state.profile ? { ...state.profile, ...data } : (data as UserProfileData) 
            })),
            clearProfile: () => set({ profile: null }),
        }),
        { name: 'akiel-user-profile' }
    )
);