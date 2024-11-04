import { useParams } from "react-router-dom";
import ContractsClinicAdd from "@/components/admin/contracts/create/ContractsClinicAdd";
import ContractsDoctorInternistAdd from "@/components/admin/contracts/create/ContractsDoctorInternistAdd";
import ContractsDoctorSurgeonAdd from "@/components/admin/contracts/create/ContractsDoctorSurgeonAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import NotFound from "@/components/ui/NotFound";

const breadcrumbData = [
  {
    title: "Hợp đồng",
  },
  {
    href: "/admin/contracts/create",
    title: "Thêm hợp đồng",
  },
];

const ContractsAddPage = () => {
  const { type } = useParams(); 

  let ContractComponent;

  switch (type) {
    case "clinic":
      ContractComponent = ContractsClinicAdd;
      break;
    case "internist":
      ContractComponent = ContractsDoctorInternistAdd;
      break;
    case "surgeon":
      ContractComponent = ContractsDoctorSurgeonAdd;
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

export default ContractsAddPage;