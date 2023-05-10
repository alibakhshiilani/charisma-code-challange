import { createBrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import MainLayout from "../../layouts/MainLayout";

const homeRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];

export default homeRoutes;
