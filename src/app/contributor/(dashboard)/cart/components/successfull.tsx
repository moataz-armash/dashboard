import Link from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useCartStore } from "../../[storeId]/components/cart-stores";

export default function Successfull() {
  const { resetCart } = useCartStore();

  const contToken = Cookies.get("contToken");
  // useEffect(() => {
  //   setTimeout(()=>{

  //   },3000)
  //   resetCart(contToken);
  // }, [contToken, resetCart]);
  return (
    <div className="justify-center w-[50%] mx-auto p-6 text-center transition-all transform bg-gray-100 rounded-xl my-8">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full">
        <svg
          className="w-8 h-8 text-orangebrand"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>

      <h1 className="mb-2 text-xl font-extrabold text-black">
        Payment Successful!
      </h1>

      <p className="mb-2 text-xl text-gray-700">Thank you for your help.</p>

      <div className="p-2 mb-2 rounded-lg bg-brand-50">
        <p className="text-lg font-medium text-brand-700">
          “Even if it’s a little thing, do something for which you get no pay
          but the privilege of doing it. Remember, you don’t live in a world all
          your own. Your brothers are here, too.”{" "}
          <span className="font-semibold block">– Albert Schweitzer</span>
        </p>
      </div>

      {/* <div className="pt-2 mt-2 border-t border-gray-100">
        <p className="text-lg text-gray-700">Have questions? Contact us at:</p>
        <a
          href="mailto:admin@eliteai.tools"
          className="inline-block mt-2 text-xl font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
        >
          admin@eliteai.tools
        </a>
      </div> */}

      <div className="mt-4">
        <Link
          href="/contributor"
          className="inline-block px-4 py-2 text-lg font-semibold text-white transition-colors duration-200 bg-orangebrand rounded-lg hover:bg-orange-700"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
