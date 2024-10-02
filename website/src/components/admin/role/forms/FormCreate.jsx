import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/useToast";
import { rolesAdminSchema } from "@/zods/admin/rolesAdmin";

const CreateRoleForm = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

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
            name: "",
            description: "",
        },
    });
    console.log(errors);

    const onSubmit = (data) => {
        console.log("onSubmit called with data:", data);
    };



    // if (isLoading) {
    //     return (
    //         <div className="w-full">
    //             <h1 className="mb-3 text-2xl font-bold">
    //                 <Skeleton className="h-8 w-1/2" />
    //             </h1>
    //             <div className="rounded-xl bg-white px-6 py-6">
    //                 <Skeleton className="mb-4 h-10 w-full" />
    //                 <Skeleton className="mb-4 h-10 w-full" />
    //                 <Skeleton className="mb-4 h-10 w-full" />
    //                 <Skeleton className="mb-4 h-10 w-full" />
    //                 <Skeleton className="mb-4 h-10 w-full" />
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="w-full">
            <div className="rounded-xl bg-white px-6 py-6">
                <h1 className="mb-4 text-2xl font-semibold text-primary-400">
                    Vai trò mới
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
                            Thêm
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRoleForm;
