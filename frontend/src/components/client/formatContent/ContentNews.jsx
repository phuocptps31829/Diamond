import PropTypes from "prop-types";

const FormatContent = ({ content }) => {
  return (
    <div
      className="content-news w-full"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

FormatContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default FormatContent;
