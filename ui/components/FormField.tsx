import { cn } from "cn";
import type { ComponentProps } from "react";

type FormFieldProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  errors?: string[];
};

export function FormInput({ id, label, errors, className, ...inputProps }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-zinc-600" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={cn(
          "w-full bg-zinc-900 px-2 py-1 text-zinc-400 caret-emerald-500",
          errors && "border border-red-400",
          className,
        )}
        {...inputProps}
      />
      {errors && <span className="text-sm text-red-400">{errors[0]}</span>}
    </div>
  );
}
