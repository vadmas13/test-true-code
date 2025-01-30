import { PaginationDto } from "../../../shared";
import { ProductDto } from "../models";

export const productMock: PaginationDto<ProductDto> = {
  data: [
    {
      id: "5b1a1ca2-8769-4500-bbf3-e49eeff6d5ce",
      name: "Second Product",
      description: undefined,
      price: 1900,
      discountedPrice: undefined,
      article: 132435,
      photoBytes: undefined,
      updatedAt: "2025-01-29T12:26:24.749Z",
      createdAt: "2025-01-29T12:26:24.749Z",
      minPrice: 1900,
    },
    {
      id: "52c0051a-9dc5-4b55-a9e0-fa0a5092967d",
      name: "First Product",
      description: undefined,
      price: 2500,
      discountedPrice: undefined,
      article: 5456456,
      photoBytes: undefined,
      updatedAt: "2025-01-29T12:25:56.777Z",
      createdAt: "2025-01-29T12:25:56.777Z",
      minPrice: 2400,
    },
    {
      id: "5b1a1ca2-8769-4500-bbf3-e49eeff6d5ce12",
      name: "Third Product",
      description: undefined,
      price: 3700,
      discountedPrice: undefined,
      article: 789789,
      photoBytes: undefined,
      updatedAt: "2025-01-29T12:26:24.749Z",
      createdAt: "2025-01-29T12:26:24.749Z",
      minPrice: 3700,
    },
  ],
  totalCount: 2,
  pageSize: 10,
  page: 1,
  lastPage: 1,
};
