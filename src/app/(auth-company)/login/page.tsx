"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { loginUser } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const initialState = {
  errors: {},
  identifier: "",
  success: false,
  message: "",
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginUser, initialState);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.data?.message || "Login Success");
      // token=${state?.data?.data?.token}
      router.push(`/register-company`);
      login();
    } else if (state?.message) {
      toast.error(state?.message);
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the highlighted errors");
    }
  }, [state, router, login, isAuthenticated]);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-900">
        <div className="px-6 py-4">
          {/* <div className="flex justify-center mx-auto">
            <Image
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              width={100}
              height={100}
              alt="logo"
            />
          </div> */}

          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>

          <form action={formAction}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Username or Email"
                aria-label="identifier"
                name="identifier"
                defaultValue={state?.identifier}
              />
              {state?.errors?.identifier && (
                <p className="text-red-500 text-sm">
                  {state.errors.identifier._errors?.[0]}
                </p>
              )}
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
              />
              {state?.errors?.password && (
                <p className="text-red-500 text-sm">
                  {state.errors.password._errors?.[0]}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link
                href="/forget-password"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </Link>

              <button
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                type="submit"
                disabled={pending}
              >
                Sign In {pending && <span>...</span>}
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Dont have an account?{" "}
          </span>

          <Link
            href="/register"
            className="mx-2 text-sm font-bold text-indigo-500 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
