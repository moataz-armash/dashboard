"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface ProductCardProps {
  id: string; // productId
  name: string;
  image: string;
  buttonTitle?: string;
  storeId: string; // <- required to send the request
  token: string;
}

export default function ProductsCard({
  id,
  name,
  image,
  buttonTitle = "Supply",
  token,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

  console.log(id);

  const handleSupply = async () => {
    if (quantity === 0) return;

    const body = {
      storeId,
      product_quantity: {
        [id]: quantity, // productId as key
      },
      note: "string", // you can make this dynamic later
      reason: "i need them immediatly", // also can be dynamic
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_INVENTORY}/inventory/supply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        console.error("Supply request failed");
        toast.error(response.message || "Supply request failed");
        return;
      }

      const result = await response.json();
      console.log("Supply success:", result);

      // Optional: reset quantity
      setQuantity(0);
      toast.success(`${name} Supplied successfully`)
    } catch (error) {
      console.error("Error sending supply request:", error);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={image}
          alt={name}
          width={400}
          height={250}
          className="object-cover w-full h-36"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{name}</h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={decreaseQty}
              disabled={quantity === 0}
            >
              -
            </Button>
            <span className="px-2">{quantity}</span>
            <Button variant="outline" onClick={increaseQty}>
              +
            </Button>
          </div>
          {quantity > 0 && (
            <Button
              onClick={handleSupply}
              className="bg-brand hover:bg-brand-700"
            >
              {buttonTitle}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
