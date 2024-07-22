import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/client/AppLayout";
import Home from "./pages/client/Home";
import SpecialtiesCategory from "./pages/client/Specialties";
import CategoryService from "./pages/client/CategoryService";
import DetailService from "./pages/client/DetailService";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "specialties",
        element: <SpecialtiesCategory />,
      },
      {
        path: "category-service",
        element: <CategoryService />,
      },
      {
        path: "detail-service/:id",
        element: <DetailService />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
