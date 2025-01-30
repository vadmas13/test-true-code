import { FileType } from "@shared";
import { UploadFile } from "antd";

export const bufferToUrl = (buffer: ArrayBuffer, mimeType: string): string => {
  const blob = new Blob([buffer], { type: mimeType });
  return URL.createObjectURL(blob);
};

export const fileToBuffer = async (file: File): Promise<Buffer> => {
  return Buffer.from(await file.arrayBuffer());
};

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getImageUrl = async (file: UploadFile) => {
  let url = file.url;
  if (!url) {
    url = await new Promise<string | undefined>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as Blob);
      reader.onload = () => resolve(reader.result as string);
    });
  }

  return url;
};

// export const uploadImage = async (file: File): Promise<ImageUploadItem> => {
//   return {
//     key: uuidv4(),
//     url: URL.createObjectURL(file),
//     extra: file,
//   };
// };
