import { apiRequest } from "@/utils/api";
import StoreClientDetails from "./store-client-detaiils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface StoreClientDetails {
  params: { storeId: string };
}

export default async function StoreDetails({ params }: StoreClientDetails) {
  const storeId = params.storeId;
  const contCookies = await cookies();
  const contToken = contCookies.get("contToken")?.value;

  console.log(storeId);

  if (!contToken) redirect("/contributor/login");

  const res = await apiRequest(
    `/shopping/products?strId=${storeId}`,
    contToken,
    "GET",
    process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR
  );
  console.log(res.data);
  return <StoreClientDetails products={res.data} contToken={contToken} />;
}
