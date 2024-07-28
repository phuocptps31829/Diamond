import Service from "../product/Service";
const PackageServiceOther = () => {
    return (
        <div className="container mx-auto max-w-7xl py-4">
            <h1 className="my-6 text-center text-2xl font-bold">Các gói khám khác</h1>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Service />
                <Service />
                <Service />
                <Service />
            </div>
        </div>
    );
};

export default PackageServiceOther;
