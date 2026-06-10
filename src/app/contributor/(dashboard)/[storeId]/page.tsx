import { apiRequest } from "@/utils/api";
import StoreClientDetails from "./store-client-details";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface StoreClientDetails {
  params: Promise<{ storeId: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function StoreDetails({
  params,
  searchParams,
}: StoreClientDetails) {
  const { storeId } = await params;
  const contCookies = await cookies();
  const contToken = contCookies.get("contToken")?.value;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 0;

  if (!contToken) redirect("/contributor/login");

  // Fetch contributor shopping products and inventory in parallel
  const [res, inventoryRes] = await Promise.all([
    apiRequest(
      `/contributor/shopping/products?strId=${storeId}&page=${page}&size=8`,
      contToken,
      "GET",
      process.env.API_BASE_URL_GATEWAY
    ),
    apiRequest(
      `/inventory/get?strId=${storeId}`,
      contToken,
      "GET",
      process.env.API_BASE_URL_GATEWAY
    ),
  ]);

  // Build a map of itemId → real quantity from inventory service
  const inventoryMap: Record<string, number> = {};
  for (const item of inventoryRes?.data ?? []) {
    inventoryMap[item.id] = item.quantity ?? 0;
  }

  // Merge: override availableQuantity with real inventory quantity
  const products = (res?.data ?? []).map((p: any) => ({
    ...p,
    availableQuantity: inventoryMap[p.itemId] ?? p.availableQuantity ?? 0,
  }));

  return (
    <StoreClientDetails
      products={products}
      contToken={contToken}
      currentPage={page}
      res={res}
      storeId={storeId}
    />
  );
}
