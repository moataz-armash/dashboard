"use client";

import { useActionState, useEffect } from "react";
import { registerUser } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const initialState = {
  error: {},
  username: "",
  email: "",
  success: false,
  message: "",
};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(
        JSON.parse(state?.data?.value)?.message || "Registration successful!"
      );

      const token = JSON.parse(state?.data?.value)?.data?.token;
      const email = JSON.parse(state?.data?.value)?.data?.email;
      router.push(`/verify-email?token=${token}&email=${email}`);
    } else if (state?.message) {
      toast.error(state?.message);
    } else if (state?.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the highlighted errors.");
    }
  }, [state, router]);

  return (
    <div>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Registration Form
        </h1>
        <form
          className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
          action={formAction}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              UserName
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="username"
              name="username"
              defaultValue={state?.username}
              placeholder="mo3taz"
            />
            {state.errors?.username && (
              <p className="text-red-500 text-sm">
                {state.errors.username._errors?.[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              name="email"
              defaultValue={state?.email}
              placeholder="moataz@example.com"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm">
                {state.errors.email._errors?.[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
            {state?.errors?.password && (
              <p className="text-red-500 text-sm">
                {state.errors.password._errors?.[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
            />
            {state?.errors?.confirmPassword && (
              <p className="text-red-500 text-sm">
                {state.errors.confirmPassword._errors?.[0]}
              </p>
            )}
          </div>
          <button
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
            disabled={pending}
          >
            Register {pending && "... "}
          </button>
        </form>
      </div>
    </div>
  );
}
