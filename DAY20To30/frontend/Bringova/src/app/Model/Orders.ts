// export interface Orders{
//       "order_id": 0,
//   "user_id": 0,
//   "product_id": 0,
//   "address": "string",
//   "total_price":0,
//   "quantity":0,
//   "payment_method": "string",
//   "payment_status": "string",
// }
export interface Orders {
  order_id: number;
  user_id: number;
  product_id: number;
  address?: string;
  payment_method?: string;
  payment_status?: string;
  delivery_status?: string;
  Total_Price?: number;
  Quantity?: number;
  message?: string;
  message_date?: string;
  order_date?: string;
}
