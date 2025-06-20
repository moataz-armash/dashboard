"use client";

import { useState } from "react";
import Image from "next/image";
import PaymentSummery from "./payment-summery";
import { Input } from "@/components/ui/input";
import { useCartStore } from "../../[storeId]/components/cart-stores";

interface PaymentMethodProps {
  goNext: () => void;
}

export default function PaymentMethod({ goNext }: PaymentMethodProps) {
  const { resetCart } = useCartStore();
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: typeof errors = {
      name: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Invalid card number";
      valid = false;
    }

    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      newErrors.expiry = "Use MM/YY format";
      valid = false;
    }

    if (!/^\d{3,4}$/.test(form.cvv)) {
      newErrors.cvv = "Invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    console.log(validateForm());
    if (validateForm()) {
      goNext();
      resetCart();
    }
  };

  return (
    <div className="grid grid-cols-6 space-x-4 p-8">
      <div className="col-span-4">
        <h1 className="font-semibold">Credit Card</h1>

        <div className="bg-gray-100 w-full h-full p-8 rounded-lg gap-8">
          <div className="w-96 h-full m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">
            <Image
              alt="credit card"
              className="relative object-cover w-full h-full rounded-xl"
              src="https://i.imgur.com/kGkSg1v.png"
              height={500}
              width={500}
            />
            <div className="w-full px-8 absolute top-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-light">Name</p>
                  <Input
                    className={`font-medium tracking-widest ${
                      errors.name
                        ? "placeholder:text-red-300"
                        : "placeholder:text-white"
                    }`}
                    placeholder={errors.name ? errors.name : "Moataz"}
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>
                <Image
                  alt="card logo"
                  src="https://i.imgur.com/bbPHJVe.png"
                  height={48}
                  width={48}
                />
              </div>

              <div className="pt-1">
                <p className="font-light">Card Number</p>
                <Input
                  type="text"
                  placeholder={
                    errors.cardNumber
                      ? errors.cardNumber
                      : "4642 3489 9867 7632"
                  }
                  inputMode="numeric"
                  value={form.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 16);
                    const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
                    handleChange("cardNumber", formatted);
                  }}
                  maxLength={19}
                  className={`font-medium tracking-widest ${
                    errors.cardNumber
                      ? "placeholder:text-red-300"
                      : "placeholder:text-white"
                  }`}
                />
              </div>

              <div className="pt-2 pr-2 flex gap-4">
                <div>
                  <p className="font-light text-xs">Expiry</p>
                  <Input
                    placeholder={errors.expiry ? errors.expiry : "03/25"}
                    type="text"
                    inputMode="numeric"
                    value={form.expiry}
                    onChange={(e) => handleChange("expiry", e.target.value)}
                    maxLength={5}
                    className={`font-medium tracking-widest ${
                      errors.expiry
                        ? "placeholder:text-red-300"
                        : "placeholder:text-white"
                    }`}
                  />
                </div>

                <div className="w-[30%]">
                  <p className="font-light text-xs">CVV</p>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder={errors.cvv ? errors.cvv : "***"}
                    value={form.cvv}
                    onChange={(e) => handleChange("cvv", e.target.value)}
                    maxLength={3}
                    className={`font-medium tracking-widest ${
                      errors.cvv
                        ? "placeholder:text-red-300"
                        : "placeholder:text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentSummery goNext={handleSubmit} />
    </div>
  );
}
