import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../screens/Home";
import NotFound from "../screens/NotFound";
import AboutUs from "../screens/AboutUs";
import Blog from "../screens/Blog";
import Contact from "../screens/Contact";
import ProductPage from "../screens/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path:"/blog",
        element: <Blog />
      },
      {
        path:"/products",
        element: <ProductPage />
      },
      {
        path:"/contact",
        element: <Contact />
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
