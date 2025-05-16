import { apiRequest } from "@/utils/api";
import ProductsClient from "./products-client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function ProductsPage() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const res = await apiRequest("/product/products", token);

  const products = await res.json();
  return <ProductsClient products={products.data} />;
}
