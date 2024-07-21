import { appDescription } from "@/api/constants";
import { Metadata } from "next";
import React, { FC } from "react";

type Props = {
  params: { slug: string };
  searchParams: {};
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `${params.slug} | ${appDescription}`,
  };
};

interface ProductProps {
  params: { productId: string };
  searchParams: {};
}

const page: FC<ProductProps> = (props) => {
  const { params, searchParams } = props;

  return <div>Product {params.productId}</div>;
};

export default page;
