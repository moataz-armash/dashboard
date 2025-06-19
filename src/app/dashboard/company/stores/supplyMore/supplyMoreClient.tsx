"use client";

import { defaultProductImg } from "@/lib/constants";
import { getImage } from "@/lib/helpers";
import { Product } from "./components/type";
import ProductsCard from "./components/products-card";
import Pagination from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

interface SupplyMoreClientProps {
  products: Product[];
  currentPage: number;
  token: string;
  res: Promise<any>;
}

export default function SupplyMoreClient({
  products,
  token,
  currentPage,
  res,
}: SupplyMoreClientProps) {
  const router = useRouter();
  const totalPages = Math.ceil(res?.total / res?.size) || 1;

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(newPage));
    router.push(`?${searchParams.toString()}`);
  };
  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      {products?.map((product) => (
        <ProductsCard
          buttonTitle="Supply"
          key={product.id}
          id={product.id}
          name={product.name}
          image={getImage(product.images[0]) || defaultProductImg}
          token={token}
        />
      ))}
      <div className="col-span-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
