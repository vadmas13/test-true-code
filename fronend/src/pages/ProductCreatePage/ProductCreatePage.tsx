import { createProduct, ProductForm, ProductUpsertDto } from "@entities";
import { Title } from "@shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const ProductCreatePage: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      queryClient.invalidateQueries();
      navigate("/");
    },
  });

  const onSubmit = (data: ProductUpsertDto) => {
    mutate(data);
  };

  return (
    <div>
      <Title title="Создание товара" />
      <Spin spinning={isPending}>
        <ProductForm
          onSubmit={onSubmit}
          backErrorMsg={isError ? (error as any) : undefined}
          isCreate
        />
      </Spin>
    </div>
  );
};

export default ProductCreatePage;
