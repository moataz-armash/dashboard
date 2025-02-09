
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useProductsContext } from "../context/ProductsContext"
import { Product } from "./dummy-data";


export function DialogAddProduct() {
    const {addProduct} = useProductsContext()
    const [product, setProduct] = useState<Product>({
        id: 0,
        name: "",
        price: 0,
        image: "",
        stock: 0,
    })
    return (

        <Dialog>

            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus /> Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input id="price" value={product.price} onChange={(e) => setProduct({...product, price: Number(e.target.value)})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                            Stock
                        </Label>
                        <Input id="stock" value={product.stock} onChange={(e) => setProduct({...product, stock: Number(e.target.value)})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image
                        </Label>
                        <Input id="image" value={product.image} onChange={(e) => setProduct({...product, image: e.target.value})} className="col-span-3" />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" onClick={(e)=> {addProduct(product), e.preventDefault()}}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
