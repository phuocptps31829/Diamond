import { useParams } from "react-router-dom";
import ContractsDoctorInternistEdit from "@/components/admin/contracts/edit/ContractsDoctorInternistEdit";
import ContractsDoctorSurgeonEdit from "@/components/admin/contracts/edit/ContractsDoctorSurgeonEdit";
import ContractsClinicEdit from "@/components/admin/contracts/edit/ContractsClinicEdit";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import NotFound from "@/components/ui/NotFound";

const breadcrumbData = [
  {
    title: "Hợp đồng",
  },
  {
    href: "/admin/contracts/edit",
    title: "Chỉnh sửa hợp đồng",
  },
];

const ContractsEditPage = () => {
  const { type } = useParams();

  let ContractComponent;

  switch (type) {
    case "clinic":
      ContractComponent = ContractsClinicEdit;
      break;
    case "internist":
      ContractComponent = ContractsDoctorInternistEdit;
      break;
    case "surgeon":
      ContractComponent = ContractsDoctorSurgeonEdit;
      break;
    default:
      ContractComponent = null;
  }

  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      {ContractComponent ? <ContractComponent /> : <NotFound />}
    </div>
  );
};

export default ContractsEditPage;
