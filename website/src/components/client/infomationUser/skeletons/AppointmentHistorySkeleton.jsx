import { Skeleton } from "@/components/ui/Skeleton";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/Table";

const AppointmentHistorySkeleton = ({ numRows }) => {
  return (
    <div className="px-3 md:px-6">
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
          { Array.from({ length: numRows }).map((_, index) => (
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
    </div>
  );
};

export default AppointmentHistorySkeleton;
