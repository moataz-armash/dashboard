"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../components/dummy-data";
import { dummyProducts } from "../components/dummy-data";

// Define the shape of the context value
interface ProductsContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
}

interface ProductsProviderProps {
  children: ReactNode;
}

// Create the context with a default value
const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);

  const addProduct = (product: Product) => {
    // products.some(p  => p.name !== product.name)
    setProducts((prev) => [...prev, product]);
    console.log(products)
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    console.log(products)
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct,removeProduct }} >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the ProductContext
function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductContextProvider');
  }
  return context;
}

export { ProductsProvider, useProductsContext };