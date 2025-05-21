import { Card } from "@/components/ui/card";
export default function CardItem({
  title,
  number,
  bgColor,
  icon,
}: {
  title: string;
  number: number;
  bgColor: string;
  icon: React.ReactNode;
}) {
  return (
    <Card
      className={`flex ${bgColor} p-4 rounded-2xl shadow-md justify-between`}
    >
      <div className="p-4 rounded-2xl border border-white flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 justify-end">
        <p className="text-white font-normal text-end">{title}</p>
        <p className="text-white font-semibold text-4xl text-end">{number}</p>
      </div>
    </Card>
  );
}
