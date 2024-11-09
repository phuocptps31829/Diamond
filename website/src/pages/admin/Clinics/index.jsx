import ClinicsList from "@/components/admin/clinic/ClinicList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Phòng khám'
  },
  {
    href: '/admin/clinics/list',
    title: 'Danh sách phòng khám'
  },
];

const ClinicsListPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ClinicsList/>
    </div>
  );
};

export default ClinicsListPage;
