"use client";
import { FC, PropsWithChildren, ReactNode } from "react";

type ScrollAreaHorizontalProps<T> = {
  children?: ReactNode;
  component?: FC<{ item: T }>;
  data: T[];
} & PropsWithChildren<{}>;

export const ScrollAreaHorizontal = <T,>({
  data,
  children,
  component: Component,
}: ScrollAreaHorizontalProps<T>) => {
  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
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
      <div className="overflow-x-auto whitespace-nowrap py-6 custom-scrollbar">
        <div className="inline-flex space-x-6">
          {data?.map((item, index) => (
            <div
              key={index}
              className="relative w-[180px] md:w-[270px] h-[360px] md:h-[510px] flex-shrink-0 flex items-center justify-center bg-grey-gradient border-light rounded-md overflow-hidden group"
            >
              {Component ? <Component item={item} /> : children}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
