"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputForm from "@/components/ui/input-form";
import { useRouter } from "next/navigation";
import signupImage from "@/assets/undraw_access-account_aydp.svg";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function LoginPage() {
  const router = useRouter();

  return (
    // Screen
    <div className="bg-green-900 h-screen w-full flex justify-center items-center p-8">
      {/* Card */}
      <div className="w-[95%] flex h-full justify-center">
        {/* left side */}
        <div className="bg-white w-full max-w-xl flex flex-col gap-20 py-28 px-16 items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl text-center w-full font-bold tracking-wide font-sans text-brand-800">
              Welcome Back
            </h1>
            <p className="text-xs font-light text-gray-500">
              Enter your email and password to access your account
            </p>
          </div>
          <div className="flex flex-col gap-8 w-[90%]">
            <Input
              name="emailAddress"
              type="email"
              className="border-2 border-brand-500 rounded-2xl py-6"
              placeholder="Email Address"
            />
            <Input
              name="password"
              type="password"
              className="border-2 border-brand-500 rounded-2xl py-6"
              placeholder="Password"
            />
            <Button className="text-xl font-sans font-medium w-full rounded-2xl py-6 bg-green-900 hover:bg-green-800">
              Sign Up
            </Button>
            <p className="text-center text-sm w-full font-normal text-gray-500">
              Don&apos;t have an account?{" "}
              <span
                className="font-semibold text-yellow-400 cursor-pointer border-b border-yellow-400 hover:text-yellow-500"
                onClick={() => router.push("/contributor/login")}
              >
                Register Now.
              </span>
            </p>
          </div>
        </div>
        {/* right side */}
        <div className="bg-[#eef2e3] w-full max-w-xl  flex flex-col items-center justify-center pt-16">
          <div className="flex gap-2 justify-center items-center">
            <Image
              width={52}
              height={52}
              src={logo}
              alt="ataya logo"
              className=""
            />
            <h1 className="text-2xl text-center w-full font-bold tracking-wide font-sans text-brand-800">
              Ataya
              <span className="border-b-4 border-yellow-400"> Login!</span>
            </h1>
          </div>
          <Image
            src={signupImage}
            alt="signup image"
            width={450}
            height={450}
            className="p-16"
          />
        </div>
      </div>
    </div>
  );
}
