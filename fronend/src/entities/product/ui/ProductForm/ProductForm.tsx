import { ErrorMessage, ImageUpload, typography } from "@shared";
import { ProductModel, ProductUpsertDto } from "../../models";
import { Input, Form, Space, Button, Alert } from "antd";
import { FC, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { getProductUpsertForm, validateProductUpsertValues } from "@entities";
import { useNavigate } from "react-router-dom";

type ProductFormProps = {
  initialData?: ProductModel;
  onSubmit: (data: ProductUpsertDto) => void;
  backErrorMsg?: string;
  isCreate?: boolean;
};

const ProductForm: FC<ProductFormProps> = ({
  onSubmit,
  initialData,
  backErrorMsg,
  isCreate,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<
    Record<keyof ProductUpsertDto, string> | undefined
  >(undefined);

  const onFinish = () => {
    const values = getProductUpsertForm(form);
    const data = validateProductUpsertValues(values, { setErrors });

    if (data) {
      const file = form.getFieldValue("file");
      if (file) {
        data.file = file?.originFileObj;
      }
      onSubmit(data);
    }
  };

  const onReset = () => {
    form.resetFields();
    navigate("/");
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={initialData}
      layout="vertical"
    >
      <div className="grid grid-cols-2 align-middle gap-4">
        <div>
          <Form.Item name="name" label="Наименование" required>
            <Input placeholder={typography.form.placeholder.input} />
          </Form.Item>
          <ErrorMessage message={errors?.name} />
        </div>
        <div>
          <Form.Item name="article" label="Артикул" required>
            <Input
              placeholder={typography.form.placeholder.input}
              type="number"
            />
          </Form.Item>
          <ErrorMessage message={errors?.article} />
        </div>
        <div>
          <Form.Item name="price" label="Цена" required>
            <Input
              placeholder={typography.form.placeholder.input}
              type="number"
            />
          </Form.Item>
          <ErrorMessage message={errors?.price} />
        </div>
        <div>
          <Form.Item name="discountedPrice" label="Цена со скидкой">
            <Input
              placeholder={typography.form.placeholder.input}
              type="number"
            />
          </Form.Item>
          <ErrorMessage message={errors?.discountPrice} />
        </div>
        <div>
          <Form.Item name="description" label="Описание">
            <TextArea
              rows={4}
              placeholder={typography.form.placeholder.input}
            />
          </Form.Item>
          <ErrorMessage message={errors?.description} />
        </div>
        <Form.Item label="Изображение" shouldUpdate>
          {({ getFieldValue, setFieldValue }) => (
            <ImageUpload
              fileUrl={getFieldValue("imageUrl")}
              onUpload={(file) => {
                setFieldValue("imageUrl", file?.url);
                setFieldValue("file", file);
              }}
            />
          )}
        </Form.Item>
      </div>
      {backErrorMsg && (
        <div className="mb-2 mt-2">
          <Alert message={backErrorMsg} showIcon type="error" />
        </div>
      )}
      <Form.Item>
        <Space className="float-right">
          <Button type="primary" htmlType="submit">
            {isCreate ? "Создать" : "Обновить"}
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Отменить
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
