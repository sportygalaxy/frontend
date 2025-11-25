import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type props = {
  oneLineScroll?: boolean;
  className?: string;
} & PropsWithChildren;

const CardGrid: React.FC<props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full items-stretch gap-3 sm:gap-6",
        "[grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]",
        "xs:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]",
        "sm:[grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]",
        "lg:[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardGrid;
