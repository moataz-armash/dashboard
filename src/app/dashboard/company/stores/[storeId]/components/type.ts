export interface InventoryProduct {
  id: string;
  storeId: string;
  productId: string;
  quantity: number;
  reorderLevel: number;
  lastSupplyQuantity: number;
  price: number;
  unit: string;
  discount: number;
  discountRate: number;
  discountedPrice: number;
  productName: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Statistics {
  allProducts: number;
  inReorderLevel: number;
  inStock: number;
  outOfStock: number;
  inDiscount: number;
}

export interface ProductsTableProps {
  products: InventoryProduct[];
  storeName: string;
}
