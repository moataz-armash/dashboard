"use server";
import { cookies } from "next/headers";
import SupplyMoreClient from "./supplyMoreClient";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

interface Props {
  searchParams: { page?: string };
}

export default async function SupplyMorePage({ searchParams }: Props) {
  const userCookies = cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const page = Number(searchParams.page) || 0;

  const res = await apiRequest(`/product/products?page=${page}&size=6`, token);
  console.log(res.data);
  return <SupplyMoreClient products={res.data} currentPage={page} />;
}
