import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <section
      className={clsx(className, "max-w-[1168px] w-full mx-auto px-6")}
      {...props}
    >
      {children}
    </section>
  );
}
