import { isDefined } from '@share';
import { ProductsQueryFilters, ProductsQueryPagination } from '../models';

export const getProductListFilters = (
    filters: ProductsQueryFilters,
): Partial<Record<string, unknown>> => {
    const baseFilters: Partial<Record<string, unknown>> = {};

    if (isDefined(filters.name)) {
        baseFilters.name = { contains: filters.name, mode: 'insensitive' };
    }

    if (isDefined(filters.minPrice) || isDefined(filters.maxPrice)) {
        baseFilters.minPrice = { gte: filters.minPrice, lte: filters.maxPrice };
    }

    if (isDefined(filters.article)) {
        baseFilters.article = filters.article;
    }

    return baseFilters;
};

export const getProductListPagination = ({ page, pageSize }: ProductsQueryPagination) => {
    const skip = pageSize * (page - 1);
    return {
        skip,
        take: pageSize,
    };
};
