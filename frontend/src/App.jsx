import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/client/AppLayout";
import Home from "./pages/client/Home";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import Accuracy from "./pages/client/Accuracy";
import ForgetPassword from "./pages/client/ForgetPassWord";
import ChangePassAccuracy from "./pages/client/ChangePassAccuracy";
import ChangePass from "./pages/client/ChangePass";
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
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/accuracy',
        element: <Accuracy />
      },
      {
        path: '/forget-password',
        element: <ForgetPassword />
      },
      {
        path: '/changepassword-accuracy',
        element: <ChangePassAccuracy />
      },
      {
        path: '/change-password',
        element: <ChangePass />
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={ router } />;
}

export default App;
