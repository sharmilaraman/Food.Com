"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setShowNotification } from "@/redux/cartSlice";
import React from "react";

export default function Notification() {
  const dispatch = useDispatch();
  const showNotification = useSelector(
    (state: RootState) => state.cart.showNotification
  );

  
  React.useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        dispatch(setShowNotification(false));
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [showNotification, dispatch]);

  return (
    <>
      <div className="h-12 bg-red-500 text-white px-4 flex items-center justify-center text-center text-sm md:text-base cursor-pointer">
        Free delivery for all orders over $50. Order your food now!
      </div>
      {showNotification && (
        <div className="fixed top-25 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-bounce">
          Item added to cart! 🛒
        </div>
      )}
    </>
  );
}
