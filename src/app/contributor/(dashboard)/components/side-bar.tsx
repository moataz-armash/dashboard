"use client";

import { Button } from "@/components/ui/button";
import {
  MoveLeft,
  MoveRight,
  ShoppingBag,
  ShoppingCart,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   selectedId: number | null;
// };

export default function Sidebar() {
  // const location = locations.find((loc) => loc.id === selectedId);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="h-screen flex items-center justify-center
    bg-gray-100"
    >
      <div className="fixed top-1/2 right-0 z-50 -translate-y-1/2 flex flex-col">
        <button
          onClick={toggleDrawer}
          className="bg-white text-white px-2 py-2 rounded-tl-lg 
        hover:bg-purblebrand group  transition-colors"
        >
          <ShoppingCart
            className="text-gray-800 group-hover:text-white relative"
            size={18}
          />
          <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1  dark:border-gray-900">
            8
          </div>
        </button>
        <button
          onClick={toggleDrawer}
          className="bg-white text-white px-2 py-2 rounded-bl-lg 
        hover:bg-purblebrand group  transition-colors"
        >
          <SidebarCloseIcon
            className="text-gray-800 group-hover:text-white relative"
            size={18}
          />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 w-24 h-full z-50 bg-white shadow-lg
            transition-transform transform ${
              isOpen ? "translate-x-0" : "translate-x-60"
            }`}
      >
        <div className="p-2 py-12 flex flex-col justify-between h-screen">
          <Link
            href="/contributor/cart"
            onClick={() => setIsOpen(false)}
            className="bg-orangebrand flex flex-col items-center rounded-xl p-2"
          >
            <p className="text-[12px] text-white font-semibold">Go to Cart </p>
            <p className="text-[10px] text-white"> (1 product)</p>
          </Link>

          <div className="bg-gray-200 justify-evenly items-center rounded-xl flex p-2">
            <button
              onClick={toggleDrawer}
              className="text-xs font-semibold text-gray-700 outline-none focus:outline-none"
            >
              Close
            </button>
            <SidebarOpenIcon size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
