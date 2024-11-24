import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import { imageApi } from "../../services/imageApi";
import { patientApi } from "../../services/patientsApi";
import { useMutation } from "@tanstack/react-query";
import ToastUI from "../../components/ui/Toast";
import { setProfile } from "../../store/profile/profileSlice";
import { useDispatch } from "react-redux";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const AvatarOnTop = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [loadImageZoom, setLoadImageZoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleOpenImageModal = () => {
    setLoadImageZoom(true);
    setIsImageModalVisible(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalVisible(false);
  };

  const handleOpenDrawer = () => {
    setIsModalVisible(true);
  };

  const handleCloseDrawer = () => {
    console.log("close");
    setIsModalVisible(false);
  };

  const { mutate: updatePatientMutation, isPending } = useMutation({
    mutationFn: ({ id, requestBody }) => {
      return patientApi.updateAvatar(id, requestBody);
    },
    onSuccess: (newData) => {
      dispatch(
        setProfile({
          ...profile,
          avatar: newData.avatar,
        })
      );
      setIsImageLoading(true);
      ToastUI({
        type: "success",
        text1: "Thành công",
        text2: "Cập nhật ảnh đại diện thành công!",
      });
    },
    onError: (error) => {
      console.error("error", error);
      ToastUI({
        type: "error",
        text1: "Thất bại",
        text2: "Cập nhật ảnh đại diện thất bại!",
      });
    },
  });

  const handleImagePicker = async (isCamera = false) => {
    // Yêu cầu quyền truy cập thư viện hoặc camera
    const permissionResult = isCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      ToastUI({
        type: "error",
        text1: "Thất bại",
        text2: `Bạn cần cấp quyền truy cập ${
          isCamera ? "camera" : "thư viện ảnh"
        }!`,
      });
      return;
    }

    const result = isCamera
      ? await ImagePicker.launchCameraAsync() // Camera
      : await ImagePicker.launchImageLibraryAsync({
          // Thư viện ảnh
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

    if (!result.canceled) {
      setIsModalVisible(false);
      setIsLoading(true);

      const uri = result.assets[0].uri;
      const formData = new FormData();
      formData.append("file", {
        uri: uri,
        type: result.assets[0].type || "image/jpeg",
        name: result.assets[0].fileName || "image.jpg",
      });

      const imageResult = await imageApi.createImage(formData);
      console.log("buoc 1");
      setIsLoading(false);
      if (!imageResult) {
        return ToastUI({
          type: "error",
          text1: "Thất bại",
          text2: "Cập nhật ảnh đại diện thất bại!",
        });
      }
      console.log("buoc 2");
      updatePatientMutation({
        id: profile._id,
        requestBody: {
          avatar: imageResult,
        },
      });
    }
  };

  return (
    <>
      <View className="flex gap-1 justify-center items-center pt-5 border-b-8 border-[#F3F2F7] pb-4">
        <View className="flex items-center">
          <View className="relative w-[120px] h-[120px] bg-gray-300 rounded-full">
            <TouchableOpacity onPress={handleOpenImageModal}>
              <Image
                source={
                  profile.avatar
                    ? { uri: `${URL_IMAGE}/${profile.avatar}` }
                    : require("../../assets/fav.png")
                }
                className="rounded-full w-full h-full border-2 border-[#FBCC50] bg-white"
                onLoad={() => setIsImageLoading(false)}
              />
            </TouchableOpacity>
            {(isLoading || isPending || isImageLoading) && (
              <View className="bg-[#0000006c] rounded-full absolute w-full h-full top-0 flex justify-center items-center">
                <ActivityIndicator size="small" color="white" />
              </View>
            )}
          </View>
          <TouchableOpacity
            className="w-full"
            onPress={handleOpenDrawer}
            disabled={isPending || isLoading}
          >
            <Text className="w-full font-semibold text-center mt-3">
              Đổi ảnh đại diện
            </Text>
          </TouchableOpacity>
        </View>
        {isModalVisible && (
          <TouchableOpacity
            className="absolute w-screen h-screen bg-black z-50 opacity-40 top-0"
            onPress={handleCloseDrawer}
          />
        )}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseDrawer}
        >
          <View className="bg-white rounded-t-2xl p-4 absolute bottom-0 w-full min-h-[200px">
            <View className="relative py-1 mb-4">
              <Text className="text-[15px] font-semibold text-center">
                Chọn ảnh từ
              </Text>
              <TouchableOpacity
                onPress={handleCloseDrawer}
                className="absolute right-0"
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="flex flex-row gap-3 py-4 items-center"
              onPress={() => handleImagePicker(false)}
            >
              <View className="min-w-[30px]">
                <FontAwesome name="photo" size={24} color="#007BBB" />
              </View>
              <Text className="text-base">Thư viện</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row gap-3 py-4 items-center"
              onPress={() => handleImagePicker(true)}
            >
              <View className="min-w-[30px]">
                <Entypo name="camera" size={24} color="#007BBB" />
              </View>
              <Text className="text-base">Chụp ảnh</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <Modal
        visible={isImageModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseImageModal}
      >
        <Pressable
          className="absolute w-screen h-screen bg-black opacity-70"
          onPress={handleCloseImageModal}
        />
        <View className="flex-1 justify-center items-center w-[100%]">
          <View className="w-[90%] h-[40%] relative rounded-lg">
            <Image
              source={
                profile.avatar
                  ? { uri: `${URL_IMAGE}/${profile.avatar}` }
                  : require("../../assets/fav.png")
              }
              className="w-full h-full rounded-lg border border-white"
              resizeMode="cover"
              onLoad={() => setLoadImageZoom(false)}
            />
            {loadImageZoom && (
              <View className="absolute w-full h-full flex justify-center items-center">
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AvatarOnTop;
