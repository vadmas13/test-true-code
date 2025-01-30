import { ProductsQueryPagination } from '../models';

export const defaultProductPagination: ProductsQueryPagination = {
    page: 1,
    pageSize: 10,
};

export const productCacheKey = 'productsCache';
