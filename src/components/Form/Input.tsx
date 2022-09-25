import clsx from "clsx";
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, id, error, className, required, ...props },
  ref
) => {
  return (
    <div className={clsx(className, "flex flex-col gap-2")}>
      {label && (
        <label
          htmlFor={id}
          className="font-semibold text-base -tracking-[0.18px]"
        >
          {label}
        </label>
      )}

      <div className={clsx(className, "w-full relative")}>
        <input
          className={clsx(
            className,
            "form-input bg-blue-900 border-blue-600 rounded p-3 text-base text-blue-200  placeholder:text-blue-400 w-full focus:ring-blue-500 focus:border-blue-500"
          )}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
      {!!error && <div className="text-base text-red-500">{error.message}</div>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
