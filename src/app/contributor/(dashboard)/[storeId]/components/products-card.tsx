"use client";

import { useState } from "react";
import Image from "next/image";
import { defaultProductImg } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCartStore } from "./cart-stores";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  storeId: string;
  contToken: string;
  availableQuantity?: number;
}

export default function ProductsCard({
  id,
  name,
  image,
  storeId,
  contToken,
  price,
  availableQuantity = 0,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const [imgSrc, setImgSrc] = useState(image);
  const { updateItem } = useCartStore();

  const inStock = availableQuantity > 0;
  const increaseQty = () => setQuantity((q) => Math.min(q + 1, availableQuantity));
  const decreaseQty = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

  const handleAddToCart = () => {
    if (quantity > 0) {
      updateItem(id, quantity, image, price, name, contToken);
      setQuantity(0);
    }
  };
  return (
    <Card className="w-full shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="p-0 relative">
        <Image
          src={imgSrc}
          alt={name}
          width={400}
          height={250}
          className="object-cover w-full h-24 rounded-xl p-2"
          priority
          onError={() => setImgSrc(defaultProductImg)}
        />
        {/* Stock badge */}
        <div className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
          inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
        }`}>
          {inStock ? `${availableQuantity} in stock` : "Out of stock"}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex gap-1 justify-between items-start">
          <h2 className="text-sm font-semibold leading-tight">{name}</h2>
          <h3 className="text-sm font-medium whitespace-nowrap">{price} $</h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseQty}
              disabled={quantity === 0 || !inStock}
            >
              −
            </Button>
            <span className="w-5 text-center text-sm">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={increaseQty}
              disabled={!inStock || quantity >= availableQuantity}
            >
              +
            </Button>
          </div>
          {quantity > 0 && inStock && (
            <Button
              onClick={handleAddToCart}
              className="bg-brand hover:bg-brand-700 text-sm"
            >
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
