import { validateProductFilterValues } from "@entities";
import { mapProductListFilters } from "@entities/product/mappers";
import { objectToQueryString } from "@shared";
import { useSearchParams } from "react-router-dom";

export const useProductFilterQueryParams = () => {
  const [searchParams] = useSearchParams();

  const paramsObject = Object.fromEntries(searchParams.entries());

  const validParams = validateProductFilterValues(paramsObject, {
    alwaysReturnValidValues: true,
  });

  return {
    validParams,
    mappedQueryString: validParams
      ? objectToQueryString(mapProductListFilters(validParams))
      : undefined,
  };
};
