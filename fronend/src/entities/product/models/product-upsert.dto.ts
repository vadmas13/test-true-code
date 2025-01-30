export interface ProductUpsertDto extends Record<string, unknown> {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  article?: number;
  discountedPrice?: number;
  file?: File;
}
