import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
}

interface AccessState {
  hasAccess: boolean;
  userData: UserData | null;
  grantAccess: (data: UserData) => void;
  revokeAccess: () => void;
}

export const useAccessStore = create<AccessState>()(
  persist(
    (set) => ({
      hasAccess: false,
      userData: null,
      grantAccess: (data: UserData) =>
        set({ hasAccess: true, userData: data }),
      revokeAccess: () =>
        set({ hasAccess: false, userData: null }),
    }),
    {
      name: 'calculator-access',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        hasAccess: state.hasAccess,
        userData: state.userData,
      }),
    }
  )
);
