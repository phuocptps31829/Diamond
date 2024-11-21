import { useQuery } from "@tanstack/react-query";
import { newsApi } from "../../services/newsApi";
import { ScrollView } from "react-native";
import NewsList from "./NewsList";
import Loading from "../ui/Loading";

const News = () => {
  const {
    data: dataNews = [],
    error: errorNews,
    isLoading: isLoadingNews,
  } = useQuery({
    queryKey: ["news"],
    queryFn: newsApi.getAllNews,
  });

  if (errorNews) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Text>{errorNews?.message}</Text>
      </View>
    );
  }

  return (
    <>
      {isLoadingNews ? (
        <Loading />
      ) : (
        <ScrollView
          className="bg-[#E8F2F7] relative"
          showsVerticalScrollIndicator={false}
        >
          <NewsList dataNews={dataNews} />
        </ScrollView>
      )}
    </>
  );
};

export default News;
