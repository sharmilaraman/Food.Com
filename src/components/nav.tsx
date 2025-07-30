import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { Phone } from "lucide-react";
import Image from "next/image";
const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-red-500 p-4  flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-15 lg:px-20 ">
      {/* LEFT LINKS */}
     
      {/* LOGO */}
      <div className="flex items-center gap-2 text-xl md:font-bold flex-1 ">
        <Link href="/" className="flex items-center gap-2">
          <span>
            <Image
              src='/logo.avif'
              alt="image"
              width={50}
              height={50}
              className="w-[25px] h-[25px] md:w-[50px] md:h-[50px]"
            />
          </span>
          <span className="font-bold text-2xl">FOOD.Com</span>
        </Link>
      </div>
   
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
      <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <Link href="/orders">Orders</Link>
        )}
        <CartIcon />
      </div>
         
      {/* MOBILE MENU */}
     
      <div className="md:hidden">
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;