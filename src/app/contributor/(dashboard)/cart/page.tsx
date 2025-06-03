import { Button } from "@/components/ui/button";
import {
  CircleCheckBig,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import A101 from "@/assets/a101.jpg";
import Bim from "@/assets/Bim_(company)_logo.svg.png";
import Sok from "@/assets/sok_market.png";
import Image from "next/image";

const progressBar = [
  { id: 1, name: "Cart", icon: ShoppingBag, step: 1, active: true },
  { id: 2, name: "Payment", icon: CreditCard, step: 2, active: false },
  { id: 3, name: "Success", icon: CircleCheckBig, step: 3, active: false },
];

const items = [
  { id: 1, name: "product 1", img: A101, price: 2150, quantity: 1 },
  { id: 2, name: "product 2", img: Bim, price: 2150, quantity: 1 },
  { id: 3, name: "product 3", img: Sok, price: 2150, quantity: 1 },
];

export default async function CartPage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-2 pt-6">
        {progressBar.map((item) => (
          <span key={item.id} className="flex gap-1 items-center">
            <>
              <span
                className={`${
                  item.step === 1
                    ? "hidden"
                    : "h-[2px] w-32 bg-gray-300 rounded-full"
                }`}
              ></span>
              <item.icon
                size={36}
                className={`rounded-full p-1 ${
                  item.active === true
                    ? "text-white bg-orangebrand"
                    : "text-gray-300"
                }`}
              />
            </>
            <span className="font-medium">{item.name}</span>
          </span>
        ))}
      </div>
      <div className="grid grid-cols-6 space-x-4 p-8">
        <div className="col-span-4">
          <div className="flex justify-between p-4">
            <h1 className="font-semibold">My Cart (3)</h1>

            <h4>Total: 2150$</h4>
          </div>
          <div className="bg-gray-100 w-full h-auto p-4 rounded-lg gap-8">
            {items.map((item) => (
              <>
                <div
                  className="flex justify-between items-center"
                  key={item.id}
                >
                  <div className="flex gap-4">
                    <Image
                      src={item.img}
                      alt={item.name}
                      className="object-contain rounded-full"
                      width={24}
                      height={24}
                    />
                    <span className="font-semibold text-sm">{item.name}</span>
                  </div>
                  <div className="border-2 p-2 border-bg-gray-300 flex gap-6 items-center">
                    <Minus size={16} className="cursor-pointer" />
                    <span>{item.quantity}</span>
                    <Plus size={16} className="cursor-pointer" />
                  </div>
                  <p className="font-bold">{item.price}$</p>
                </div>
                <hr className="bg-gray-800" />
              </>
            ))}
          </div>
        </div>
        <div className="col-span-2 bg-gray-100 h-auto flex flex-col rounded-lg p-4">
          <h1 className="font-semibold">Payment Summery</h1>
          <div className="flex justify-between p-2">
            <span>Total MRP</span>
            <span>2150.00$</span>
          </div>
          <hr className="bg-gray-800" />
          <div className="flex justify-between p-2">
            <span>Total MRP</span>
            <span>2150.00$</span>
          </div>
          <hr className="bg-gray-800" />
          <div className="flex justify-between p-2">
            <span>Total MRP</span>
            <span>2150.00$</span>
          </div>
          <hr className="bg-gray-800" />
          <div className="flex justify-between p-2">
            <span>Total MRP</span>
            <span>2150.00$</span>
          </div>
          <hr className="bg-gray-800" />
          <div className="flex justify-between p-2">
            <span className="font-bold">Total</span>
            <span className="font-bold">2150.00$</span>
          </div>
          <Button className="bg-orangebrand rounded-xl w-full uppercase">
            Place order
          </Button>
        </div>
      </div>
    </div>
  );
}
