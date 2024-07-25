import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/client/AppLayout";
import Home from "./pages/client/Home";
import Login from "./pages/client/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={ router } />;
}

export default App;
