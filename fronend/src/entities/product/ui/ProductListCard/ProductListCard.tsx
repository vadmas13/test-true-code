import { ProductModel } from "../../models";
import { Card } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

type ProductListCardProps = {
  product: ProductModel;
};

const ProductListCard: FC<ProductListCardProps> = ({ product }) => {
  console.log("product.description", product.description);
  return (
    <Link to={`product/${product.id}`}>
      <Card
        key={product.id}
        title={product.name}
        cover={
          <div className="relative w-full h-64">
            <img
              alt={product.name}
              src={product.imageUrl ?? "/404-image.jpg"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        }
        className="flex flex-col h-full rounded-lg overflow-hidden transition-transform transform hover:scale-105"
      >
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h4 className="text-md  text-gray-500 mb-2">
            Артикул: {product.article}
          </h4>

          <div className="flex justify-between items-center">
            {product.discountedPrice && (
              <p className="text-xl font-bold text-green-600">
                ${product.discountedPrice}
              </p>
            )}
            <p className="text-xl font-bold text-gray-800">${product.price}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductListCard;
