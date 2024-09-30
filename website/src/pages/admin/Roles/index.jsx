import DataTableRole from "@/components/admin/role/table";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
    {
        title: 'Vai trò'
    },
    {
        href: '/admin/roles/list',
        title: 'Danh sách vai trò'
    },
];

const RolesListPage = () => {
    return (
        <div>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DataTableRole />
        </div>
    );
};

export default RolesListPage;
