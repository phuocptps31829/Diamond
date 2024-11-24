import StoreLocation from "./item/StoreLocation";

const BranchBody = ({data}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 ">
      {data.map((branch, index) => (
        <StoreLocation key={branch._id} branch={branch}  isChange={index % 2 === 0} />
      ))}
      </div>
    </div>
  );
};

export default BranchBody;
