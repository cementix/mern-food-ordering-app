import { ORDER_STATUS } from "@/config/order-status-config";
import { Order } from "@/types";
import { Progress } from "./ui/progress";

const OrderStatusHeader = ({ order }: { order: Order }) => {
  const getExpectedDeliveryTime = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="flex md:flex-row flex-col md:justify-between gap-5 font-bold text-4xl tracking-tighter">
        <span>Order Status: {getOrderStatusInfo().label}</span>
        <span>Expected by: {getExpectedDeliveryTime()}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
