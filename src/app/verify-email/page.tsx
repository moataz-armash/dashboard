"use client";
import { verifyEmail } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const VerifyEmailPage = () => {
  const userInfo = JSON.parse(localStorage?.getItem("userInfo") as string);

  const { username, email } = userInfo.worker;
  const { verificationToken: token } = userInfo;

  const router = useRouter();

  useEffect(() => {
    console.log(username, token);
    const timer = setTimeout(() => {
      try {
        verifyEmail({ token, username });
        router.replace("/login");
      } catch (error) {
        throw new Error(`error happened while register ${error}`);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
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
};

export default VerifyEmailPage;
