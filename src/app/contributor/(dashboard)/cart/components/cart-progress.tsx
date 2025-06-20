import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import PaymentSummery from "./payment-summery";
import { useCartStore } from "../../[storeId]/components/cart-stores";
import { getImage } from "@/lib/helpers";
import { defaultProductImg } from "@/lib/constants";
import Cookies from "js-cookie";

interface CartProgressProps {
  goNext: () => void;
}

export default function CartProgress({ goNext }: CartProgressProps) {
  const { cart, getTotal, removeItem, updateItem, deleteItem } = useCartStore();
  const cartItems = cart.length;
  const contToken = Cookies.get("contToken");
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
                <div className="flex items-center gap-4">
                  <div className="border-2 p-1 border-bg-gray-300 flex gap-6 items-center">
                    <Minus
                      size={12}
                      className="cursor-pointer hover:bg-gray-300 hover:rounded-full text-black"
                      onClick={async () =>
                        await removeItem(
                          item.itemId,
                          1,
                          item.imageUrl,
                          item.price,
                          item.productName,
                          contToken
                        )
                      }
                    />
                    <span>{item.quantity}</span>
                    <Plus
                      size={12}
                      className="cursor-pointer hover:bg-gray-300 hover:rounded-full text-black"
                      onClick={async () =>
                        await updateItem(
                          item.itemId,
                          1,
                          item.imageUrl,
                          item.price,
                          item.productName,
                          contToken
                        )
                      }
                    />
                  </div>
                  <Trash
                    className="text-gray-900 cursor-pointer"
                    size={16}
                    onClick={() =>
                      deleteItem(item.itemId, item.quantity, contToken)
                    }
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
