import {
  PackageCheck,
  Shapes,
  ShoppingCart,
  TicketPercent,
} from "lucide-react";
import CardItem from "./card-item";
import { Statistics } from "./type";

export default function StoreCardsIstatistics(statistics: Statistics) {
  const { allProducts, inReorderLevel, outOfStock, inDiscount } = statistics;
  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-2">
      <CardItem
        title="All Products"
        number={allProducts}
        bgColor="bg-[#6366f1]"
        icon={<ShoppingCart className="text-white" />}
      />
      <CardItem
        title="Reorder Level"
        number={inReorderLevel}
        bgColor="bg-[#a855f7]"
        icon={<PackageCheck className="text-white" />}
      />
      <CardItem
        title="Products On Discount"
        number={inDiscount}
        bgColor="bg-[#14b8a6]"
        icon={<TicketPercent className="text-white" />}
      />
      <CardItem
        title="Out Of Stock"
        number={outOfStock}
        bgColor="bg-[#eab308]"
        icon={<Shapes className="text-white" />}
      />
    </div>
  );
}
