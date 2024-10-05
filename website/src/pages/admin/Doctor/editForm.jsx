import DoctorsEditForm from "@/components/admin/doctor/DoctorsEditForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Bác sĩ'
  },
  {
    href: '/admin/doctor/edit',
    title: 'Thêm bác sĩ'
  },
];

const DoctorsEditFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <DoctorsEditForm />
    </div>
  );
};

export default DoctorsEditFormPage;