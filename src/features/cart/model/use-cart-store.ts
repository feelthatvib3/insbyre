import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartItem } from 'shared/types/cart';

interface State {
  items: CartItem[];
}

interface Action {
  addToCart: (v: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (params: { id: string; size?: string }) => void;
  clearCart: () => void;
  getCount: () => number;
  getTotal: () => number;
  incrementQuantity: ({ id, size }: { id: string; size?: string }) => void;
  decrementQuantity: ({ id, size }: { id: string; size?: string }) => void;
}

export const useCartStore = create<State & Action>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id && i.size === item.size);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i
            )
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },
      removeFromCart: ({ id, size }) => {
        set({
          items: get().items.filter((i) => {
            if (size !== undefined) {
              return !(i.id === id && i.size === size);
            }
            return i.id !== id;
          })
        });
      },
      incrementQuantity: ({ id, size }) => {
        set({
          items: get().items.map((i) => {
            const match =
              i.id === id && (size !== undefined ? i.size === size : i.size === undefined);
            return match ? { ...i, quantity: i.quantity + 1 } : i;
          })
        });
      },
      decrementQuantity: ({ id, size }) => {
        set({
          items: get()
            .items.map((i) => {
              const match =
                i.id === id && (size !== undefined ? i.size === size : i.size === undefined);
              return match ? { ...i, quantity: i.quantity - 1 } : i;
            })
            .filter((i) => i.quantity > 0)
        });
      },
      clearCart: () => set({ items: [] }),
      getCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      getTotal: () => get().items.reduce((acc, item) => acc + item.quantity * item.price, 0)
    }),
    {
      name: 'cart'
    }
  )
);
