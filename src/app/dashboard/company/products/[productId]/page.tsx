import { apiRequest } from "@/utils/api";
import ProductDetailsClient from "./product-details-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ProductDetailsPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { productId } = params;
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const res = await apiRequest(`/product/${productId}`, token);

  const product = await res.json();
  return <ProductDetailsClient product={product.data} />;
}
