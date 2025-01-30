import { bufferToUrl } from "@shared";
import { ProductDto, ProductModel } from "../models";

export const mapProduct = ({
  photoBytes,
  ...dto
}: ProductDto): ProductModel => {
  return {
    ...dto,
    imageUrl: photoBytes
      ? bufferToUrl(
          // TODO: не нашел тип верный, поэтому приведение к any
          new Uint8Array((photoBytes as any).data).buffer,
          "image/jpeg",
        )
      : undefined,
  };
};
