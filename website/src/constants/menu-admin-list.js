import { RxDashboard } from "react-icons/rx";
import { FaKitMedical, FaUserDoctor } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarPlus } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { FcDepartment } from "react-icons/fc";
import { IoSettingsSharp } from "react-icons/io5";
import { CgAlignLeft } from "react-icons/cg";
import { GiMedicines } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { FaFileContract } from "react-icons/fa";
export const getMenuList = (pathname) => [
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "DOCTOR", "STAFF_ACCOUNTANT"],
    menus: [
      {
        href: "/admin/dashboard",
        label: "Thống kê",
        active: pathname.includes("/admin/dashboard"),
        icon: RxDashboard,
        submenus: [
          {
            href: "/admin/dashboard",
            label: "Bảng điều khiển quản trị",
            exceptRoles: ["DOCTOR", "STAFF_ACCOUNTANT"],
            active: pathname.includes("/admin/dashboard"),
          },
          {
            href: "/admin/doctor-dashboard",
            label: "Bảng điều khiển bác sĩ",
            exceptRoles: ["STAFF_ACCOUNTANT", "ADMIN", "SUPER_ADMIN"],
            active: pathname.includes("/admin/doctor-dashboard"),
          },
          {
            href: "/admin/accountant-dashboard",
            label: "Bảng điều khiển kế toán",
            exceptRoles: ["DOCTOR"],
            active: pathname.includes("/admin/accountant-dashboard"),
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "STAFF_RECEPTIONIST"],
    menus: [
      {
        href: "/admin/support",
        label: "Hỗ trợ trực tuyến",
        active: pathname.includes("/admin/support"),
        icon: BiSupport,
        submenus: [
          {
            href: "/admin/support",
            label: "Quản lý tin nhắn",
            exceptRoles: ["DOCTOR"],
            active: pathname.includes("/admin/support"),
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "STAFF"],
    menus: [
      {
        href: "",
        label: "Sản phẩm",
        active: pathname === "/admin/products/list",
        icon: FaKitMedical,
        submenus: [
          {
            href: "/admin/packages/list",
            label: "Danh sách gói",
            active: pathname === "/admin/packages/list",
          },
          {
            href: "/admin/services/list",
            label: "Danh sách dịch vụ",
            active: pathname === "/admin/services/list",
          },
          {
            href: "/admin/packages/create",
            label: "Thêm gói",
            active: pathname === "/admin/packages/create",
          },
          {
            href: "/admin/services/create",
            label: "Thêm dịch vụ",
            active: pathname === "/admin/services/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "STAFF"],
    menus: [
      {
        href: "",
        label: "Thuốc",
        active: pathname === "/admin/medicine/list",
        icon: GiMedicines,
        submenus: [
          {
            href: "/admin/medicines-categories/list",
            label: "Danh mục thuốc",
            active: pathname === "/admin/medicines-categories/list",
          },
          {
            href: "/admin/medicines/list",
            label: "Danh sách thuốc",
            active: pathname === "/admin/medicines/list",
          },
          {
            href: "/admin/medicines-categories/create",
            label: "Thêm danh mục thuốc",
            active: pathname === "/admin/medicines-categories/create",
          },
          {
            href: "/admin/medicines/create",
            label: "Thêm thuốc",
            active: pathname === "/admin/medicines/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN"],
    menus: [
      {
        href: "",
        label: "Bác sĩ",
        active: pathname === "/admin/doctors/list",
        icon: FaUserDoctor,
        submenus: [
          {
            href: "/admin/doctors/list",
            label: "Danh sách bác sĩ",
            active: pathname === "/admin/doctors/list",
          },
          {
            href: "/admin/doctors/create",
            label: "Thêm bác sĩ",
            active: pathname === "/admin/doctors/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN"],
    menus: [
      {
        href: "",
        label: "Người dùng",
        active: pathname === "/admin/patients/list",
        icon: IoPeopleSharp,
        submenus: [
          {
            href: "/admin/patients/list",
            label: "Danh sách người dùng",
            active: pathname === "/admin/patients/list",
          },
          {
            href: "/admin/patients/create",
            label: "Thêm người dùng",
            active: pathname === "/admin/patients/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN"],
    menus: [
      {
        href: "",
        label: "Nhân viên",
        active: pathname === "/admin/staffs/list",
        icon: FaUsers,
        submenus: [
          {
            href: "/admin/staffs/list",
            label: "Danh sách nhân viên",
            active: pathname === "/admin/staffs/list",
          },
          {
            href: "/admin/staffs/create",
            label: "Thêm nhân viên",
            active: pathname === "/admin/staffs/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "STAFF"],
    menus: [
      {
        href: "",
        label: "Chuyên khoa",
        active: pathname === "/admin/specialties/list",
        icon: CgAlignLeft,
        submenus: [
          {
            href: "/admin/specialties/list",
            label: "Danh sách chuyên khoa",
            active: pathname === "/admin/specialties/list",
          },
          {
            href: "/admin/specialties/create",
            label: "Thêm chuyên khoa",
            active: pathname === "/admin/specialties/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "STAFF_RECEPTIONIST", "DOCTOR"],
    menus: [
      {
        href: "",
        label: "Lịch đặt khám",
        active:
          pathname === "/admin/appointments/list " ||
          pathname === "/admin/appointments/create",
        icon: FaCalendarAlt,
        submenus: [
          {
            href: "/admin/appointments/list",
            label: "Danh sách lịch đặt",
            active: pathname === "/admin/appointments/list",
          },
          {
            href: "/admin/appointments/create",
            label: "Thêm lịch đặt",
            exceptRoles: ["DOCTOR"],
            active: pathname === "/admin/appointments/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "DOCTOR"],
    menus: [
      {
        href: "",
        label: "Lịch làm việc",
        active: pathname === "/admin/schedules/list",
        icon: FaCalendarPlus,
        submenus: [
          {
            href: "/admin/schedules/list",
            label: "Danh sách lịch làm việc",
            active: pathname === "/admin/schedules/list",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "STAFF"],
    menus: [
      {
        href: "",
        label: "Chi nhánh",
        active:
          pathname === "/admin/branches/list" ||
          pathname === "/admin/branches/create",
        icon: FcDepartment,
        submenus: [
          {
            href: "/admin/branches/list",
            label: "Danh sách chi nhánh",
            active: pathname === "/admin/branches/list",
          },
          {
            href: "/admin/branches/create",
            label: "Thêm chi nhánh",
            active: pathname === "/admin/branches/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "STAFF"],
    menus: [
      {
        href: "",
        label: "Phòng khám",
        active: pathname === "/admin/clinics/list",
        icon: FaClinicMedical,
        submenus: [
          {
            href: "/admin/clinics/list",
            label: "Danh sách phòng khám",
            active: pathname === "/admin/clinics/list",
          },
          {
            href: "/admin/clinics/create",
            label: "Thêm phòng khám",
            active: pathname === "/admin/clinics/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["ADMIN", "SUPER_ADMIN", "STAFF_EDITOR"],
    menus: [
      {
        href: "",
        label: "Tin tức",
        active:
          pathname === "/admin/news/list" || pathname === "/admin/news/create",
        icon: LuNewspaper,
        submenus: [
          {
            href: "/admin/news/list",
            label: "Danh sách tin tức",
            active: pathname === "/admin/news/list",
          },
          {
            href: "/admin/news/create",
            label: "Thêm tin tức",
            active: pathname === "/admin/news/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["SUPER_ADMIN"],
    menus: [
      {
        href: "",
        label: "Vai trò",
        active:
          pathname === "/admin/roles/list" ||
          pathname === "/admin/roles/create",
        icon: IoSettingsSharp,
        submenus: [
          {
            href: "/admin/roles/list",
            label: "Danh sách vai trò",
            active: pathname === "/admin/roles/list",
          },
          // {
          //   href: "/admin/roles/create",
          //   label: "Thêm vai trò",
          //   active: pathname === "/admin/roles/create",
          // },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["SUPER_ADMIN"],
    menus: [
      {
        href: "",
        label: "Hợp đồng",
        active:
          pathname === "/admin/contracts/list" ||
          pathname === "/admin/contracts/create",
        icon: FaFileContract,
        submenus: [
          {
            href: "/admin/contracts/list",
            label: "Danh sách hợp đồng",
            active: pathname === "/admin/contracts/list",
          },
          {
            href: "/admin/contracts/create/internist",
            label: "Thêm hợp đồng bác sĩ cơ hữu",
            active: pathname === "/admin/contracts/create/internist",
          },
          {
            href: "/admin/contracts/create/surgeon",
            label: "Thêm hợp đồng bác sĩ ngoại giờ",
            active: pathname === "/admin/contracts/create/surgeon",
          },
          {
            href: "/admin/contracts/create/service-rental",
            label: "Thêm hợp đồng dịch vụ",
            active: pathname === "/admin/contracts/create/service-rental",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    roles: ["SUPER_ADMIN", "STAFF_ACCOUNTANT"],
    menus: [
      {
        href: "",
        label: "Hóa đơn",
        active:
          pathname === "/admin/invoices/list",
        icon: FaFileInvoiceDollar,
        submenus: [
          {
            href: "/admin/invoices/list",
            label: "Danh sách hóa đơn",
            active: pathname === "/admin/invoices/list",
          },
        ],
      },
    ],
  },
];
