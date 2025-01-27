import { create } from "zustand";

interface AppState {
  appLoading: boolean;
  setAppLoading: (val: boolean) => void;
}

export const useAppState = create<AppState>()((set) => ({
  appLoading: false,
  setAppLoading: (val) => set(() => ({ appLoading: val })),
}));
