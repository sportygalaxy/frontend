import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type props = {
  className?: string;
} & PropsWithChildren;

const Divider: React.FC<props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "border-[0.2px] border-dark mb-3 w-full min-w-[200px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Divider;
