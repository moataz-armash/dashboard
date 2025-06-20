"use client";
import BackLink from "@/components/ui/back-link";
import ProductsCard from "./components/products-card";
import { Product } from "./components/type";
import { defaultProductImg } from "@/lib/constants";
import { getImage } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";

interface StoreClientDetailsProps {
  products: Product[];
  contToken: string;
  currentPage: number;
  res: Promise<any>;
}

export default function StoreClientDetails({
  products,
  contToken,
  currentPage,
  res,
}: StoreClientDetailsProps) {
  const router = useRouter();
  const totalPages = Math.ceil(res?.total / res?.size) || 1;

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(newPage));
    router.push(`?${searchParams.toString()}`);
  };
  console.log(products);
  return (
    <div className="flex flex-col mt-4">
      <BackLink title="All Stores" link="/contributor" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products ? (
          <>
            {products?.map((product) => (
              <ProductsCard
                key={product.itemId}
                id={product.itemId}
                price={product.price}
                name={product.productName}
                image={getImage(product.imageUrl) || defaultProductImg}
                contToken={contToken}
              />
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />{" "}
          </>
        ) : (
          <p className="text-yellow-500 col-span-4 text-center">
            This Store doesnt have any product yet, Browse another one😁
          </p>
        )}
      </div>
    </div>
  );
}
