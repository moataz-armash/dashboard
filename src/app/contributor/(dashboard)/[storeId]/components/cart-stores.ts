import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface CartItem {
  itemId: string;
  quantity: number;
  imageUrl: string;
  price: number;
  productName: string;
}

interface CartStore {
  cart: CartItem[];
  updateItem: (
    itemId: string,
    quantity: number,
    imageUrl: string,
    price: number,
    productName: string,
    token: string
  ) => Promise<void>;
  removeItem: (
    itemId: string,
    quantity: number,
    token: string
  ) => Promise<void>;
  resetCart: () => void;
  getCartSummary: () => { itemId: string; quantity: number }[];
  getCartInfo: (token: string) => Promise<void>;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  updateItem: async (itemId, quantity, imageUrl, price, productName, token) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR}/shopping/cart?itemId=${itemId}&quantity=${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `${quantity} ${res?.data?.message}` || "Item added/updated successfully"
      );

      set((state) => {
        const exists = state.cart.find((item) => item.itemId === itemId);
        if (exists) {
          // Update quantity only
          return {
            cart: state.cart.map((item) =>
              item.itemId === itemId ? { ...item, quantity } : item
            ),
          };
        } else {
          // Add new item with all details
          return {
            cart: [
              ...state.cart,
              { itemId, quantity, imageUrl, price, productName },
            ],
          };
        }
      });
    } catch (error) {
      console.error("Failed to update cart item:", error);
      toast.error("Error updating cart item");
    }
  },

  removeItem: async (itemId: string, quantity: number, token: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR}/shopping/cart?itemId=${itemId}&quantity=${quantity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local cart after successful deletion
      set((state) => ({
        cart: state.cart.filter((item) => item.itemId !== itemId),
      }));

      toast.success("Item removed from cart.");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Failed to remove item.");
    }
  },

  resetCart: () => set({ cart: [] }),
  getCartSummary: () => {
    return get().cart.map(({ itemId, quantity }) => ({ itemId, quantity }));
  },
  getCartInfo: async (token) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR}/shopping/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const items = res.data.data.items || [];

      // Assuming items have itemId, quantity, imageUrl (adjust if needed)
      const mappedItems: CartItem[] = items.map((item: CartItem) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        imageUrl: item.imageUrl || "",
        price: item.price,
      }));

      set({ cart: mappedItems });
    } catch (error) {
      console.error("Failed to fetch cart info:", error);
      toast.error("Unable to load cart items.");
    }
  },
  getSubtotal: () => {
    return get().cart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  },
}));
