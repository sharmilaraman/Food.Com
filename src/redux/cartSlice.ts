import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/data";

export interface CartItem {
  id: number;
  title: string;
  img?: string;
  price: number;
  quantity: number;
  size: string;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  showNotification: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  showNotification: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ product: Product; quantity: number; size: string }>
    ) => {
      console.log("Adding item to cart:", action.payload);
      const { product, quantity, size } = action.payload;
      const sizeOption = product.options?.find((option) => option.title === size);
      const additionalPrice = sizeOption?.additionalPrice || 0;
      const price = product.price + additionalPrice;
      const totalPrice = price * quantity;

      const existingItem = state.items.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + quantity;
        existingItem.totalPrice = existingItem.quantity * price;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          img: product.img,
          price,
          quantity,
          size,
          totalPrice,
        });
      }
      state.total = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      state.showNotification = true;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity, totalPrice: action.payload.quantity * item.price }
          : item
      );
      state.total = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setShowNotification: (state, action: PayloadAction<boolean>) => {
      state.showNotification = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setShowNotification,
} = cartSlice.actions;

export default cartSlice.reducer;