import { ScrollView } from "react-native";
import NewsList from "./NewsList";

const News = () => {
  return (
    <ScrollView
      className="bg-[#E8F2F7] relative"
      showsVerticalScrollIndicator={false}
    >
      <NewsList />
    </ScrollView>
  );
};

export default News;
