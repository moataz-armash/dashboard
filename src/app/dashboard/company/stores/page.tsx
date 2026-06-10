"use server";

import { cookies } from "next/headers";
import StoresCards from "./components/stores-component";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

interface Props {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}

export default async function getStores({ searchParams }: Props) {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const { page: pageParam, search = "", status = "" } = await searchParams;
  const page = Number(pageParam) || 0;

  const query = new URLSearchParams({ page: String(page), size: "6" });
  if (status) query.set("status", status);

  const res = await apiRequest(`/company/store/stores?${query.toString()}`, token);

  return <StoresCards data={res} currentPage={page} search={search} status={status} />;
}
