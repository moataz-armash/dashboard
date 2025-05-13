import { Input } from "./input";
import { Label } from "./label";

interface InputFormProps {
  state?: any;
  title: string;
  name: string;
  text?: string;
}

export default function InputForm({
  state,
  title,
  name,
  text,
}: InputFormProps) {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor={name}
          className={`${
            text ? text + " ml-2" : "text-right"
          } text-xs font-semibold text-gray-500 mb-1`}
        >
          {title}
        </Label>
        <Input
          className="col-span-3"
          type="text"
          placeholder={title}
          aria-label={name}
          name={name}
          defaultValue={state[name]}
        />
        {/* {state?.errors[name] && (
          <p className="text-red-500 text-sm col-span-full text-right">
            {state.errors[name]._errors?.[0]}
          </p>
        )} */}
      </div>
    </>
  );
}
