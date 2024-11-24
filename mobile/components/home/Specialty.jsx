import React, { useState } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const pairData = (data) => {
  const paired = [];
  for (let i = 0; i < data.length; i += 2) {
    paired.push(data.slice(i, i + 2));
  }
  return paired;
};

const Specialty = ({ listSpecialty }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const handleSpecialtyPress = (specialty) => {
    setSelectedSpecialty(specialty);
    setModalVisible(true);
  };

  return (
    <View className="p-2 py-4">
      <View className="flex items-center justify-between flex-row px-2">
        <Text className="font-semibold text-[#929292]">Chuyên khoa</Text>
        <TouchableOpacity
          className="flex-columns items-center justify-center gap-2"
          onPress={() => {
            router.push("/service");
          }}
        />
      </View>
      <FlatList
        data={pairData(listSpecialty)}
        className="w-full mt-4"
        renderItem={({ item }) => (
          <View className="flex flex-col gap-4">
            {item.map((specialty, index) => (
              <TouchableOpacity
                key={index}
                className="relative flex-1 rounded-[15px] overflow-hidden max-h-[100px]"
                onPress={() => handleSpecialtyPress(specialty)}
              >
                <Image
                  source={{
                    uri: `${URL_IMAGE}/${specialty.image}`,
                  }}
                  className="h-full rounded-md w-28"
                />
                <View className="absolute bottom-0 left-0 right-0 bg-[#006ca69c] px-1 py-2 flex items-center justify-center">
                  <Text
                    numberOfLines={1}
                    className="text-white text-center uppercase text-[11px] font-bold"
                  >
                    {specialty.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-[#00000090] bg-opacity-50">
          <View className="bg-white w-[90%] p-3 rounded-lg">
            <Text className="text-lg font-bold mb-4 text-center">
              Tìm kiếm theo:
            </Text>
            <View className="flex flex-row gap-3">
              <Pressable
                className="mb-2 rounded-lg flex-1 max-h-[150px] relative overflow-hidden border border-primary-400"
                onPress={() => {
                  setModalVisible(false);
                  router.push(`/service?id_specialty=${selectedSpecialty?._id}`);
                }}
              >
                <Image source={{
                    uri: `${URL_IMAGE}/${selectedSpecialty?.image}`,
                  }}
                  className="w-full h-full object-cover"
                 />
                <View className="absolute bg-[#135276a1] w-full h-full flex justify-center items-center">
                  <Text className="text-center text-white font-semibold text-[16px]">Dịch vụ</Text>
                </View>
              </Pressable>
              <Pressable
                className="mb-2 rounded-lg flex-1 max-h-[150px] relative overflow-hidden border border-primary-400"
                onPress={() => {
                  setModalVisible(false);
                  router.push(`/package?id_specialty=${selectedSpecialty?._id}`);
                }}
              >
                 <Image source={{
                    uri: `${URL_IMAGE}/${selectedSpecialty?.image}`,
                  }}
                  className="w-full h-full object-cover"
                 />
                <View className="absolute bg-[#726319a1] w-full h-full flex justify-center items-center">
                  <Text className="text-center text-white font-semibold text-[16px]">Gói khám</Text>
                </View>
              </Pressable>
            </View>
            <Pressable
              className="absolute top-0 right-1 p-2"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center text-white">
                <AntDesign name="close" size={28} color="black" />
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Specialty;
