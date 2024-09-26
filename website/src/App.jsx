import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import ChangePassword from "./components/client/infomationUser/ChangePassword";
import AppointmentDetail from "./components/client/infomationUser/AppointmentDetail";
import MedicalRecordDetail from "./components/client/infomationUser/MedicalRecordDetail";
import NotFound from "@/components/client/notFound";
import PackageBooking from "./pages/client/PackageBooking";
import ServicesBooking from "./pages/client/ServicesBooking";
import PKCheckOut from "./pages/client/PKBookingPayment";
import SVCheckOut from "./pages/client/SVBookingPayment";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import AdminLayout from "./layouts/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ScheduleTablePage from "./pages/admin/ScheduleTable";
import ScheduleDetailsPage from "./pages/admin/ScheduleDetails";
import DoctorDashboard from "./pages/admin/DoctorDashboard";
import DoctorList from "./pages/admin/DoctorList";
import PatientList from "./pages/admin/PatientList";
import StaffList from "./pages/admin/StaffList";
import AddDoctor from "./pages/admin/AddDoctor";
import AddStaff from "./pages/admin/AddStaff";
import AddPatient from "./pages/admin/AddPatient";
import NewsListPage from "./pages/admin/News";
import NewsFormPage from "./pages/admin/News/form";
import BranchesListPage from "./pages/admin/Branches";
import BranchesFormPage from "./pages/admin/Branches/form";
import AppointmentsListPage from "./pages/admin/Appointments";
import AppointmentsFormPage from "./pages/admin/Appointments/form";
import AppointmentsDetailPage from "./pages/admin/Appointments/detail";
import ClinicList from "./pages/admin/ClinicList";
import AddClinic from "./pages/admin/AddClinic";
import ProtectContainer from "./layouts/protect/ProtectContainer";

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
        path: "services/:specialtyId?",
        element: <CategoryService />,
      },
      {
        path: "packages/:specialtyId?",
        element: <CategoryService />,
      },
      {
        path: "detail-service/:serviceId",
        element: <DetailService />,
      },
      {
        path: "detail-package/:packageId",
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
        element: <ProtectContainer>
          <UserProfileLayout />
        </ProtectContainer>,
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
            path: "medical-records/detail/:id",
            element: <MedicalRecordDetail />,
          },
          {
            path: "appointment-history",
            element: <AppointmentHistory />,
          },
          {
            path: "appointment-history/detail/:id",
            element: <AppointmentDetail />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "package-booking",
        element: <ProtectContainer>
          <PackageBooking />
        </ProtectContainer>,
      },
      {
        path: "services-booking",
        element: <ProtectContainer>
          <ServicesBooking />
        </ProtectContainer>,
      },
      {
        path: "package-booking-checkout",
        element: <ProtectContainer>
          <PKCheckOut />
        </ProtectContainer>,
      },
      {
        path: "services-booking-checkout",
        element: <ProtectContainer>
          <SVCheckOut />
        </ProtectContainer>,
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
        path: "/accuracy",
        element: <Accuracy />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/changepassword-accuracy",
        element: <ChangePassAccuracy />,
      },
      {
        path: "/change-password",
        element: <ChangePass />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "doctordashboard",
        element: <DoctorDashboard />,
      },
      {
        path: "schedules/list",
        element: <ScheduleTablePage />,
      },
      {
        path: "schedules/details",
        element: <ScheduleDetailsPage />,
      },
      {
        path: "doctors/list",
        element: <DoctorList />,
      },
      {
        path: "doctors/create",
        element: <AddDoctor />,
      },
      {
        path: "patients/list",
        element: <PatientList />,
      },
      {
        path: "patients/create",
        element: <AddPatient />,
      },
      {
        path: "staffs/list",
        element: <StaffList />,
      },
      {
        path: "staffs/create",
        element: <AddStaff />,
      },
      {
        path: "patients/list",
        element: <Dashboard />,
      },
      {
        path: "news/list",
        element: <NewsListPage />,
      },
      {
        path: "news/create",
        element: <NewsFormPage />,
      },
      {
        path: "news/edit/:id",
        element: <NewsFormPage />,
      },
      {
        path: "branches/list",
        element: <BranchesListPage />,
      },
      {
        path: "branches/create",
        element: <BranchesFormPage />,
      },
      {
        path: "branches/edit/:id",
        element: <BranchesFormPage />,
      },
      {
        path: "appointments/list",
        element: <AppointmentsListPage />,
      },
      {
        path: "appointments/create",
        element: <AppointmentsFormPage />,
      },
      {
        path: "appointments/detail/:id",
        element: <AppointmentsDetailPage />,
      },

      {
        path: "appointments/edit/:id",
        element: <AppointmentsFormPage />,
      },
      {
        path: 'staffs/create',
        element: <AddStaff />
      },
      {
        path: 'clinics/list',
        element: <ClinicList />
      },
      {
        path: 'clinics/create',
        element: <AddClinic />
      }
    ],
  },
]);

function App() {
  return (
    <Provider store={ store }>
      <RouterProvider router={ router }></RouterProvider>
    </Provider>
  );
}

export default App;
