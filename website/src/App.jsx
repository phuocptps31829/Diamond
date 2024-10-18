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
import NewsListPage from "./pages/admin/News";
import BranchesListPage from "./pages/admin/Branches";
import AppointmentsListPage from "./pages/admin/Appointments";
import AppointmentsFormPage from "./pages/admin/Appointments/add";
import AppointmentsDetailPage from "./pages/admin/Appointments/detail";
import ProtectContainer from "./layouts/protect/ProtectContainer";
import PaymentSuccess from "./pages/client/PaymentSuccess";
import ClinicsListPage from "./pages/admin/Clinics";
import DoctorsFormPage from "./pages/admin/Doctor/form";
import DoctorsListPage from "./pages/admin/Doctor";
import PatientsListPage from "./pages/admin/Patient";
import PatientsFormAddPage from "./pages/admin/Patient/formAdd";
import PatientsFormFixPage from "./pages/admin/Patient/formFix";
import StaffsFormPage from "./pages/admin/Staff/form";
import StaffsListPage from "./pages/admin/Staff";
import SerivesListPage from "./pages/admin/Services/indexServicePage";
import PackagesListPage from "./pages/admin/Packages";
import PackagesFormAddPage from "./pages/admin/Packages/formAdd";
import PackagesFormFixPage from "./pages/admin/Packages/formFix";
import MedicinesListPage from "./pages/admin/Medicine";
import MedicinesCategoriesListPage from "./pages/admin/MedicinesCategories";
import MedicinesCategoriesFormAddPage from "./pages/admin/MedicinesCategories/formAdd";
import MedicinesFormAddPage from "./pages/admin/Medicine/formAdd";
import AuthPage from "./pages/admin/Auth";
import ListRolePage from "./pages/admin/Roles/ListRolePage";
import CreateRolePage from "./pages/admin/Roles/CreateRolePage";
import SpecialtiesListPage from "./pages/admin/Specialty";
import SpecialtiesFormPage from "./pages/admin/Specialty/form";
import UpdateRolePage from "./pages/admin/Roles/UpdateRolePage";
import AppointmentsAddPage from "./pages/admin/Appointments/add";
import ServicesListPage from "./pages/admin/Services/indexServicePage";
import NewsAddPage from "./pages/admin/News/add";
import NewsEditPage from "./pages/admin/News/edit";
import BranchesAddPage from "./pages/admin/Branches/add";
import BranchesEditPage from "./pages/admin/Branches/edit";
import ServicesAddPage from "./pages/admin/Services/add";
import ServicesEditPage from "./pages/admin/Services/edit";
import AppointmentsEditPage from "./pages/admin/Appointments/edit";
import SpecialtiesEditFormPage from "./pages/admin/Specialty/editForm";
import DoctorsEditFormPage from "./pages/admin/Doctor/editForm";
import ClinicsAddPage from "./pages/admin/Clinics/add";
import ClinicsEditPage from "./pages/admin/Clinics/edit";
import ServicesDetailPage from "./pages/admin/Services/detail";
import NewsDetailPage from "./pages/admin/News/detail";

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
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "doctor-detail/:id",
        element: <DoctorDetail />,
      },
      {
        path: "user-profile",
        element: (
          <ProtectContainer type="client">
            <UserProfileLayout />
          </ProtectContainer>
        ),
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
        element: (
          <ProtectContainer>
            <PackageBooking />
          </ProtectContainer>
        ),
      },
      {
        path: "services-booking",
        element: (
          <ProtectContainer>
            <ServicesBooking />
          </ProtectContainer>
        ),
      },
      {
        path: "package-booking-checkout",
        element: (
          <ProtectContainer>
            <PKCheckOut />
          </ProtectContainer>
        ),
      },
      {
        path: "services-booking-checkout",
        element: (
          <ProtectContainer>
            <SVCheckOut />
          </ProtectContainer>
        ),
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
    path: "/admin/auth",
    element: <AuthPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectContainer type="admin">
        <AdminLayout />
      </ProtectContainer>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "services/list",
        element: <SerivesListPage />,
      },
      {
        path: "services/create",
        element: <ServicesAddPage />,
      },
      {
        path: "packages/list",
        element: <PackagesListPage />,
      },
      {
        path: "packages/create",
        element: <PackagesFormAddPage />,
      },
      {
        path: "packages/edit/:id",
        element: <PackagesFormFixPage />,
      },
      {
        path: "medicines/list",
        element: <MedicinesListPage />,
      },
      {
        path: "medicinesCategories/list",
        element: <MedicinesCategoriesListPage />,
      },
      {
        path: "medicinesCategories/create",
        element: <MedicinesCategoriesFormAddPage />,
      },
      {
        path: "medicines/create",
        element: <MedicinesFormAddPage />,
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
        element: <DoctorsListPage />,
      },
      {
        path: "doctors/create",
        element: <DoctorsFormPage />,
      },
      {
        path: "doctor/edit/:id",
        element: <DoctorsEditFormPage />,
      },
      {
        path: "patients/list",
        element: <PatientsListPage />,
      },
      {
        path: "patients/create",
        element: <PatientsFormAddPage />,
      },
      {
        path: "patients/edit/:id",
        element: <PatientsFormFixPage />,
      },
      {
        path: "staffs/list",
        element: <StaffsListPage />,
      },
      {
        path: "staffs/create",
        element: <StaffsFormPage />,
      },
      {
        path: "specialties/list",
        element: <SpecialtiesListPage />,
      },
      {
        path: "specialties/create",
        element: <SpecialtiesFormPage />,
      },
      {
        path: "specialty/edit/:id",
        element: <SpecialtiesEditFormPage />,
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
        element: <NewsAddPage />,
      },

      {
        path: "news/edit/:id",
        element: <NewsEditPage />,
      },
      {
        path: "news/detail/:id",
        element: <NewsDetailPage />,
      },

      {
        path: "branches/list",
        element: <BranchesListPage />,
      },
      {
        path: "branches/create",
        element: <BranchesAddPage />,
      },
      {
        path: "branches/edit/:id",
        element: <BranchesEditPage />,
      },
      {
        path: "appointments/list",
        element: <AppointmentsListPage />,
      },
      {
        path: "appointments/create/:id",
        element: <AppointmentsAddPage />,
      },
      {
        path: "appointments/edit/:id",
        element: <AppointmentsEditPage />,
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
        path: "clinics/list",
        element: <ClinicsListPage />,
      },
      {
        path: "clinics/create",
        element: <ClinicsAddPage />,
      },
      {
        path: "clinics/edit/:id",
        element: <ClinicsEditPage />,
      },

      {
        path: "roles/list",
        element: <ListRolePage />,
      },
      {
        path: "roles/create",
        element: <CreateRolePage />,
      },
      {
        path: "roles/update/:id",
        element: <UpdateRolePage />,
      },
      {
        path: "services/list",
        element: <ServicesListPage />,
      },
      {
        path: "services/create",
        element: <ServicesAddPage />,
      },
      {
        path: "services/detail/:id",
        element: <ServicesDetailPage />,
      },

      {
        path: "services/edit/:id",
        element: <ServicesEditPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
