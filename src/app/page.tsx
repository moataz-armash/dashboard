"use client";
// import { redirect } from "next/navigation";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import volunteering from "@/assets/volunteering.jpg";

const navLinks = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "About us", href: "#about" },
  { id: 3, title: "Causes", href: "#causes" },
  { id: 4, title: "Process", href: "#prodess" },
];

export default function HomePage() {
  const pathname = usePathname();
  const router = useRouter();
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
          <Button
            className="bg-greenbutton text-white font-normal rounded-full hover:bg-green-800"
            onClick={() => {
              router.push("/contributor/signup");
            }}
          >
            Donate Now
          </Button>
        </nav>

        <h1 className="text-4xl text-white font-normal font-sans w-[90%] leading-[1.5] pt-4">
          Ataya – Empowering Everyday <br /> Acts of Kindness and Generosity
        </h1>

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-4 items-start mt-4">
          {/* Left Side Content */}
          <div className="space-y-6 col-span-2">
            {/* Features Grid */}
            <p className="text-white w-full text-xs font-thin leading-6 tracking-wider">
              Ataya fosters community support by enabling acts of kindness
              across grocery <br /> markets and restaurants, inspired by
              &quot;askıda ekmek.&quot;
            </p>
            <Button className="bg-greenbutton rounded-full">
              Donate Now
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md border border-white/20">
                <h3 className="font-bold text-white mb-1 text-sm">Education for All</h3>
                <p className="text-xs text-gray-200">
                  Darul is dedicated to ensuring that every child has access to
                  quality education.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md border border-white/20">
                <h3 className="font-bold text-white mb-1 text-sm">
                  Health and Wellness
                </h3>
                <p className="text-xs text-gray-200">
                  Our commitment to health and wellness extends across borders.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md border border-white/20">
                <h3 className="font-bold text-white mb-1 text-sm">Disaster Relief</h3>
                <p className="text-xs text-gray-200">
                  In times of crisis, Darul responds swiftly to provide
                  emergency relief.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md border border-white/20">
                <h3 className="font-bold text-white mb-1 text-sm">
                  Community
                </h3>
                <p className="text-xs text-gray-200">
                  Darul invests in sustainable community development projects.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="col-span-2">
            <Image
              src={volunteering}
              alt="Two happy children"
              className="rounded-xl shadow-lg object-cover w-full h-96"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </header>
  );
  // Redirect to the default dashboard (Company in this case)
  // redirect("/dashboard/company/home");
}
