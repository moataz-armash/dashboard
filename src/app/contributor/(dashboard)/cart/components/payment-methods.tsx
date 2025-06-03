"use client";

import Image from "next/image";
import PaymentSummery from "./payment-summery";
import { Input } from "@/components/ui/input";

interface PaymentMethodProps {
  goNext: () => void;
}

export default function PaymentMethod({ goNext }: PaymentMethodProps) {
  return (
    <div className="grid grid-cols-6 space-x-4 p-8">
      <div className="col-span-4">
        <h1 className="font-semibold">Credit Card</h1>

        <div className="bg-gray-100 w-full h-full p-8 rounded-lg gap-8">
          <div className="w-96 h-full m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
            <Image
              alt="credit card"
              className="relative object-cover w-full h-full rounded-xl"
              src="https://i.imgur.com/kGkSg1v.png"
              height={500}
              width={500}
            />

            <div className="w-full px-8 absolute top-8">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-light">Name</p>
                  <Input
                    className="font-medium tracking-widest placeholder:text-white"
                    placeholder="Moataz"
                    type="text"
                    inputMode="text"
                  />
                </div>
                <Image
                  alt="card image"
                  //   className="w-14 h-14"
                  src="https://i.imgur.com/bbPHJVe.png"
                  height={48}
                  width={48}
                />
              </div>
              <div className="pt-1">
                <p className="font-light">Card Number</p>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="4642 3489 9867 7632"
                  maxLength={19} // 16 digits + 3 spaces
                  pattern="\d{13,19}"
                  className="font-medium tracking-widest placeholder:text-white"
                />
              </div>
              <div className="pt-2 pr-2">
                <div className="flex justify-between">
                  <div className="">
                    <p className="font-light text-xs">Expiry</p>
                    <Input
                      className="font-medium tracking-wider text-sm placeholder:text-white"
                      placeholder="03/25"
                      pattern="\d{2}/\d{2}"
                      type="text"
                      inputMode="numeric"
                    />
                  </div>

                  <div className="w-[20%]">
                    <p className="font-light text-xs">CVV</p>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="***"
                      maxLength={3}
                      pattern="\d{3,4}"
                      className="font-bold tracking-widest text-sm placeholder:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentSummery goNext={goNext} />
    </div>
  );
}
