import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackLink({
  link,
  title,
}: {
  link: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={link}
        className="border bg-card text-card-foreground p-2 rounded-2xl shadow-md cursor-pointer"
      >
        <ArrowLeft />
      </Link>
      <h1 className="text-xl font-semibold text-left w-full font-sans">{title} </h1>
    </div>
  );
}
