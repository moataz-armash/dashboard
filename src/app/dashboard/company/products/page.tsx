import { apiRequest } from "@/utils/api";
import ProductsClient from "./products-client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import CompanyHeader from "@/components/ui/company-header";

interface Props {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const { page: pageParam, search = "", category = "" } = await searchParams;
  const page = Number(pageParam) || 0;

  const query = new URLSearchParams({ page: String(page), size: "6" });
  if (category) query.set("category", category);

  const res = await apiRequest(`/company/product/products?${query.toString()}`, token);
  console.log("[Products] full response:", JSON.stringify(res).slice(0, 500));

  return (
    <div className="px-6 flex flex-col gap-4">
      <CompanyHeader title="Products Managment" />
      <Suspense fallback={<Spinner className="text-gray-500 h-7 w-7" />}>
        <ProductsClient res={res} currentPage={page} search={search} category={category} />
      </Suspense>
    </div>
  );
}
