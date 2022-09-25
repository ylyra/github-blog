import clsx from "clsx";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkProps
  extends Exclude<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  children: ReactNode;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  color?: `text-${string}`;
  iconColor?: `text-${string}`;
}

export function Link({
  children,
  leftIcon,
  rightIcon,
  color = "text-blue-300",
  iconColor = "text-blue-300",
  ...props
}: LinkProps) {
  return (
    <a className={clsx(color, "flex items-center gap-2")} {...props}>
      {leftIcon && <span className={iconColor}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={iconColor}>{rightIcon}</span>}
    </a>
  );
}
