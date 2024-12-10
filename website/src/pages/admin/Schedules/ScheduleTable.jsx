import DataTableSchedule from "@/components/admin/schedule/table";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { RECORD_PER_PAGE } from "@/constants/config";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { workScheduleApi } from "@/services/workSchedulesApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

const breadcrumbData = [
    {
        title: 'Lịch làm việc'
    },
    {
        href: '/admin/schedules/list',
        title: 'Danh sách lịch làm việc'
    },
];

const ScheduleTablePage = () => {
    useAuthRedirect(["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTIONIST", "DOCTOR"], "/admin/dashboard");

    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [tableData, setTableData] = useState({
        data: [],
        pageCount: 0,
        total: 0,
    });

    const [debouncedSearchValue] = useDebounce(searchValue, 500);

    const userProfile = useSelector((state) => state.auth.userProfile);

    const roleID = userProfile?.role?._id;

    let options = {};
    switch (roleID) {
        case import.meta.env.VITE_ROLE_DOCTOR:
            options = {
                queryKey: ['workSchedules', userProfile?._id, pageIndex, RECORD_PER_PAGE, debouncedSearchValue],
                queryFn: () => workScheduleApi.getWorkSchedulesByDoctorID(
                    userProfile?._id,
                    {
                        page: pageIndex + 1,
                        limit: RECORD_PER_PAGE,
                        search: debouncedSearchValue
                    }
                ),
                enabled: !!userProfile
            };
            break;
        case import.meta.env.VITE_ROLE_SUPER_ADMIN:
            options = {
                queryKey: ['workSchedules', pageIndex, RECORD_PER_PAGE, debouncedSearchValue],
                queryFn: () => workScheduleApi.getAllWorkSchedules({
                    page: pageIndex + 1,
                    limit: RECORD_PER_PAGE,
                    search: debouncedSearchValue
                })
            };
            break;
        default:
            options = {};
    }

    const { data, isLoading, isError } = useQuery(options);

    useEffect(() => {
        if (!isLoading) {
            setTableData({
                data: data?.data || [],
                pageCount: Math.ceil((data?.totalRecords || 0) / 10),
                total: data?.totalRecords || 0,
            });
        }
    }, [data, isLoading]);

    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DataTableSchedule
                workSchedules={ tableData.data }
                isLoading={ isLoading }
                pageCount={ tableData.pageCount }
                pageSize={ 10 }
                pageIndex={ pageIndex }
                onPageChange={ setPageIndex }
                total={ tableData.total }
                searchValue={ searchValue }
                setSearchValue={ setSearchValue }
            />
        </>
    );
};

export default ScheduleTablePage;