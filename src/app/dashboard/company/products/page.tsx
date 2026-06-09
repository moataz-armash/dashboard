import { apiRequest } from "@/utils/api";
import ProductsClient from "./products-client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import CompanyHeader from "@/components/ui/company-header";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 0;

  const productsPromise = apiRequest(`/company/product/products?page=${page}&size=6`, token);

  // const products = await res;
  return (
    <div className="px-6 flex flex-col gap-4">
      <CompanyHeader title="Products Managment" />
      <Suspense fallback={<Spinner className="text-gray-500 h-7 w-7" />}>
        <ProductsClient productsPromise={productsPromise} currentPage={page} />
      </Suspense>
    </div>
  );
}
