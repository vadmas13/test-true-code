import { ProductView } from '@prisma/client';

export interface ProductModel extends Omit<ProductView, 'images'> {
    images?: Buffer[];
}
