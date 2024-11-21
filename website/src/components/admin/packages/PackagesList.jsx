import DataTable from "./table";
import { columnsSchedule } from "./table/columns";

const PackagesList = ({ allPackages }) => {
  return <DataTable columns={columnsSchedule} allPackages={allPackages} />;
};

export default PackagesList;
