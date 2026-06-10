"use client";
import BackLink from "@/components/ui/back-link";
import { Product } from "../components/type";
import ProductForm from "./components/product-form";

export default function ProductDetailsClient({
  product,
  token,
}: {
  product: Product;
  token: string;
}) {
  return (
    <>
      <main className="flex-1">
        <div className="flex items-center py-4 px-4">
          <BackLink link="/dashboard/company/products" title="All Products" />
        </div>
      </main>
      <ProductForm product={product} token={token} />
    </>
  );
}
