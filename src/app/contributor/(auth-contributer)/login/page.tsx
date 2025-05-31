"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import signupImage from "@/assets/undraw_access-account_aydp.svg";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useActionState, useEffect } from "react";
import loginContributor from "./actions";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/spinner";

const initialState = {
  message: "",
  errors: {},
  email: "",
  password: "",
  success: false,
};

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    loginContributor,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.data.message || "Login Success");
      router.push("/contributor");
    } else if (state.errors) {
      toast.error(state.message);
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the highlighted errors");
    }
  }, [state, router]);

  return (
    // Screen
    <div className="bg-green-900 h-screen w-full flex justify-center items-center p-8">
      {/* Card */}
      <form className="w-[95%] flex h-full justify-center" action={formAction}>
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
              defaultValue={state?.email}
            />
            {state?.errors?.email && (
              <p className="text-red-500">{state.errors?.email._errors?.[0]}</p>
            )}
            <Input
              name="password"
              type="password"
              className="border-2 border-brand-500 rounded-2xl py-6"
              placeholder="Password"
              defaultValue={state?.password}
            />
            {state?.errors?.password && (
              <p className="text-red-500">
                {state.errors?.password._errors?.[0]}
              </p>
            )}
            <Button
              className="text-xl font-sans font-medium w-full rounded-2xl py-6 bg-green-900 hover:bg-green-800"
              type="submit"
            >
              Login {pending && <Spinner />}
            </Button>
            <p className="text-center text-sm w-full font-normal text-gray-500">
              Don&apos;t have an account?{" "}
              <span
                className="font-semibold text-yellow-400 cursor-pointer border-b border-yellow-400 hover:text-yellow-500"
                onClick={() => router.push("/contributor/signup")}
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
      </form>
    </div>
  );
}
