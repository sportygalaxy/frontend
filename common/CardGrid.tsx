import { PropsWithChildren } from "react";

type props = {
  oneLineScroll?: boolean;
} & PropsWithChildren;

const CardGrid: React.FC<props> = ({ children }) => {
  return (
    <div className="grid gap-2 sm:gap-5 [@media(max-width:373px)]:justify-center justify-between  [@media(max-width:413px)]:[grid-template-columns:repeat(auto-fill,170px)] [grid-template-columns:repeat(auto-fill,190px)] sm:[grid-template-columns:repeat(auto-fill,295px)]">
      {children}
    </div>
  );
};

export default CardGrid;
