"use client";

import {
  ShoppingCart,
  SidebarCloseIcon,
  SidebarOpenIcon,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Image from "next/image";
import { useCartStore } from "../[storeId]/components/cart-stores";
import { getImage } from "@/lib/helpers";
import { defaultProductImg } from "@/lib/constants";
import toast from "react-hot-toast";

// const items = [
//   { id: 1, name: "product 1", img: A101, price: 2150, quantity: 1 },
//   { id: 2, name: "product 2", img: Bim, price: 2150, quantity: 1 },
//   { id: 3, name: "product 3", img: Sok, price: 2150, quantity: 1 },
//   { id: 4, name: "product 3", img: Sok, price: 2150, quantity: 1 },
//   { id: 5, name: "product 3", img: Sok, price: 2150, quantity: 1 },
// ];

const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Sidebar() {
  const cart = useCartStore((state) => state.cart);
  const { getCartInfo, getSubtotal, changeQuantity, deleteItem } =
    useCartStore();
  const [totalQty, setTotalQty] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const contToken = Cookies.get("contToken");

  useEffect(() => {
    getCartInfo(contToken);
  }, [getCartInfo, contToken]);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQty(total);
  }, [cart]);

  console.log(cart);

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
          {totalQty && (
            <div className="absolute -top-1 left-3 flex items-center justify-center min-w-[20px] h-[20px] px-1 py-0.5 rounded-full bg-orangebrand text-white text-xs font-semibold border border-white shadow-sm">
              {totalQty}
            </div>
          )}
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
          <div className="flex flex-col gap-2 justify-center items-center">
            <Link
              href="/contributor/cart"
              onClick={() => setIsOpen(false)}
              className="bg-orangebrand flex flex-col items-center rounded-xl p-2"
            >
              <p className="text-[12px] text-white font-semibold">
                Go to Cart{" "}
              </p>
              <p className="text-[10px] text-white"> ({totalQty} items)</p>
            </Link>
            <h4 className="font-semibold text-sm">Subtotal</h4>
            <span className="inline-flex items-center w-fit rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600 ring-1 ring-orangebrand ring-inset">
              {getSubtotal().toFixed(2)} $
            </span>
            <hr className="w-[80%] h-6" />
          </div>
          <div className="overflow-y-auto custom-scrollbar">
            {cart.map((item) => (
              <div className="p-2" key={item.itemId}>
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={getImage(item.imageUrl) || defaultProductImg}
                    alt={item.productName || "product name"}
                    width={48}
                    height={48}
                    className="object-contain rounded-md"
                  />
                  <p className="text-orange-600 font-semibold text-xs mt-1">
                    {item.price} $
                  </p>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <form className="max-w-sm mx-auto">
                    <select
                      id="quantity"
                      value={item.quantity}
                      onChange={async (e) => {
                        const newQty = parseInt(e.target.value);
                        changeQuantity(item, newQty, contToken);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-orangebrand focus:border-orangebrand block w-full px-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orangebrand dark:focus:border-orangebrand"
                    >
                      {quantityArray.map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </form>
                  <Trash
                    className="text-gray-900 cursor-pointer"
                    size={16}
                    onClick={() =>
                      deleteItem(item.itemId, item.quantity, contToken)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className="bg-gray-200 justify-evenly items-center rounded-xl flex p-2 cursor-pointer"
            onClick={toggleDrawer}
          >
            <button className="text-xs font-semibold text-gray-700 outline-none focus:outline-none">
              Close
            </button>
            <SidebarOpenIcon size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
