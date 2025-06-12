import ProductsCard from "@/app/contributor/(dashboard)/[storeId]/components/products-card";
import { defaultProductImg } from "@/lib/constants";
import { getImage } from "@/lib/helpers";
import { Product } from "../../../products/components/type";

interface SupplyMoreClientProps {
  products: Product[];
  currentPage: number;
}
export default function SupplyMoreClient({ products }: SupplyMoreClientProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      {products?.map((product) => (
        <ProductsCard
          buttonTitle="Supply"
          key={product.id}
          id={+product.id}
          price={product.price}
          name={product.name}
          image={getImage(product.images[0]) || defaultProductImg}
        />
      ))}
    </div>
  );
}
