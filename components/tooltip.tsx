import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC, ReactNode } from "react";

interface Props {
  component: ReactNode;
  title: string;
}
const TooltipWrapper: FC<Props> = (props) => {
  const { component, title } = props;
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>{component}</TooltipTrigger>
        <TooltipContent className="border border-grey">
          <p className="text-sm text-primary bg-background">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
