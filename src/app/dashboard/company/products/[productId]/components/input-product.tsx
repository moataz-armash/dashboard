export default function InputProduct({
  name,
  defaultValue,
  type = "text",
  inputMode,
  readOnly,
  className,
}: {
  defaultValue: string | number | null;
  name: string;
  type?: string;
  readOnly?: boolean;
  className?: string;
  inputMode:
    | "search"
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | undefined;
}) {
  return (
    <input
      type={type}
      name={name}
      inputMode={inputMode}
      className={`${
        readOnly ? className : ""
      } bg-gray-200 px-2 py-2 rounded-xl text-gray-700 placeholder:text-gray-400`}
      defaultValue={defaultValue || ""}
      readOnly={readOnly || false}
    />
  );
}
