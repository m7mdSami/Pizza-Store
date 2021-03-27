import { products, OrderDetails, quantity, cart } from './shard';

export interface appState {
    products: products[];
    orders: any[];
    quantity: number;
    cart: cart;
    orderDetails: OrderDetails[]
}