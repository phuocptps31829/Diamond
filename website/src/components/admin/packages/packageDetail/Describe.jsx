const Describe = ({ packageDetail }) => {
    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="mx-auto max-w-7xl py-0 md:py-4">
                <div className="container rounded-md border bg-white p-5">
                    <h2 className="mb-4 text-2xl font-bold">Chi tiết về {packageDetail.name} </h2>
                    <div
                        dangerouslySetInnerHTML={{ __html: packageDetail.details }}
                        className="render-details"
                    />
                </div>
            </div>
        </div>
    );
};

export default Describe;
