"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/cartSlice";
import { Product } from "@/data";

type Props = {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
  product: Product;
};

const Price = ({ price, id, options, product }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotal(
      quantity * (options ? price + options[selected].additionalPrice : price)
    );
  }, [quantity, selected, options, price]);

  const handleAddToCart = () => {
    const selectedSize = options ? options[selected].title : "Regular";
    dispatch(addItem({ product, quantity, size: selectedSize }));
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total.toFixed(2)}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[5rem] md:min-w-[6rem] p-1 md:p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selected === index ? "#FF474C" : "white",
              color: selected === index ? "white" : "#FF0000",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center text-sm">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"-"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {"+"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button
          className="uppercase text-sm w-56 bg-red-500 text-white p-3 ring-1 ring-red-500 hover:bg-red-600 transition-colors"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
