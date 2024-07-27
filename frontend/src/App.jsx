import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/client/AppLayout";
import Home from "./pages/client/Home";
import SpecialtiesCategory from "./pages/client/Specialties";
import CategoryService from "./pages/client/CategoryService";
import DetailService from "./pages/client/DetailService";
import News from "./pages/client/News";
import AboutUs from "./pages/client/AboutUs";
import Contact from "./pages/client/Contact";
import Doctors from "./pages/client/Doctors";
import DoctorDetail from "./pages/client/DoctorDetail";
import NewsDetail from "./pages/client/NewsDetail";
import TablePriceService from "./pages/client/TablePriceService";
import UserProfileLayout from "./pages/client/UserProfile";
import MedicalRecords from "./components/client/infomationUser/MedicalRecords";
import UserInfoForm from "./components/client/infomationUser/UserInfoForm";
import AppointmentHistory from "./components/client/infomationUser/AppointmentHistory";

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
      {
        path: "price-service",
        element: <TablePriceService />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "news-detail/:id",
        element: <NewsDetail />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
      {
        path: "doctor-detail/:id",
        element: <DoctorDetail />,
      },
      {
        path: "user-profile",
        element: <UserProfileLayout />,
        children: [
          {
            path: "",
            element: <UserInfoForm />,
          },
          {
            path: "medical-records",
            element: <MedicalRecords />,
          },
          {
            path: "appointment-history",
            element: <AppointmentHistory />,
          },
        ],
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
      }
    ]
  }]
);

function App() {
  return <RouterProvider router={ router }></RouterProvider>;
}

export default App;
