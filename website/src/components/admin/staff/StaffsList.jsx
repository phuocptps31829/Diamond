import DataTable from "./table";
import { columns } from "./table/columns";

const StaffsList = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};

export default StaffsList;
