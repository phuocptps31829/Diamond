import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/client/AppLayout";
import Home from "./pages/client/Home";
import News from "./pages/client/News";
import AboutUs from "./pages/client/AboutUs";

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
        path: "news",
        element: <News />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
