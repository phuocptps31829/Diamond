import Product from "../../client/product/Product";
const PackageServiceOther = () => {
  return (
    <div className="container mx-auto max-w-7xl py-4">
      <h1 className="text-center text-2xl font-bold my-6">Các gói khám khác</h1>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default PackageServiceOther;
