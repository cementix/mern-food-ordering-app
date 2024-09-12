import { useGetMyOrdes } from "@/api/OrderApi";
import LoaderScreen from "@/components/LoaderScreen";
import OrderStatusHeader from "@/components/OrderStatusHeader";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrdes();

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (!orders || orders.length === 0) {
    return "No orders found";
  }
  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
