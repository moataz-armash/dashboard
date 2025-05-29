"use client";
// import { redirect } from "next/navigation";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "About us", href: "#about" },
  { id: 3, title: "Causes", href: "#causes" },
  { id: 4, title: "Process", href: "#prodess" },
];

export default function HomePage() {
  const pathname = usePathname();
  return (
    <header className="py-2 bg-white w-full h-screen flex justify-center">
      {/* hero section section */}
      <div className="bg-[url('@/assets/background.png')] bg-no-repeat bg-contain bg-center h-screen w-[1000px] py-12 px-12">
        <nav className="h-12 bg-white rounded-full px-2 flex items-center justify-between">
          <div className="flex  items-center">
            <Image
              width={52}
              height={52}
              src={logo}
              alt="ataya logo"
              className=""
            />
            <h1 className="font-mono text-black text-center w-full h-full px-1 font-semibold text-xl">
              Ataya
            </h1>
          </div>

          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.id}
                className={`text-black text-sm ${
                  pathname === link.href &&
                  "font-medium hover:text-greenbutton hover:transition hover:duration-200 "
                }`}
              >
                {link.title}
              </Link>
            ))}
          </ul>
          <Button className="bg-greenbutton text-white font-normal rounded-full hover:bg-green-800">
            Donate Now
          </Button>
        </nav>

        <h1 className="text-4xl text-white font-normal font-sans w-[70%] leading-[1.5] pt-12">
          Ataya - Empowering <br />
          Generosity
        </h1>
        <p className="text-white w-[60%] text-xs font-thin">
          Ataya fosters community support by enabling acts of kindness across
          grocery <br /> markets and restaurants, inspired by &quot;askıda
          ekmek.&quot;
        </p>
      </div>
    </header>
  );
  // Redirect to the default dashboard (Company in this case)
  // redirect("/dashboard/company/home");
}
