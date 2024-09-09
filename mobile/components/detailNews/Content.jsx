import { View } from "react-native";
import RenderHtml from "react-native-render-html";

const Content = ({ content }) => {
  const tagsStyles = {
    p: {
      width: `100% !important`,
      lineHeight: 22,
      display: "block",
    },
    h1: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    h2: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    strong: {
      width: "100% !important",
      lineHeight: 25,
      display: "block",
    },
    em: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    div: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
      fontWeight: "500",
    },
    span: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    li: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    i: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    table: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    tbody: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    figure: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    article: {
      width: "100% !important",
      lineHeight: 22,
      display: "block",
    },
    img: {
      width: "100% !important",
      display: "block",
    },
    iframe: {
      width: "100% !important",
      display: "block",
    },
  };

  return (
    <>
      <View className="px-4 w-full">
        <RenderHtml source={content} tagsStyles={tagsStyles} />
      </View>
    </>
  );
};

export default Content;
