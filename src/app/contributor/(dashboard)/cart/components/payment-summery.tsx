import { Button } from "@/components/ui/button";
import { useCartStore } from "../../[storeId]/components/cart-stores";

interface PaymentSummaryProps {
  goNext: () => void;
}

export default function PaymentSummery({ goNext }: PaymentSummaryProps) {
  const subtotal = useCartStore((s) => s.getSubtotal());
  const tax = useCartStore((s) => s.getTax());
  const discount = useCartStore((s) => s.getDiscount());
  const total = useCartStore((s) => s.getTotal());

  const TAX_RATE = 0.18;

  return (
    <div className="col-span-2 bg-gray-100 h-fit flex flex-col rounded-lg p-4">
      <h1 className="font-semibold text-lg mb-4">Payment Summary</h1>

      <div className="flex justify-between p-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <hr />

      <div className="flex justify-between p-2">
        <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <hr />

      <div className="flex justify-between p-2">
        <span>Discount</span>
        <span>-${discount.toFixed(2)}</span>
      </div>
      <hr />

      <div className="flex justify-between p-2 font-bold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Button
        className="bg-orangebrand rounded-xl w-full uppercase mt-4"
        onClick={goNext}
      >
        Place Order
      </Button>
    </div>
  );
}
