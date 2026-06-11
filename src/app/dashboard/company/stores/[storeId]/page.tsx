import { cookies } from "next/headers";
import StoreCard from "./store-component";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";
import ProductsTable from "./components/products-table";

interface PageParams {
  params: Promise<{
    storeId: string;
  }>;
}

export default async function getStores({ params }: PageParams) {
  const { storeId } = await params;
  if (!storeId) {
    redirect("/dashboard/company/stores"); // redirect to the home page if no storeId is provided in the url
  }

  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const resStore = await apiRequest(`/company/store/${storeId}`, token);

  const resInventroy = await apiRequest(
    `/inventory/get?strId=${storeId}`,
    token,
    "GET",
    String(process.env.API_BASE_URL_GATEWAY)
  );
  console.log("[StoreDetail] inventory raw:", JSON.stringify(resInventroy).slice(0, 500));

  if (!resStore.data) {
    redirect("/dashboard/company/stores");
  }

  return (
    <>
      <StoreCard
        store={resStore.data}
        token={token}
        statistics={resInventroy?.statistics ?? { allProducts: 0, inReorderLevel: 0, inStock: 0, outOfStock: 0, inDiscount: 0 }}
      />
      <ProductsTable
        products={resInventroy?.data ?? []}
        storeName={resStore.data.name}
      />
    </>
  );
}
