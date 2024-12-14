import { appDescription } from "@/api/constants";
import { Metadata } from "next";
import React, { FC } from "react";
import ProductPage from "./ProductPage";

type Props = {
  params: { slug: string; productId: string };
  searchParams: {};
};

export const generateMetadata = ({ params }: Props): Metadata => {
  const decodedSlug = decodeURIComponent(params.slug);
  const slug = decodedSlug.replace(/-/g, " ");

  console.log("title", slug);
  return {
    title: `${slug} | ${appDescription}`,
  };
};

const Page: FC<Props> = (props) => {
  const { params, searchParams } = props;

  return (
    <div>
      <ProductPage params={params} searchParams={searchParams} />
    </div>
  );
};

export default Page;
