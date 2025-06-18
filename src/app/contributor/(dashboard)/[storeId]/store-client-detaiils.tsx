import BackLink from "@/components/ui/back-link";
import ProductsCard from "./components/products-card";
import { Product } from "./components/type";
import { defaultProductImg } from "@/lib/constants";
import { getImage } from "@/lib/helpers";

interface StoreClientDetailsProps {
  products: Product[];
  contToken: string;
}

export default function StoreClientDetails({
  products,
  contToken,
}: StoreClientDetailsProps) {
  console.log(products);
  return (
    <div className="flex flex-col mt-4">
      <BackLink title="All Stores" link="/contributor" />
      <div className="grid grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <ProductsCard
            key={product.itemId}
            id={product.itemId}
            price={product.price}
            name={product.productName}
            image={getImage(product.imageUrl) || defaultProductImg}
            contToken={contToken}
          />
        ))}
      </div>
    </div>
  );
}
