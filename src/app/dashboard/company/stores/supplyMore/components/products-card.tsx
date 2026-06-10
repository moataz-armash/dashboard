"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { PackageCheck } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  buttonTitle?: string;
  storeId: string;
  token: string;
}

export default function ProductsCard({
  id,
  name,
  image,
  buttonTitle = "Supply",
  token,
}: ProductCardProps) {
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");

  // Persist supplied total in sessionStorage so it survives page refreshes
  const storageKey = `supplied_${storeId}_${id}`;
  const [quantity, setQuantity] = useState(0);
  const [suppliedTotal, setSuppliedTotal] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Number(sessionStorage.getItem(storageKey) ?? 0);
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (suppliedTotal > 0) {
      sessionStorage.setItem(storageKey, String(suppliedTotal));
    }
  }, [suppliedTotal, storageKey]);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

  const handleSupply = async () => {
    if (quantity === 0) return;
    setLoading(true);

    const body = {
      storeId,
      product_quantity: { [id]: quantity },
      note: "string",
      reason: "i need them immediatly",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_GATEWAY}/inventory/supply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json().catch(() => null);
      console.log(`[Supply] ${name} → status ${response.status}`, result);

      if (!response.ok) {
        toast.error(result?.message || "Supply request failed");
        return;
      }

      // Check if backend reported a logical failure inside a 200 response
      if (result?.status === false || result?.success === false) {
        toast.error(result?.message || "Supply was not applied");
        return;
      }

      setSuppliedTotal((prev) => prev + quantity);
      setQuantity(0);
      toast.success(`${name} supplied successfully`);
    } catch (error) {
      console.error("Error sending supply request:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="p-0 relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={250}
          className="object-cover w-full h-36 rounded-xl p-2"
        />
        {suppliedTotal > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            <PackageCheck className="w-3 h-3" />
            {suppliedTotal} supplied
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <h2 className="text-base font-semibold leading-tight">{name}</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={decreaseQty} disabled={quantity === 0}>
              −
            </Button>
            <span className="w-6 text-center font-medium">{quantity}</span>
            <Button variant="outline" size="sm" onClick={increaseQty}>
              +
            </Button>
          </div>
          {quantity > 0 && (
            <Button
              onClick={handleSupply}
              disabled={loading}
              className="bg-brand-500 hover:bg-brand-600 text-white text-sm"
            >
              {loading ? "Supplying…" : buttonTitle}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
