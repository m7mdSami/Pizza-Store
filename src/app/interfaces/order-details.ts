import { quantity } from './shard';

export interface OrderDetails {
    OrderId: number;
    OrderDate: string;
    Products: quantity[];
    UserId: string;
    PaymentType: string;
    ProductPrice: number;
    userName: string
}