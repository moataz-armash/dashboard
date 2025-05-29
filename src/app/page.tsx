// import { redirect } from "next/navigation";
import logo from "@/assets/logo.png";
import Image from "next/image";
export default function HomePage() {
  return (
    <header className="py-2 bg-white w-full h-screen flex justify-center">
      {/* hero section */}
      <div className="bg-[url('@/assets/background.png')] bg-no-repeat bg-contain bg-center h-screen w-[1000px] py-12 px-12">
        <nav className="h-12 bg-white rounded-full px-2 flex items-center">
          <Image
            width={36}
            height={36}
            src={logo}
            alt="ataya logo"
            className=""
          />
        </nav>
      </div>
    </header>
  );
  // Redirect to the default dashboard (Company in this case)
  // redirect("/dashboard/company/home");
}
