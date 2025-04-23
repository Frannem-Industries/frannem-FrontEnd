import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../screens/Home";
import NotFound from "../screens/NotFound";
import AboutUs from "../screens/AboutUs";
import Blog from "../screens/Blog";
import ViewBlog from "../components/Blog/ViewBlog";
import Contact from "../screens/Contact";
import Product from "../components/products/Product";
import CategoryDisplay from "../screens/CategoryDisplay";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import Orders from "../screens/Orders";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/proile",
        element: <Profile />,
      },
      {
        path: "/order",
        element: <Orders />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <ViewBlog />,
      },
      {
        path:"/product/:id",
        element:<Product />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path:"/category/:id",
        element: <CategoryDisplay />,
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
