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
  addToCartWithLimit: (
    itemId: string,
    quantityToAdd: number,
    imageUrl: string,
    price: number,
    productName: string,
    token: string
  ) => Promise<void>;
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
    imageUrl: string,
    price: number,
    productName: string,
    token: string
  ) => Promise<void>;
  deleteItem: (
    itemId: string,
    quantity: number,
    token: string
  ) => Promise<void>;
  changeQuantity: (
    item: CartItem,
    newQty: number,
    token: string
  ) => Promise<void>;
  resetCart: () => void;
  getCartSummary: () => { itemId: string; quantity: number }[];
  getCartInfo: (token: string) => Promise<void>;
  getSubtotal: () => number;
  getTax: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCartWithLimit: async (
    itemId: string,
    quantityToAdd: number,
    imageUrl: string,
    price: number,
    productName: string,
    token: string
  ) => {
    const existingItem = get().cart.find((item) => item.itemId === itemId);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newTotal = currentQuantity + quantityToAdd;

    if (newTotal > 10) {
      toast.error("You can't add more than 10 of this product.");
      return;
    }

    await get().updateItem(
      itemId,
      newTotal,
      imageUrl,
      price,
      productName,
      token
    );

    await get().getCartInfo(token);
  },

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

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data ||
          "Error updating cart item";
        toast.error(message);
      } else {
        toast.error("Unexpected error occurred");
      }
    }
    await get().getCartInfo(token);
  },

  removeItem: async (
    itemId: string,
    quantity: number,
    imageUrl: string,
    price: number,
    productName: string,
    token: string
  ) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR}/shopping/cart?itemId=${itemId}&quantity=${quantity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

      toast.success(`${quantity} ${productName} extracted from cart.`);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Failed to remove item.");
    }
  },

  deleteItem: async (itemId: string, quantity: number, token: string) => {
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

      toast.success("Selected item removed from cart.");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Failed to remove item.");
    }
  },

  changeQuantity: async (item: CartItem, newQty: number, token: string) => {
    const prevQty = item.quantity;
    const diff = newQty - prevQty;

    if (diff === 0) return;

    if (diff > 0) {
      await get().updateItem(
        item.itemId,
        diff,
        item.imageUrl,
        item.price,
        item.productName,
        token
      );
    } else {
      await get().removeItem(
        item.itemId,
        Math.abs(diff),
        item.imageUrl,
        item.price,
        item.productName,
        token
      );
    }

    await get().getCartInfo(token); // sync UI after update
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
        productName: item.productName,
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
  getTax: () => {
    const subtotal = get().getSubtotal();
    const TAX_RATE = 0.18; // 18%
    return parseFloat((subtotal * TAX_RATE).toFixed(2));
  },

  getDiscount: () => {
    // You can later enhance this to be dynamic
    return 0;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const tax = get().getTax();
    const discount = get().getDiscount();
    return parseFloat((subtotal + tax - discount).toFixed(2));
  },
}));
