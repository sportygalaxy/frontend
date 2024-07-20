"use client";
import { FC, PropsWithChildren, ReactNode } from "react";
import { TProduct } from "@/types/product";

type Props = {
  children?: ReactNode;
  component?: React.FC<{ product?: TProduct }>;
  data: TProduct[];
} & PropsWithChildren;

export const ScrollAreaHorizontal: FC<Props> = ({
  data,
  children,
  component: Component,
}) => {
  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
      `}</style>
      <div className="wrapper overflow-x-auto whitespace-nowrap py-6 custom-scrollbar">
        <div className="inline-flex space-x-6">
          {data?.map((product) => (
            <div
              key={product.id}
              className="relative w-[190px] md:w-[300px] h-[360px] md:h-[510px] flex-shrink-0 flex items-center justify-center bg-grey-gradient border-light rounded-md overflow-hidden group"
            >
              {Component ? <Component product={product} /> : children}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
