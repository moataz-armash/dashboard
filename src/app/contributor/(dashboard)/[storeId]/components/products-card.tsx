"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // from shadcn
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  buttonTitle?: string;
}

export default function ProductsCard({
  id,
  name,
  price,
  image,
  buttonTitle = "Add",
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

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

          {quantity > 0 ? (
            <Button variant="destructive" onClick={() => setQuantity(0)}>
              Delete
            </Button>
          ) : (
            <Button onClick={()=>{}} className="bg-brand hover:bg-brand-700">{buttonTitle}</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
