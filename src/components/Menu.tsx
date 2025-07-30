"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const user= false;
  return (
    <div className="">
      {!open ? (
        <Image
          src="/open.png"
          alt="menu"
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          alt="menu"
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )}
      {open &&(
          <div className="bg-red-500 text-white left-0 top-24 absolute h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-xl z-10 w-full">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          <Link
              href={user ? "/orders" : "/login"}
              onClick={() => setOpen(false)}
            >
              {user ? "Orders" : "Login"}
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)}>
              <CartIcon />
            </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
