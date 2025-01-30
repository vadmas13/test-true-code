import { ProductsQueryParams } from '../models';
import { defaultProductPagination, productCacheKey } from '../consts';

export const getCashProductKey = (id: string) => {
    return `${productCacheKey}_${id}`;
};

export const isNeedCache = ({ filters, pagination, sort }: ProductsQueryParams) => {
    const isEmptyFilters = Object.values(filters).every((x) => !x);
    const isEmptySort = !sort;
    const isDefaultPagination =
        pagination.page === defaultProductPagination.page &&
        pagination.pageSize === defaultProductPagination.pageSize;
    return isEmptyFilters && isEmptySort && isDefaultPagination;
};
