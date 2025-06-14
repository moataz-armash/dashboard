import { create } from "zustand";

interface CartItem {
  itemId: number;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  updateItem: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  resetCart: () => void;
  getCartSummary: () => { itemId: number; quantity: number }[];
}

export const useCartStore = create<CartStore>((set,get) => ({
  cart: [],
  updateItem: (itemId, quantity) =>
    set((state) => {
      const exists = state.cart.find((item) => item.itemId === itemId);
      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.itemId === itemId ? { ...item, quantity } : item
          ),
        };
      } else {
        return { cart: [...state.cart, { itemId, quantity }] };
      }
    }),
  removeItem: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.itemId !== itemId),
    })),
  resetCart: () => set({ cart: [] }),
  getCartSummary: () => {
    return get().cart.map(({ itemId, quantity }) => ({ itemId, quantity }));
  },
}));
