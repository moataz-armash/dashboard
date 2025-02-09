"use client";

import { useState } from "react";

import { ProductTable } from "./components/products-table";
import { Filters } from "./components/filters";
import { dummyProducts } from "./components/dummy-data";
import { DialogAddProduct } from "./components/dialog-add-product";
import {  ProductsProvider } from "./context/ProductsContext";

export default function ProductsPage() {
    const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

    return (
        <ProductsProvider>

        <div className="p-6">
           
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-center">Product Management</h1>
                <DialogAddProduct />
            </div>

            <Filters setFilteredProducts={setFilteredProducts} />
            <ProductTable products={filteredProducts} />
        </div>
        </ProductsProvider>
    );
}
