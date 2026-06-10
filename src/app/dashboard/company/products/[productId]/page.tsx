import { apiRequest } from "@/utils/api";
import ProductDetailsClient from "./product-details-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ProductDetailsPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { productId } = await params;
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const res = await apiRequest(`/company/product/${productId}`, token);

  console.log("[ProductDetails] response:", JSON.stringify(res).slice(0, 300));

  if (!res.data) redirect("/dashboard/company/products");

  return <ProductDetailsClient product={res.data} token={token!} />;
}
