import PatientResult from "@/components/admin/patient/result/addResult";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: "Người dùng",
  },
  {
    href: "/admin/patients/result",
    title: "Thêm kết quả khám bệnh",
  },
];

const PatientsResult = () => {
  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      <PatientResult />
    </div>
  );
};

export default PatientsResult;
