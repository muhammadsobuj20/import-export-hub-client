import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AllProducts from "../pages/AllProducts";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../pages/ProductDetails";
import MyImports from "../pages/MyImports";
import MyExports from "../pages/MyExports";
import Loader from "../components/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <Loader />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-product",
        element: <AllProducts />,
      },

      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-exports",
        element: (
          <PrivateRoute>
            <MyExports />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-imports",
        element: (
          <PrivateRoute>
            <MyImports />
          </PrivateRoute>
        ),
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
