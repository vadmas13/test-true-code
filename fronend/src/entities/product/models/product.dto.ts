export interface ProductDto {
  id: string;
  name: string;
  description?: string;
  price: number;
  article: number;
  discountedPrice?: number;
  photoBytes?: Buffer;
  minPrice: number;
  updatedAt: string;
  createdAt: string;
}

export interface ProductModel extends Omit<ProductDto, "photoBytes"> {
  imageUrl?: string;
}
