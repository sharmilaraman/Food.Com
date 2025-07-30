"use client"
import { useCart } from "@/context/CartContext";

export default function Notification() {
  const { showNotification } = useCart();

  return (
    <>
      <div className='h-12 bg-red-500 text-white px-4 flex items-center justify-center text-center text-sm md:text-base cursor-pointer'>
        Free delivery for all orders over $50. Order your food now!
      </div>
      {showNotification && (
        <div className='fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-bounce'>
          Item added to cart! 🛒
        </div>
      )}
    </>
  )
}
   