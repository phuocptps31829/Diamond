import DataTable from "./table";
import { columns, mockData } from "./table/columns";


const BranchesList = () => {
  return <DataTable columns={columns} data={mockData} />;
};

export default BranchesList;
