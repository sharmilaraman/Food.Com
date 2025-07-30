"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

const CartIcon = () => {
  const { state } = useCart();
  const itemCount = state.items.length;

  return (
    <Link href="/cart" className="flex items-center gap-2">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt="" fill />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
      <span>Cart({itemCount})</span>
    </Link>
  )
}

export default CartIcon
 