import React from "react";

export function Spinner({
  className = "h-5 w-5 border-white",
  text = "Loading...",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent
         align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        {text}
      </span>
    </div>
  );
}

export default Spinner;
