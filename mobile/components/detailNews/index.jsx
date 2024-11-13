import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import Content from "./Content";
import { newsApi } from "../../services/newsApi";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../ui/Loading";

const DetailNews = () => {
  const [content, setContent] = useState({
    html: "",
  });
  const { id } = useLocalSearchParams();

  const {
    data: dataNews = [],
    error: errorNews,
    isLoading: isLoadingNews,
  } = useQuery({
    queryKey: ["news", id],
    queryFn: () => newsApi.getNewsById(id),
  });

  if (errorNews) {
    <View className="w-full h-full flex justify-center items-center">
      <Text>{errorNews?.message}</Text>
    </View>;
  }

  useEffect(() => {
    if (!isLoadingNews) {
      setContent({
        html: dataNews.content,
      });
    }
  }, [isLoadingNews]);

  return (
    <>
      {isLoadingNews && <Loading />}
      <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
        <View className="m-4">
          <Text className=" text-center leading-7 font-bold text-[20px]">
            {dataNews.title}
          </Text>
        </View>
        <Content content={content} />
      </ScrollView>
    </>
  );
};

export default DetailNews;
