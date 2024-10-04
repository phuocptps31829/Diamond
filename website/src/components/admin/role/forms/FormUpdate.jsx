import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { rolesAdminSchema } from "@/zods/admin/rolesAdmin";
import { roleApi } from "@/services/roleApi";
import Loading from "@/components/ui/Loading";
import { toastUI } from "@/components/ui/Toastify";

const UpdateRoleForm = ({ role }) => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        reset,
        register,
    } = useForm({
        resolver: zodResolver(rolesAdminSchema),
        defaultValues: {
            name: role.name,
            description: role.description,
        },
    });
    console.log(errors);

    const { mutate: updateRole, isPending, isError } = useMutation({
        mutationFn: (updatedRole) => roleApi.updateRole(updatedRole),
        onSuccess: () => {
            toastUI("Cập nhật vai trò thành công", "success");
            navigate('/admin/roles/list');
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const onSubmit = (data) => {
        updateRole({ updatedRole: data, id: role._id });
    };

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className="rounded-xl bg-white px-6 py-6">
                <h1 className="mb-4 text-2xl font-semibold text-primary-400">
                    Vai trò Cũ
                </h1>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <div className="mb-6 grid grid-cols-1 items-start justify-center gap-8 sm:grid-cols-2">
                        <InputCustom
                            id="name"
                            type="text"
                            name="name"
                            label="Tên vai trò"
                            placeholder="Nhập tên vai trò"
                            required={ true }
                            control={ control }
                            errors={ errors }
                        />
                        <InputCustom
                            required={ true }
                            id="description"
                            name="description"
                            label='Mô tả'
                            type="text"
                            placeholder="Nhập mô tả"
                            control={ control }
                            errors={ errors }
                        />
                    </div>
                    <div className="mt-3 w-full text-end">
                        <Button variant="custom" type="submit">
                            Cập nhật
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateRoleForm;
