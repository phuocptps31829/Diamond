import { useEffect } from "react";
import SupportComponent from "@/components/admin/support/index.jsx";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Hỗ trợ",
  },
  {
    href: "/admin/support",
    title: "Quản lý tin nhắn",
  },
];

const SupportPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTIONIST"]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <SupportComponent />
    </div>
  );
};

export default SupportPage;
