import DoctorsForm from "@/components/admin/doctor/DoctorsForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Bác sĩ'
  },
  {
    href: '/admin/doctors/create',
    title: 'Thêm bác sĩ'
  },
];

const DoctorsFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <DoctorsForm />
    </div>
  );
};

export default DoctorsFormPage;