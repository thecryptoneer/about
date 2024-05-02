import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  checks: number;
  token: string;
  user: any;
  signature: any;
  message: any;
  address: any;
}

export interface AuthActions {
  setChecks: () => void;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  setSignature: (signature: any) => void;
  setMessage: (message: any) => void;
  setAddress: (address: any) => void;
  isValidAuth: () => string;
  resetAuthStore: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore: any = create<AuthStore>()(
  persist(
    (set, get) => ({
      checks: 0,
      setChecks: () => set({ checks: get().checks + 1 }),
      token: "",
      setToken: async (token: string) => {
        set({ token });
      },
      user: null,
      setUser: (user: any) => set({ user }),
      signature: null,
      setSignature: (signature: any) => set({ signature }),
      message: null,
      setMessage: (message: any) => set({ message }),
      address: null,
      setAddress: (address: any) => set({ address }),
      isValidAuth: (): string => {
        // check if token exists and can be decoded
        return get().token;
      },
      resetAuthStore: () => {
        set({ token: "" });
        set({ user: null });
        set({ signature: null });
        set({ message: null });
        set({ address: null });
      },
    }),
    {
      name: "auth-store",
      skipHydration: true,
    },
  ),
);
