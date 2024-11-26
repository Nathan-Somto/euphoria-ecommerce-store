import { Size } from '@prisma/client';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
    color: string;
    size: Size;
    imageUrl: string;
    unitsInStock: number;
}