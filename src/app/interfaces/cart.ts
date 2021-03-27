import { products, cartItem } from './shard';

export interface cart {
    total?: number;
    quantity?: number;
    cartItem?: cartItem[]
} 