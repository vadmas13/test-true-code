import { Button, Form, FormInstance, Input, Space } from "antd";
import { FC, useState } from "react";
import {
  validateProductFilterValues,
  ProductsFormFilters,
  getProductFormFilters,
} from "@entities";
import { ErrorMessage, typography, PriceRange } from "@shared";

export type ProductFilterFormProps = {
  onSubmit: (filters: ProductsFormFilters) => void;
  onCancel: () => void;
  priceRange: [number, number];
  initialData?: ProductsFormFilters;
  form: FormInstance;
};

const ProductFilterForm: FC<ProductFilterFormProps> = ({
  onSubmit,
  priceRange,
  initialData,
  onCancel,
  form,
}) => {
  const [errors, setErrors] = useState<
    Record<keyof ProductsFormFilters, string> | undefined
  >(undefined);
  const [min, max] = priceRange;

  const onFinish = () => {
    const values = getProductFormFilters(form);
    const data = validateProductFilterValues(values, { setErrors });
    if (data) {
      onSubmit(data);
    }
  };

  const onReset = () => {
    form.setFieldValue("article", undefined);
    form.setFieldValue("minPrice", undefined);
    form.setFieldValue("maxPrice", undefined);
    onCancel();
    setErrors(undefined);
  };

  return (
    <div className="mb-4">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialData}
      >
        <Form.Item name="article" label="Артикул">
          <Input
            placeholder={typography.form.placeholder.input}
            type="number"
          />
        </Form.Item>
        <ErrorMessage message={errors?.article} />
        <Form.Item label="Стоимость" shouldUpdate>
          {({ getFieldValue, setFieldValue }) => (
            <PriceRange
              max={max}
              min={min}
              onChange={([minPrice, maxPrice]) => {
                setFieldValue("minPrice", minPrice);
                setFieldValue("maxPrice", maxPrice);
              }}
              value={[getFieldValue("minPrice"), getFieldValue("maxPrice")]}
            />
          )}
        </Form.Item>
        <ErrorMessage message={errors?.minPrice ?? errors?.maxPrice} />
        <Form.Item>
          <Space className="float-right">
            <Button type="primary" htmlType="submit">
              Применить
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Отменить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductFilterForm;
