import { PlusOutlined } from "@ant-design/icons";
import { FileType, getBase64, getImageUrl } from "@shared";
import { Upload, UploadFile, Image } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { FC, useEffect, useState } from "react";

type ImageUploadProps = {
  fileUrl: string;
  onUpload: (file?: UploadFile) => void;
};

const getDefaultFile = (fileUrl?: string): UploadFile => ({
  uid: "0",
  name: "image",
  status: "done",
  url: fileUrl,
});

const ImageUpload: FC<ImageUploadProps> = ({ fileUrl, onUpload }) => {
  const [file, setFile] = useState<UploadFile | undefined>(undefined);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setFile(getDefaultFile(fileUrl));
  }, [fileUrl]);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList }: UploadChangeParam<UploadFile>) => {
    const lastFile = fileList[fileList.length - 1];
    const url = await getImageUrl(lastFile);
    setFile({ ...lastFile, url, status: "done" });
    onUpload({ ...lastFile, url, status: "done" });
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={file?.url ? [file] : []}
        onChange={handleChange}
        onRemove={() => {
          setFile(undefined);
          onUpload(undefined);
        }}
        onPreview={handlePreview}
      >
        {uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
export default ImageUpload;
