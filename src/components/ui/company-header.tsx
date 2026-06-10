"use client";

interface CompanyHeaderProps {
  title: string;
  description?: string;
}

export default function CompanyHeader({ title, description }: CompanyHeaderProps) {
  return (
    <div className="flex flex-col pt-6 pb-2">
      <h1 className="text-xl font-bold">{title}</h1>
      {description && <p className="text-[0.7rem] text-zinc-400">{description}</p>}
    </div>
  );
}
