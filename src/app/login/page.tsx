"use client";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
const LoginPage = () => {
  const router = useRouter();
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

          <form>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </a>

              <button
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                onClick={() => {
                  router.push("/verify-email");
                }}
              >
                Sign In
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
};

export default LoginPage;
