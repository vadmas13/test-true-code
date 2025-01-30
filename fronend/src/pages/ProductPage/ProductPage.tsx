import {
  deleteProduct,
  getProductById,
  ProductForm,
  ProductUpsertDto,
  updateProduct,
} from "@entities";
import { QueryKey, Title } from "@shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Popconfirm, Spin } from "antd";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage: FC = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error: errorPage,
  } = useQuery({
    queryKey: [QueryKey.Product, id],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: updateProduct,
    onSuccess: async () => {
      queryClient.invalidateQueries();
      navigate("/");
    },
  });

  const {
    mutate: deleteMutation,
    isPending: deletePending,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      queryClient.invalidateQueries();
      navigate("/");
    },
  });

  const onSubmit = (dto: ProductUpsertDto) => {
    mutate({ ...dto, id });
  };

  return (
    <div>
      <div className="flex justify-between">
        <Title title="Редактирование товара" />
        <Popconfirm
          title="Удалить товар"
          description="Действительно хотите удалить товар?"
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onConfirm={() => deleteMutation(id!)}
          okText="Да"
          cancelText="Нет"
        >
          <Button danger>Удалить товар</Button>
        </Popconfirm>
      </div>
      <Spin spinning={isPending || isLoading || deletePending}>
        {!isLoading && (
          <ProductForm
            onSubmit={onSubmit}
            backErrorMsg={isError ? (error as any) : undefined}
            initialData={data?.data}
          />
        )}
      </Spin>
      {(errorPage || deleteError) && (
        <div className="mb-2 mt-2">
          <Alert
            message={(errorPage ?? deleteError) as any}
            showIcon
            type="error"
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
