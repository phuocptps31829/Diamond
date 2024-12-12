import { useParams } from "react-router-dom";
import UpdateRoleForm from "@/components/admin/role/forms/FormUpdate";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useQuery } from "@tanstack/react-query";
import { roleApi } from "@/services/roleApi";
import Loading from "@/components/ui/Loading";
import notFoundImg from "@/assets/images/no-product.png";

const getBreadcrumbData = (id, name) => [
    {
        title: 'Vai trò'
    },
    {
        title: 'Cập nhật vai trò'
    },
    {
        href: '/admin/roles/update/' + id,
        title: name
    },
];


const UpdateRolePage = () => {
    const { id } = useParams();

    console.log(id);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['role', id],
        queryFn: () => roleApi.getRoleById(id),
        enabled: !!id
    });

    const breadcrumbData = getBreadcrumbData(id, data?.data.name);
    console.log(data);

    if (isLoading) {
        return <Loading ScaleMini={ true } />;
    }

    if (isError) {
        return <div className="flex items-center justify-center p-4">
            <div className=" my-auto h-60 w-60">
                <img
                    src={ notFoundImg }
                    alt="Not Found"
                    className="w-full max-w-xs rounded-md md:max-w-md lg:max-w-lg"
                />
                <h1 className="mt-4 text-center text-lg font-semibold text-gray-700">
                    Không tìm thấy
                </h1>
            </div>
        </div>;
    }

    return (
        <div>
            <BreadcrumbCustom data={ breadcrumbData } />
            <UpdateRoleForm role={ data.data } />
        </div>
    );
};

export default UpdateRolePage;