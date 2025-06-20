import A101 from "@/assets/a101.jpg";
import Bim from "@/assets/Bim_(company)_logo.svg.png";
import Sok from "@/assets/sok_market.png";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import PaymentSummery from "./payment-summery";
import { useCartStore } from "../../[storeId]/components/cart-stores";
import { getImage } from "@/lib/helpers";
import { defaultProductImg } from "@/lib/constants";

const items = [
  { id: 1, name: "product 1", img: A101, price: 2150, quantity: 1 },
  { id: 2, name: "product 2", img: Bim, price: 2150, quantity: 1 },
  { id: 3, name: "product 3", img: Sok, price: 2150, quantity: 1 },
];

interface CartProgressProps {
  goNext: () => void;
}

export default function CartProgress({ goNext }: CartProgressProps) {
  const { cart, getTotal } = useCartStore();
  const cartItems = cart.length;
  console.log(cartItems);
  return (
    <div className="grid grid-cols-6 space-x-4 p-8">
      <div className="col-span-4">
        <div className="flex justify-between p-4">
          <h1 className="font-semibold">My Cart ({cartItems})</h1>

          <h4>Total: {getTotal()}$</h4>
        </div>
        <div className="bg-gray-100 w-full h-auto p-4 rounded-lg gap-8">
          {cart.map((item) => (
            <div key={item.itemId} className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Image
                    src={getImage(item.imageUrl) || defaultProductImg}
                    alt={item.productName}
                    className="object-contain rounded-full"
                    width={24}
                    height={24}
                  />
                  <span className="font-semibold text-sm">
                    {item.productName}
                  </span>
                </div>
                <div className="border-2 p-1 border-bg-gray-300 flex gap-6 items-center">
                  <Minus
                    size={12}
                    className="cursor-pointer hover:bg-gray-300 hover:rounded-full text-black"
                  />
                  <span>{item.quantity}</span>
                  <Plus
                    size={12}
                    className="cursor-pointer hover:bg-gray-300 hover:rounded-full text-black"
                  />
                </div>
                <p className="font-bold">{item.price}$</p>
              </div>
              <hr className="bg-gray-800 mt-2" />
            </div>
          ))}
        </div>
      </div>
      <PaymentSummery goNext={goNext} />
    </div>
  );
}
