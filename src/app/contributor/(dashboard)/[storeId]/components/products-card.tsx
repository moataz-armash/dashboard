"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCartStore } from "./cart-stores";

interface ProductCardProps {
  id: string; // productId
  name: string;
  price: number;
  image: string;
  buttonTitle?: string;
  storeId: string; // <- required to send the request
  contToken: string;
}

export default function ProductsCard({
  id,
  name,
  image,
  storeId,
  contToken,
  price,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const { updateItem } = useCartStore();

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

  const handleAddToCart = () => {
    if (quantity > 0) {
      updateItem(id, quantity, image, price, name, contToken);
      setQuantity(0);
    }
  };
  return (
    <Card className="w-full shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={image}
          alt={name}
          width={400}
          height={250}
          className="object-contain w-full h-24"
          priority
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex gap-1 justify-between">
          <h2 className="text-lg font-semibold">{name}</h2>
          <h3 className="text-lg font-medium">{price} $</h3>
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
            <Button
              variant="outline"
              onClick={increaseQty}
              disabled={quantity >= 10}
            >
              +
            </Button>
          </div>
          {quantity > 0 && (
            <Button
              onClick={handleAddToCart}
              className="bg-brand hover:bg-brand-700"
            >
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
