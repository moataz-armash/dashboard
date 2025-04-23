"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage({ result }: { result: any }) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  console.log(result);

  useEffect(() => {
    if (result?.statusCode === 200) {
      toast.success(result?.message || "Email verified successfully");
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } else {
      toast.error(result?.message || "Verification failed");
      setTimeout(() => {
        router.push("/register");
      }, 5000);
    }
  }, [result, router]);
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
      <div className="max-w-xl px-5 text-center">
        <div className="flex justify-center mx-auto">
          <Image
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            width={200}
            height={200}
            alt="logo"
          />
        </div>
        <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
          Check your inbox
        </h2>
        <p className="mb-2 text-lg text-zinc-500">
          We are glad, that you’re with us ? We’ve sent you a verification link
          to the email address{" "}
          <span className="font-medium text-indigo-500">{email}</span>.
        </p>
        <a
          href="https://www.gmail.com"
          className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
        >
          Open Gmail →
        </a>
      </div>
    </div>
  );
}
