import { FC } from "react";
import "../styles/common.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ProductCreatePage,
  ProductLayout,
  ProductListPage,
  ProductPage,
} from "@pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: FC = () => {
  const queryClient = new QueryClient();
  return (
    <div className="container mx-auto p-4">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="product" element={<ProductLayout />}>
              <Route path="create" element={<ProductCreatePage />} />
              <Route path=":id" element={<ProductPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
