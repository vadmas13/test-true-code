import { FC } from "react";
import { ProductFilterFormProps } from "./ProductFilterForm";
import { Drawer } from "antd";
import ProductFilterForm from "./ProductFilterForm";

type ProductFilterProps = {
  open: boolean;
  onClose: () => void;
} & ProductFilterFormProps;

const ProductFilter: FC<ProductFilterProps> = ({
  open,
  onClose,
  ...formProps
}) => {
  return (
    <Drawer
      title="Дополнительные фильтры"
      placement="top"
      closable
      onClose={onClose}
      open={open}
    >
      <ProductFilterForm {...formProps} />
    </Drawer>
  );
};

export default ProductFilter;
