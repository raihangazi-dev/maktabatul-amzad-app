export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
};