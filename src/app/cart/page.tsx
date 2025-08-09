"use client";

import Image from "next/image";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeItem, updateQuantity } from "@/redux/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  console.log("Cart items:", items);
  console.log("Cart total:", total);
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const serviceCost = 0;
  const deliveryCost = 0;
  const totalWithVAT = total + serviceCost + deliveryCost;

  if (items.length === 0) {
    return (
      <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col items-center justify-center text-red-500">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-lg">Add some delicious items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20">
        {items.map((item) => (
          <div
            className="flex gap-2 items-center md:justify-between mb-4"
            key={`${item.id}-${item.size}`}
          >
            <Image
              src={item.img || "/products/p1.png"}
              alt=""
              width={100}
              height={100}
            />
            <div>
              <h1 className="uppercase text-md md:text-xl font-bold">
                {item.title}
              </h1>
              <span>{item.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
            <h2 className="font-bold">${item.totalPrice.toFixed(2)}</h2>
            <button
              className="cursor-pointer text-red-500 hover:text-red-700 font-bold"
              onClick={() => handleRemoveItem(item.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>${serviceCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>TOTAL(INCL. VAT)</span>
          <span className="font-bold">${totalWithVAT.toFixed(2)}</span>
        </div>
        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end hover:bg-red-600 transition-colors">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
