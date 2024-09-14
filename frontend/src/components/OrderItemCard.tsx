import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { ORDER_STATUS } from "@/config/order-status-config";
import { Order, OrderStatus } from "@/types";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

const OrderItemCard = ({ order }: { order: Order }) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="justify-between gap-4 grid md:grid-cols-4 md-3">
          <div>
            Customer name:{" "}
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              ${(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {order.cartItems.map((cartItem) => (
              <span key={cartItem.name}>
                <Badge variant="outline" className="mr-2">
                  {cartItem.quantity}
                </Badge>
                {cartItem.name}
              </span>
            ))}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status">What is the status of this order?</Label>
            <Select
              value={status}
              disabled={isLoading}
              onValueChange={(value) =>
                handleStatusChange(value as OrderStatus)
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent position="popper">
                {ORDER_STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default OrderItemCard;
