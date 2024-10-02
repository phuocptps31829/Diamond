import { useQuery } from "@tanstack/react-query";
import DataTableRole from "@/components/admin/role/table";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { roleApi } from "@/services/roleApi";
import Loading from "@/components/ui/Loading";

const breadcrumbData = [
    {
        title: 'Vai trò'
    },
    {
        href: '/admin/roles/list',
        title: 'Danh sách vai trò'
    },
];

const ListRolePage = () => {
    const { data: roles, isLoading, isError } = useQuery({
        queryKey: ['roles'],
        queryFn: roleApi.getAllRoles
    });

    console.log(roles);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DataTableRole data={ roles } />
        </div>
    );
};

export default ListRolePage;
