interface BadgeProps {
  text: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
}

const statusStyles: Record<BadgeProps["status"], string> = {
  ACTIVE:
    "bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20",
  INACTIVE:
    "bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20",
  SUSPENDED:
    "bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20",
  DELETED:
    "bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-600/20",
};
export default function Badge({ text, status }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      {text}
    </span>
  );
}
