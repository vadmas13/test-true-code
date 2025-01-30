import { useQuery } from "@tanstack/react-query";
import { ProductList } from "@widgets";
import { FC } from "react";
import { useProductFilterQueryParams } from "../hooks";
import { QueryKey } from "@shared";
import { getPriceRange, getProductList } from "@entities";
import { Spin } from "antd";

const ProductListPage: FC = () => {
  //const queryClient = useQueryClient();

  const { validParams, mappedQueryString } = useProductFilterQueryParams();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.ProductList, mappedQueryString],
    queryFn: () => getProductList(mappedQueryString),
  });

  const { data: priceRange } = useQuery({
    queryKey: [QueryKey.ProductAttributes],
    queryFn: getPriceRange,
  });

  return (
    <Spin spinning={isLoading}>
      <ProductList
        initialFilter={validParams}
        data={data?.data}
        priceRange={priceRange?.data}
        isLoading={isLoading}
      />
    </Spin>
  );
};

export default ProductListPage;
