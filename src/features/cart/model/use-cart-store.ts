import { create } from 'zustand';

interface State {
  count: number;
}

interface Action {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCartStore = create<State & Action>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
  reset: () => set({ count: 0 })
}));
