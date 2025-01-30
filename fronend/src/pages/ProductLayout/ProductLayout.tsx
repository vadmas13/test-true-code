import { ArrowLeftOutlined } from "@ant-design/icons";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

export const ProductLayout: FC = () => {
  return (
    <div className="p-6 h-full">
      <Link
        to="/"
        className="flex items-center gap-3 transition duration-300 transform hover:scale-97 "
      >
        <ArrowLeftOutlined className="text-2xl transform transition duration-300" />
        <span className="text-lg font-semibold transition duration-300 !text-gray-500">
          К списку товаров
        </span>
      </Link>
      <div className="mt-6 bg-white rounded-lg shadow-md p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default ProductLayout;
