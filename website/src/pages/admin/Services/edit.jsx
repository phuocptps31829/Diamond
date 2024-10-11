import ServicesEdit from "@/components/admin/services/ServicesEdit";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useParams } from "react-router-dom";

const ServicesEditPage = () => {
  const { id } = useParams();

  const breadcrumbData = [
    {
      title: "Dịch vụ",
    },
    {
      href: `/admin/services/edit/${id}`,
      title: "Chỉnh sửa dịch vụ",
    },
  ];

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ServicesEdit />
    </div>
  );
};

export default ServicesEditPage;
