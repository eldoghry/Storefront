export default interface cart {
  readonly id?: number;
  order_id?: number;
  product_id: number;
  quantity: number;
  name?: string;
}
