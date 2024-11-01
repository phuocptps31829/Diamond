import { Skeleton } from "@/components/ui/Skeleton";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/Table";


const AppointmentHistorySkeleton = () => {

  return (
    <div className="p-3 md:p-6">
      <div className="flex items-end justify-between mb-6">
        <Skeleton className="h-6 w-60 rounded-md" />
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-end">
          <div className="flex items-center gap-3 md:flex-row">
            <div className="relative items-center justify-center md:flex">
              <Skeleton className="h-6 w-40 rounded-md" />
            </div>
            <div className="relative items-center justify-center md:flex">
              <Skeleton className="h-6 w-40 rounded-md" />
            </div>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm w-6">
              <Skeleton className="h-6 w-6 rounded-md" />
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              <Skeleton className="h-6 w-auto rounded-md" />
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              <Skeleton className="h-6 w-auto rounded-md" />
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              <Skeleton className="h-6 w-auto rounded-md" />
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              <Skeleton className="h-6 w-auto rounded-md" />
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              <Skeleton className="h-6 w-auto rounded-md" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={ index }>
              <TableCell className="text-xs md:text-sm">
                <Skeleton className="h-6 w-6 rounded-md" />
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                <Skeleton className="h-6 w-auto rounded-md" />
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                <Skeleton className="h-6 w-auto rounded-md" />
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                <Skeleton className="h-6 w-auto rounded-md" />
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                <Skeleton className="h-6 w-auto rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-auto rounded-md" />
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
      <div className="flex justify-center">
        <Skeleton className="h-6 mt-4 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default AppointmentHistorySkeleton;
