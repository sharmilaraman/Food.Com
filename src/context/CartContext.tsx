"use client";

import React, { createContext, useContext, useReducer, ReactNode, useState } from "react";
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
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: item.quantity + action.payload.quantity, totalPrice: (item.quantity + action.payload.quantity) * item.price }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
          total: state.total + action.payload.totalPrice,
        };
      }

    case "REMOVE_ITEM":
      const filteredItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.totalPrice, 0),
      };

    case "UPDATE_QUANTITY":
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity, totalPrice: action.payload.quantity * item.price }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number, size: string) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [showNotification, setShowNotification] = useState(false);
  const addItem = (product: Product, quantity: number, size: string) => {
  const sizeOption = product.options?.find((option) => option.title === size);
  const additionalPrice = sizeOption?.additionalPrice || 0;
  const totalPrice = (product.price + additionalPrice) * quantity;

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        img: product.img,
        price: product.price + additionalPrice,
        quantity,
        size,
        totalPrice,
      },
    });

    // Show notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ 
      state, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      showNotification, 
      setShowNotification 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}; 