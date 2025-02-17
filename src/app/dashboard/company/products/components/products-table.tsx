"use client";
import { DataTable } from "@/components/ui/data-table";
import { Product } from "./dummy-data";
import { columns } from "./columns";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  return <DataTable columns={columns} data={products} />;
}
