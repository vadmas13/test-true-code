import { ProductsQuerySort } from "../models";

export enum SortSegmentOptionKey {
  New = "new",
  Cheapest = "cheapest",
  Expensive = "expensive",
}

export const mapSegmentOptionToSort: Record<
  SortSegmentOptionKey,
  ProductsQuerySort
> = {
  [SortSegmentOptionKey.New]: {
    sortBy: "createdAt",
    sortType: "desc",
  },
  [SortSegmentOptionKey.Cheapest]: {
    sortBy: "minPrice",
    sortType: "asc",
  },
  [SortSegmentOptionKey.Expensive]: {
    sortBy: "minPrice",
    sortType: "desc",
  },
};
