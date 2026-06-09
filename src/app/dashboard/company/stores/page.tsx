"use server";

import { cookies } from "next/headers";
import StoresCards from "./components/stores-component";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function getStores({ searchParams }: Props) {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 0;

  const res = await apiRequest(`/company/store/stores?page=${page}&size=6`, token);

  console.log("Stores API response:", JSON.stringify(res, null, 2));

  return <StoresCards data={res} currentPage={page}/>;
}
