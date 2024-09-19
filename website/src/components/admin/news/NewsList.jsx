import DataTable from "./table";
import { columns, mockData } from "./table/columns";

const NewsList = () => {
  return <DataTable columns={columns} data={mockData} />;
};

export default NewsList;
