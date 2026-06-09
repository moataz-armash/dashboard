"use server";
import { cookies } from "next/headers";
import SupplyMoreClient from "./supplyMoreClient";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function SupplyMorePage({ searchParams }: Props) {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 0;

  const res = await apiRequest(`/company/product/products?page=${page}&size=8`, token);
  console.log("[SupplyMore] products response:", JSON.stringify(res).slice(0, 300));

  return (
    <SupplyMoreClient products={res?.data || []} currentPage={page} token={token} res={res} />
  );
}
