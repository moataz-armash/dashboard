"use server";

import { cookies } from "next/headers";
import StoresCards from "./components/stores-component";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

export default async function getStores() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const res = await apiRequest("/store/stores", token);
  const data = await res.json();

  return <StoresCards stores={data.data} />;
}
