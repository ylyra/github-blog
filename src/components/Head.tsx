import { Helmet, HelmetProps } from "react-helmet";

export type HeadProps = HelmetProps;

export function Head({ children, ...props }: HeadProps) {
  return <Helmet {...props}>{children}</Helmet>;
}
