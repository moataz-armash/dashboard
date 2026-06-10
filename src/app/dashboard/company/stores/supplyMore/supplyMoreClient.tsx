"use client";

import { defaultProductImg } from "@/lib/constants";
import { getImage } from "@/lib/helpers";
import { Product } from "./components/type";
import ProductsCard from "./components/products-card";
import Pagination from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcurmb";
import { getStoreBreadcrumbs } from "@/lib/breadcrumb-utils";
import { PackageSearch } from "lucide-react";

interface SupplyMoreClientProps {
  products: Product[];
  currentPage: number;
  token: string;
  res: any;
}

export default function SupplyMoreClient({
  products,
  token,
  currentPage,
  res,
}: SupplyMoreClientProps) {
  const router = useRouter();
  const totalPages = res?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(newPage));
    router.push(`?${searchParams.toString()}`);
  };

  const searchParams = useSearchParams();
  const storeName = searchParams.get("storeName") || "";
  const storeId = searchParams.get("storeId") || "";

  const crumbs = getStoreBreadcrumbs({
    storeName,
    storeId,
    currentPageLabel: "Supply More",
  });

  return (
    <>
      <Breadcrumb items={crumbs} className="px-10 pt-4" />

      {products?.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 p-8">
          {products.map((product) => (
            <ProductsCard
              buttonTitle="Supply"
              key={product.id}
              id={product.id}
              name={product.name}
              image={getImage(product.images?.[0]) || defaultProductImg}
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
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
          <PackageSearch className="w-14 h-14 mb-4 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-600">No products available to supply</h2>
          <p className="text-sm mt-1 max-w-xs">
            You need to create products first before supplying them to a store.
            Go to{" "}
            <button
              onClick={() => router.push("/dashboard/company/products")}
              className="text-brand-500 hover:text-brand-600 font-medium hover:underline cursor-pointer"
            >
              Products
            </button>{" "}
            to add some.
          </p>
        </div>
      )}
    </>
  );
}
