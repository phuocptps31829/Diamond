import { useQuery } from "@tanstack/react-query";
import DataTableRole from "@/components/admin/role/table";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { roleApi } from "@/services/roleApi";
import Loading from "@/components/ui/Loading";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
    useAuthRedirect(["SUPER_ADMIN"], "/admin/dashboard");

    const { data, isLoading, isError } = useQuery({
        queryKey: ['roles'],
        queryFn: roleApi.getAllRoles
    });

    if (isLoading) {
        return <Loading ScaleMini={ true } />;
    }

    if (!data) {
        return null;
    }

    return (
        <div>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DataTableRole data={ data.data } />
        </div>
    );
};

export default ListRolePage;
