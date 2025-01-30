import { SortSegmentOptionKey } from "../consts";
import { ProductDto } from "./product.dto";

export type ProductsQueryFilters = {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  article?: number;
  page?: number;
  pageSize?: number;
  sort?: SortSegmentOptionKey;
};

export type ProductsQueryFiltersDto = Omit<ProductsQueryFilters, "sort"> &
  ProductsQuerySort;

export type ProductsFormFilters = Omit<ProductsQueryFilters, "name"> &
  Record<string, unknown>;

export type ProductsQuerySort = {
  sortBy?: keyof ProductDto;
  sortType?: "asc" | "desc";
};
