import DataTable from "./table";
import { columns, mockData } from "./table/columns";

const AppointmentsList = () => {
  return <DataTable columns={columns} data={mockData} />;
};

export default AppointmentsList;
