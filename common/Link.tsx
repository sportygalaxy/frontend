import React, { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
  href: string;
  children: ReactNode;
}

const LinkComponent: FC<Props> = (props) => {
  const { href, children, ...rest } = props;

  return (
    <Link passHref href={href} {...rest}>
      {children}
    </Link>
  );
};

export default LinkComponent;
