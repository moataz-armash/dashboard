import { apiRequest } from "@/utils/api";
import StoreClientDetails from "./store-client-details";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface StoreClientDetails {
  params: { storeId: string };
  searchParams: { page?: string };
}

export default async function StoreDetails({
  params,
  searchParams,
}: StoreClientDetails) {
  const storeId = params.storeId;
  const contCookies = await cookies();
  const contToken = contCookies.get("contToken")?.value;
  const page = Number(searchParams.page) || 0;

  console.log(storeId);

  if (!contToken) redirect("/contributor/login");

  const res = await apiRequest(
    `/shopping/products?strId=${storeId}?page=${page}&size=8`,
    contToken,
    "GET",
    process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR
  );
  console.log(res.data);
  return (
    <StoreClientDetails
      products={res.data}
      contToken={contToken}
      currentPage={page}
      res={res}
    />
  );
}
