"use client";
"use client";
import BackLink from "@/components/ui/back-link";
import ProductsCard from "./components/products-card";
import { Product } from "./components/type";
import { defaultProductImg } from "@/lib/constants";
import { getImage } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import { PackageSearch, RefreshCw } from "lucide-react";
import { useState } from "react";

interface StoreClientDetailsProps {
  products: Product[];
  contToken: string;
  currentPage: number;
  res: any;
  storeId: string;
}

export default function StoreClientDetails({
  products,
  contToken,
  currentPage,
  res,
  storeId,
}: StoreClientDetailsProps) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const totalPages = res?.totalPages || Math.ceil((res?.total ?? 0) / (res?.size ?? 8)) || 1;

  const handleRefresh = () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(newPage));
    router.push(`?${searchParams.toString()}`);
  };
  console.log(products);
  return (
    <div className="flex flex-col mt-4">
      <div className="flex items-center justify-between px-4">
        <BackLink title="All Stores" link="/contributor" />
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          Refresh stock
        </button>
      </div>
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
                storeId={storeId}
                availableQuantity={product.availableQuantity ?? 0}
              />
            ))}
            <div className="col-span-4">
              
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              />{" "}
              </div>
          </>
        ) : (
          <div className="col-span-4 flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <PackageSearch className="w-12 h-12 mb-3 text-gray-300" />
            <p className="font-semibold text-gray-600">No products in this store yet</p>
            <p className="text-sm text-gray-400 mt-1">Try browsing another store.</p>
          </div>
        )}
      </div>
    </div>
  );
}
