"use client";
import {
  CircleCheckBig,
  CreditCard,
  MoveLeft,
  ShoppingBag,
} from "lucide-react";

import { useState } from "react";
import CartProgress from "./components/cart-progress";
import { Button } from "@/components/ui/button";
import PaymentMethod from "./components/payment-methods";
import Successfull from "./components/successfull";
import { useCartStore } from "../[storeId]/components/cart-stores";

const progressBar = [
  { id: 1, name: "Cart", icon: ShoppingBag, step: 1, active: true },
  { id: 2, name: "Payment", icon: CreditCard, step: 2, active: false },
  { id: 3, name: "Success", icon: CircleCheckBig, step: 3, active: false },
];

export default function CartPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { cart } = useCartStore();

  const goNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, progressBar.length - 1));

  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col">
      {cart.length > 0 || currentStep === 2 ? (
        <>
          <div className="flex justify-center gap-2 pt-6">
            {progressBar.map((item, index) => (
              <span key={item.id} className="flex gap-1 items-center">
                <>
                  <span
                    className={`${
                      item.step === 1
                        ? "hidden"
                        : "h-[2px] w-32 bg-gray-300 rounded-full"
                    }`}
                  ></span>
                  <item.icon
                    size={36}
                    className={`rounded-full p-1 ${
                      index <= currentStep
                        ? "text-white bg-orangebrand"
                        : "text-gray-300"
                    }`}
                  />
                </>
                <span className="font-medium">{item.name}</span>
              </span>
            ))}
          </div>
          {currentStep === 0 && <CartProgress goNext={goNext} />}
          {currentStep === 1 && <PaymentMethod goNext={goNext} />}
          {currentStep === 2 && <Successfull />}
          <div className="flex justify-between px-8">
            {currentStep < 2 && currentStep > 0 && (
              <Button
                variant="outline"
                className={`hover:bg-purblebrand hover:text-white ${
                  currentStep === 0 && "cursor-not-allowed"
                }`}
                onClick={goBack}
                disabled={currentStep === 0}
              >
                <MoveLeft className="hover:text-white" />
                Back
              </Button>
            )}
          </div>
        </>
      ) : (
        currentStep !== 2 && (
          <p className="text-yellow-500 text-center p-8">
            Your cart is Empty 😊, Go to dashboard to add some products
          </p>
        )
      )}
    </div>
  );
}
