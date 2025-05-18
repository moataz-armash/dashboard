"use server";

import { cookies } from "next/headers";
import StoresCards from "./components/stores-component";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

interface Props {
  searchParams: { page?: string };
}

export default async function getStores({ searchParams }: Props) {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const page = Number(searchParams.page) || 0;

  const res = await apiRequest(`/store/stores?page=${page}&size=6`, token);

  return <StoresCards data={res} currentPage={page}/>;
}
