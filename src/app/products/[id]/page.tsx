"use client"
import Price from "@/components/price";
import { allProducts } from "@/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const SingleProductPage = () => {
  const params = useParams();
  const id = Number(params?.id);
  const product = allProducts.find((item) => item.id === id);

  if (!product) {
    return <div className="p-8 text-red-500">Product not found.</div>;
  }

  return (
    <div className="p-4 lg:px-20  h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {product.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={product.img}
            alt={product.title}
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{product.title}</h1>
        <p>{product.desc}</p>
        <Price price={product.price} id={product.id} options={product.options} product={product}/>
      </div>
    </div>
  );
};

export default SingleProductPage;