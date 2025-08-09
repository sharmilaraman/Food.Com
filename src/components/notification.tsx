"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Notification() {
  const showNotification = useSelector(
    (state: RootState) => state.cart.showNotification
  );

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
