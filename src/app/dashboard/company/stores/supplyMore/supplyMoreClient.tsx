import { defaultProductImg } from "@/lib/constants";
import { getImage } from "@/lib/helpers";
import { Product } from "./components/type";
import ProductsCard from "./components/products-card";

interface SupplyMoreClientProps {
  products: Product[];
  currentPage: number;
  token: string;
}

export default function SupplyMoreClient({
  products,
  token,
}: SupplyMoreClientProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      {products?.map((product) => (
        <ProductsCard
          buttonTitle="Supply"
          key={product.id}
          id={product.id}
          name={product.name}
          image={getImage(product.images[0]) || defaultProductImg}
          token={token}
        />
      ))}
    </div>
  );
}
