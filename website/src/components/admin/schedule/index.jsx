import DataTable from "./table";
import { columns, mockData } from "./table/columns";

const Schedules = () => {
  return <DataTable columns={columns} data={mockData} />;
};

export default Schedules;
