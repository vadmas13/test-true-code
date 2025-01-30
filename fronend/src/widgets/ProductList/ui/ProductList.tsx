import React, { FC, useMemo, useState } from "react";
import { Button, Empty, Form, Pagination } from "antd";
import {
  ProductAttributesDto,
  ProductDto,
  ProductListCard,
  ProductModel,
  ProductsFormFilters,
  ProductsQueryFilters,
  SortSegmentOptionKey,
} from "@entities";
import {
  defaultPagination,
  objectToQueryString,
  pageSizerOptions,
  PaginationDto,
  Title,
} from "@shared";
import { ProductFilter, SearchBar } from "@features";
import { Link, useNavigate } from "react-router-dom";
import {
  allFilterFields,
  emptyFilterFormValues,
  productFilterFormFields,
} from "../consts";
import { AppstoreAddOutlined } from "@ant-design/icons";

type ProductListProps = {
  isLoading: boolean;
  initialFilter?: ProductsQueryFilters;
  data?: PaginationDto<ProductModel>;
  priceRange?: ProductAttributesDto;
};

const ProductList: FC<ProductListProps> = ({
  initialFilter,
  data,
  priceRange,
  isLoading,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filterOpen, setFilterOpen] = useState(false);

  const onSubmitFilter = (filters: ProductsFormFilters) => {
    const queryString = objectToQueryString({ ...initialFilter, ...filters });
    navigate(queryString);
    setFilterOpen(false);
  };

  const onFiltersCancel = () => {
    setFilterOpen(false);
    productFilterFormFields.forEach((key) => {
      form.setFieldValue(key, undefined);
    });
    const queryString = objectToQueryString({
      ...initialFilter,
      ...emptyFilterFormValues,
    });
    navigate(queryString);
  };

  const onResetAllFilters = () => {
    allFilterFields.forEach((key) => {
      form.setFieldValue(key, undefined);
    });
    navigate("/");
  };

  const onSearchProduct = (name: string) => {
    const queryString = objectToQueryString({ ...initialFilter, name });
    navigate(queryString);
  };

  const onChangePagination = (page: number, pageSize: number) => {
    const queryString = objectToQueryString({
      ...initialFilter,
      page,
      pageSize,
    });
    navigate(queryString);
  };

  const onChangeSort = (sort: SortSegmentOptionKey) => {
    const queryString = objectToQueryString({ ...initialFilter, sort });
    navigate(queryString);
  };

  const filterCount = useMemo(() => {
    if (!initialFilter) {
      return 0;
    }

    return Object.keys(initialFilter).filter((x) =>
      productFilterFormFields.includes(x as keyof ProductsQueryFilters),
    ).length;
  }, [initialFilter]);

  return (
    <>
      <div className="flex justify-between mb-4">
        <Title title="Список товаров" />
        <Link to={"/product/create"}>
          <Button type="primary" icon={<AppstoreAddOutlined />}>
            Создать товар
          </Button>
        </Link>
      </div>
      <SearchBar
        onClickFilters={() => setFilterOpen(true)}
        filterCount={filterCount}
        initialData={initialFilter}
        onChange={onSearchProduct}
        onChangeSort={onChangeSort}
        onResetAllFilters={onResetAllFilters}
      />
      <div className="grid grid-cols-2 align-middle gap-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.data.map((product: ProductDto) => (
          <ProductListCard product={product} key={product.id} />
        ))}
      </div>
      {!data?.data.length && !isLoading && (
        <div className="flex justify-center w-full">
          <Empty description="Товары не найдены" />
        </div>
      )}
      <div className="mt-5">
        <Pagination
          current={initialFilter?.page ?? defaultPagination.page}
          total={data?.totalCount}
          onChange={onChangePagination}
          pageSize={initialFilter?.pageSize ?? defaultPagination.pageSize}
          pageSizeOptions={pageSizerOptions}
          showSizeChanger
        />
      </div>
      <ProductFilter
        onCancel={onFiltersCancel}
        initialData={initialFilter}
        onClose={() => setFilterOpen(false)}
        open={filterOpen}
        onSubmit={onSubmitFilter}
        priceRange={[priceRange?.minPrice ?? 0, priceRange?.maxPrice ?? 500]}
        form={form}
      />
    </>
  );
};

export default ProductList;
