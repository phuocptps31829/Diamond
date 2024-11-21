import { Skeleton } from "@/components/ui/Skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";

const AppointmentDetailSkeleton = () => {
    return (
        <div className="p-3 md:p-6">
            <Skeleton className="h-7 w-60 rounded-md mb-4" />
            <Table className="rounded-md border">
                <TableBody>
                    <TableRow>
                        <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                        <TableCell className="px-4 whitespace-nowrap">
                            <Skeleton className="h-6 w-full rounded-md" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default AppointmentDetailSkeleton;