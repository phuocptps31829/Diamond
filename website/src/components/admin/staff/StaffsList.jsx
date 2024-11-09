import DataTable from "./table";
import { columns} from "./table/columns";
import { staffsData } from "./table/data";

const StaffsList = () => {
  return <DataTable columns={columns} data={staffsData} />;
};

export default StaffsList;
