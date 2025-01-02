import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currencyUtils";
import React from "react";
interface CartSummaryRowProps {
  label: string;
  value: number;
  bold?: boolean; // Whether the row should have bold styling
  underline?: boolean; // Whether the label should be underlined
  onLabelClick?: () => void; // Optional onClick handler for the label
  className?: string; // Custom className for overriding styles
}

const CartSummaryRow: React.FC<CartSummaryRowProps> = ({
  label,
  value,
  bold = false,
  underline = false,
  onLabelClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        bold && "font-bold",
        className
      )}
    >
      <p
        className={cn(
          underline ? "underline cursor-pointer" : "",
          onLabelClick && "cursor-pointer"
        )}
        onClick={onLabelClick}
      >
        {label}
      </p>
      <p>{formatCurrency(value || 0)}</p>
    </div>
  );
};

export default CartSummaryRow;
