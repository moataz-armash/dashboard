"use client";

import { defaultProductImg } from "@/lib/constants";
import { getImage } from "@/lib/helpers";
import { Product } from "./components/type";
import ProductsCard from "./components/products-card";
import Pagination from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcurmb";
import { getStoreBreadcrumbs } from "@/lib/breadcrumb-utils";

const crumbs = [
  { label: "All Stores", href: "/dashboard/company/stores" },
  {
    label: "Serdivan",
    href: "/dashboard/company/stores/681f5e22e355c22e3401730e",
  },
  { label: "Supply More", active: true },
];

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

  const searchParams = useSearchParams();
  const storeName = searchParams.get("storeName") || "";
  const storeId = searchParams.get("storeId") || "";

  const crumbs = getStoreBreadcrumbs({
    storeName: storeName,
    storeId: storeId,
    currentPageLabel: "Supply More",
  });
  return (
    <>
      <Breadcrumb items={crumbs} className="px-10 pt-4" />
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
    </>
  );
}
