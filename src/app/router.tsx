import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import PropertiesPage from "../features/properties/pages/PropertiesPage";
import PropertyDetailPage from "../features/properties/pages/PropertyDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PropertiesPage /> },
      { path: "property/:id", element: <PropertyDetailPage /> },
    ],
  },
]);
