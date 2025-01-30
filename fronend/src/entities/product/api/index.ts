import { axiosInstance, objectToFormData, PaginationDto } from "@shared";
import {
  ProductAttributesDto,
  ProductModel,
  ProductUpsertDto,
} from "../models";
import { mapProduct, mapProductListDto } from "../mappers";
import { AxiosResponse } from "axios";

export const getProductList = (
  queryString?: string,
): Promise<AxiosResponse<PaginationDto<ProductModel>>> => {
  return axiosInstance
    .get<PaginationDto<ProductModel>>(`/product/list${queryString ?? ""}`)
    .then((x) => {
      return {
        ...x,
        data: { ...x.data, data: [...mapProductListDto(x.data.data)] },
      };
    });
};

export const getProductById = (
  id: string,
): Promise<AxiosResponse<ProductModel>> => {
  return axiosInstance.get<ProductModel>(`/product?id=${id}`).then((x) => {
    return {
      ...x,
      data: { ...mapProduct(x.data) },
    };
  });
};

export const createProduct = (
  dto: ProductUpsertDto,
): Promise<AxiosResponse<PaginationDto<ProductModel>>> => {
  return axiosInstance.post<PaginationDto<ProductModel>>(
    "/product",
    objectToFormData(dto),
    { headers: { "Content-Type": "multipart/form-data" } },
  );
};

export const updateProduct = (
  dto: ProductUpsertDto,
): Promise<AxiosResponse<PaginationDto<ProductModel>>> => {
  return axiosInstance.put<PaginationDto<ProductModel>>(
    "/product",
    objectToFormData(dto),
    { headers: { "Content-Type": "multipart/form-data" } },
  );
};

export const deleteProduct = (id: string): Promise<AxiosResponse<unknown>> => {
  return axiosInstance.delete(`/product?id=${id}`);
};

export const getPriceRange = () => {
  return axiosInstance.get<ProductAttributesDto>("/product/priceRange");
};
