import { Button } from "@/components/ui/button";

interface PaymentSummeryProps {
  goNext: () => void;
}

export default function PaymentSummery({ goNext }: PaymentSummeryProps) {
  return (
    <div className="col-span-2 bg-gray-100 h-auto flex flex-col rounded-lg p-4">
      <h1 className="font-semibold">Payment Summery</h1>
      <div className="flex justify-between p-2">
        <span>Total MRP</span>
        <span>2150.00$</span>
      </div>
      <hr className="bg-gray-800" />
      <div className="flex justify-between p-2">
        <span>Total MRP</span>
        <span>2150.00$</span>
      </div>
      <hr className="bg-gray-800" />
      <div className="flex justify-between p-2">
        <span>Total MRP</span>
        <span>2150.00$</span>
      </div>
      <hr className="bg-gray-800" />
      <div className="flex justify-between p-2">
        <span>Total MRP</span>
        <span>2150.00$</span>
      </div>
      <hr className="bg-gray-800" />
      <div className="flex justify-between p-2">
        <span className="font-bold">Total</span>
        <span className="font-bold">2150.00$</span>
      </div>
      <Button
        className="bg-orangebrand rounded-xl w-full uppercase"
        onClick={goNext}
      >
        Place order
      </Button>
    </div>
  );
}
