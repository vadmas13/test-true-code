import { mapSegmentOptionToSort } from "../consts";
import {
  ProductDto,
  ProductsQueryFilters,
  ProductsQueryFiltersDto,
} from "../models";
import { mapProduct } from "./product.mapper";

export const mapProductListFilters = ({
  sort,
  ...filters
}: ProductsQueryFilters): ProductsQueryFiltersDto => {
  return {
    ...filters,
    ...(sort ? mapSegmentOptionToSort[sort] : {}),
  };
};

export const mapProductListDto = (dtos: ProductDto[]) => dtos.map(mapProduct);
