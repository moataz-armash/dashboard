import { Input } from "./input";
import { Label } from "./label";

interface InputFormProps {
  state?: any;
  title: string;
  name: string;
  text?: string;
  readOnly?: boolean;
  defaultValue?: any;
  index?: number;
  totalItems?: number;
  parentColumns?: number;
  options?: { label: string; value: string }[];
}

export default function InputForm({
  state,
  title,
  name,
  text,
  readOnly = false,
  defaultValue,
  index,
  totalItems,
  parentColumns = 2,
  options,
}: InputFormProps) {
  let columnSpanClass = "";
  if (index !== undefined && totalItems !== undefined) {
    const isLastItem = index === totalItems - 1;
    const isOddNumberOfItems = totalItems % parentColumns !== 0;
    if (isLastItem && isOddNumberOfItems) {
      columnSpanClass = `col-span-${parentColumns}`;
    } else {
      columnSpanClass = "col-span-1";
    }
  }
  return (
    <>
      <div className={`grid grid-cols-4 items-center gap-4 ${columnSpanClass}`}>
        <Label
          htmlFor={name}
          className={`${
            text ? text + " ml-2" : "text-right"
          } text-xs font-semibold text-gray-500 mb-1`}
        >
          {title}
        </Label>
        {options ? (
          <select
            name={name}
            aria-label={name}
            defaultValue={state?.[name] ?? defaultValue ?? ""}
            disabled={readOnly}
            className="col-span-3 border border-gray-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="" disabled>Select {title}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <Input
            className={`${
              readOnly && "bg-gray-100 cursor-not-allowed"
            } col-span-3`}
            type="text"
            placeholder={title}
            aria-label={name}
            name={name}
            defaultValue={state ? state[name] : defaultValue}
            readOnly={readOnly || false}
          />
        )}
        {state?.errors?.[name]?._errors?.[0] && (
          <p className="text-red-500 text-sm col-span-full text-right">
            {state.errors[name]._errors[0]}
          </p>
        )}
      </div>
    </>
  );
}
