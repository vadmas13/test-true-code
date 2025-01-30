import { Request } from 'express';
import { ProductsQueryParams } from '../models';
import { toNumber } from 'lodash';
import { defaultProductPagination } from '@product/consts';

export const mapProductsQueryParams = (queryParams: Request['query']): ProductsQueryParams => {
    return {
        filters: {
            name: queryParams.name ? queryParams.name.toString() : undefined,
            minPrice: queryParams.minPrice ? toNumber(queryParams.minPrice) : undefined,
            maxPrice: queryParams.maxPrice ? toNumber(queryParams.maxPrice) : undefined,
            article: queryParams.article ? toNumber(queryParams.article) : undefined,
        },
        pagination: {
            page: queryParams.page ? toNumber(queryParams.page) : defaultProductPagination.page,
            pageSize: queryParams.pageSize
                ? toNumber(queryParams.pageSize)
                : defaultProductPagination.pageSize,
        },
        sort: queryParams.sortBy
            ? {
                  [queryParams.sortBy.toString()]: queryParams.sortType ?? 'asc',
              }
            : {
                  createdAt: 'desc',
              },
    };
};
