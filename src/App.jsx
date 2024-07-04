import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductList from "./compoments/ProductList";
import Layout from "./compoments/Layout";
import AddPage from "./compoments/FormAdd";
import ProductManagement from "./compoments/product-management";
import ProductDetails from "./compoments/ProductDetails";
import EditPage from "./compoments/EditPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProductList />,
        },
        {
          path: "/add-page",
          element: <AddPage />,
        },
        {
          path: "/product-list-management",
          element: <ProductManagement />,
        },
        {
          path: "/product-details/:id",
          element: <ProductDetails />,
        },
        {
          path: "/edit/:id",
          element: <EditPage />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
