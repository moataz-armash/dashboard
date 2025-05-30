"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputForm from "@/components/ui/input-form";
import { useRouter } from "next/navigation";
import signupImage from "@/assets/undraw_access-account_aydp.svg";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useActionState, useEffect } from "react";
import registerContributor from "./actions";
import Spinner from "@/components/ui/spinner";
import toast from "react-hot-toast";

const initialState = {
  errors: {},
  success: false,
  email: "",
  password: "",
};

export default function Signup() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    registerContributor,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.data.message || "Register Success");
    } else if (state.message) {
      toast.error(state.message);
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the highlighted errors");
    }
  }, [state]);
  return (
    // Screen
    <div className="bg-green-900 h-screen w-full flex justify-center items-center p-8">
      {/* Card */}

      <form className="w-[95%] flex h-full justify-center" action={formAction}>
        {/* left side */}
        <div className="bg-white w-full max-w-xl flex flex-col justify-between py-24 px-16 items-center">
          <h1 className="text-4xl text-left w-full font-bold tracking-wide font-sans text-brand-800">
            Do your share <br />{" "}
            <p className="text-xl font-semibold text-brand-800">
              For the environment
            </p>
          </h1>

          <p className="text-left w-full">
            Already have an account?{" "}
            <span
              className="font-semibold text-yellow-400 cursor-pointer border-b border-yellow-400 hover:text-yellow-500"
              onClick={() => router.push("/contributor/login")}
            >
              Login
            </span>
          </p>

          <Input
            name="email"
            type="email"
            className="border-2 border-brand-500 rounded-2xl py-6"
            placeholder="Email Address"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm">
              {state.errors?.email._errors?.[0]}
            </p>
          )}
          <Input
            name="password"
            type="password"
            className="border-2 border-brand-500 rounded-2xl py-6"
            placeholder="Password"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm">
              {state.errors.password._errors?.[0]}
            </p>
          )}
          <Button
            className="text-xl font-sans font-medium w-full rounded-2xl py-6 bg-green-900 hover:bg-green-800"
            disabled={pending}
          >
            Sign Up {pending && <Spinner className="text-white" />}
          </Button>
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
              <span className="border-b-4 border-yellow-400">
                {" "}
                Registeration!
              </span>
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
