"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCartStore } from "./cart-stores";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: number; // productId
  name: string;
  price?: number;
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
}: ProductCardProps) {
  const router = useRouter();

  const handleProductClick = () => {
    // Redirect to the product details page with itemId as query parameter
    router.push(`/product?itemId=${id}`);
  };
  return (
    <Card
      className="w-full max-w-sm shadow-lg rounded-2xl overflow-hidden"
      onClick={handleProductClick}
    >
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
          <h2 className="text-lg text-center font-semibold">{name}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
