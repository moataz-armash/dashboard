import { ChevronDown } from "lucide-react";

interface DropdownProps {
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  readOnly?: boolean;
}

export default function DropdownProduct({
  name,
  options,
  defaultValue,
}: DropdownProps) {
  return (
    <div className="relative">
      <select
        name={name}
        className="appearance-none bg-gray-200 px-2 pr-10 py-2 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 w-full"
        defaultValue={defaultValue}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <ChevronDown className="bg-black text-white rounded-full" size={16} />
      </div>
    </div>
  );
}
