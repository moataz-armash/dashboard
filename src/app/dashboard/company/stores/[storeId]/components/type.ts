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
  isDiscounted: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface ProductsTableProps {
  products: InventoryProduct[];
  storeName: string;    
}
