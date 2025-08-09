"use client";
import { pizzas, burgers, pastas } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import type { Product } from "@/data";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/cartSlice";

const CategoryPage = () => {
  const params = useParams();
  const { category } = params;

  let items: Product[] = [];
  if (category === "pizzas") {
    items = pizzas;
  } else if (category === "burgers") {
    items = burgers;
  } else if (category === "pastas") {
    items = pastas;
  }

  const dispatch = useDispatch();

  const handleAddToCart = (item: Product) => {
    dispatch(addItem({ product: item, quantity: 1, size: "Small" }));
  };

  return (
    <div className="flex flex-wrap text-red-500">
      {items.map((item) => (
        <div className="w-full h-[60vh] sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50" key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Link href={`/products/${item.id}`}>
                <Image src={item.img} alt="" fill className="object-contain"/>
              </Link>
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button
              className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>   





  );  
};

export default CategoryPage;
