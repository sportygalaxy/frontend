import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type props = {
  className?: string;
} & PropsWithChildren;

const Divider: React.FC<props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-gray-200 border-[0.2px] border-[#e7e7e7] mb-3 w-full min-w-[200px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Divider;
