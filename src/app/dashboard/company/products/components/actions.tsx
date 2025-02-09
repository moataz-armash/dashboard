"use client";

import { Product } from "./dummy-data";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { useProductsContext } from "../context/ProductsContext";
import { root } from "postcss";

interface ActionsProps {
  product: Product;
}

export function Actions({ product }: ActionsProps) {
  const {removeProduct} = useProductsContext()
  const handleEdit = () => alert(`Editing ${product.name}`);
  const handleDelete = () => removeProduct(product.id);

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" onClick={handleEdit}>
        <Edit size={16} />
      </Button>
      <Button variant="destructive" size="icon" onClick={handleDelete}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
