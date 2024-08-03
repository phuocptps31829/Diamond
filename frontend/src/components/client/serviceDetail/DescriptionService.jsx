import PropTypes from "prop-types";
const DescriptionService = ({ medicalPackage, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { details, name } = medicalPackage;

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="mx-auto max-w-7xl py-0 md:py-4">
        <div className="container rounded-md border bg-white p-5">
          <h2 className="mb-4 text-2xl font-bold">CHI TIẾT VỀ {name} </h2>
          <div dangerouslySetInnerHTML={{ __html: details }} className="render-details" />
        </div>
      </div>
    </div>
  );
};
DescriptionService.propTypes = {
  isLoading: PropTypes.bool,
  medicalPackage: PropTypes.shape({
    details: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default DescriptionService;
