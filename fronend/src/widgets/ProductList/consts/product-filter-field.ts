import { ProductsQueryFilters } from "@entities";

export const productFilterFormFields: (keyof ProductsQueryFilters)[] = [
  "article",
  "maxPrice",
  "minPrice",
];

export const allFilterFields = [
  ...productFilterFormFields,
  "name",
  "sort",
  "page",
  "pageSize",
];

export const emptyFilterFormValues = productFilterFormFields.reduce(
  (res, curr) => {
    res[curr] = undefined;
    return res;
  },
  {} as Record<string, undefined>,
);

export const emptyAllFilterValues = allFilterFields.reduce((res, curr) => {
  res[curr] = undefined;
  return res;
}, {} as Record<string, undefined>);
