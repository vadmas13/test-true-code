import { Product } from '@prisma/client';

export type ProductsQueryPagination = {
    page?: number;
    pageSize?: number;
};

export type ProductsQueryFilters = {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    article?: number;
};

export interface ProductsQueryParams {
    filters?: ProductsQueryFilters;
    pagination?: ProductsQueryPagination;
    sort?: Partial<{
        [key in keyof Product]: 'asc' | 'desc';
    }>;
}
