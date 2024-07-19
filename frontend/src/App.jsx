import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/client/AppLayout";
import Home from "./pages/client/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Home />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={ router } />;
}

export default App;
