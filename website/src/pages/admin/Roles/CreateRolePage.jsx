import CreateRoleForm from "@/components/admin/role/forms/FormCreate";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
    {
        title: 'Vai trò'
    },
    {
        href: '/admin/roles/create',
        title: 'Thêm vai trò'
    },
];


const CreateRolePage = () => {
    return (
        <div>
            <BreadcrumbCustom data={ breadcrumbData } />
            <CreateRoleForm />
        </div>
    );
};

export default CreateRolePage;