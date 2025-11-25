import { getOrderStatusDetails } from "@/lib/utils";

interface OrderStatusProps {
  status: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const { colorClass, formattedStatus } = getOrderStatusDetails(status);

  return (
    <p className={`text-mobile-xl md:text-sm font-semibold mt-1 ${colorClass}`}>
      {formattedStatus}
    </p>
  );
};

export default OrderStatus;
