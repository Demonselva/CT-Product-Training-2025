export interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  offer_price: number | null;
  price: number;
  stock: string;
  product_added_date: string;
  product_edited_date: string;
}