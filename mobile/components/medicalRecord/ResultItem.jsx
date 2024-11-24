import React from 'react';
import { Image, Text, View } from 'react-native';

const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const ResultItem = ({ results }) => {
    return (
        <View className="overflow-y-scroll">
            { results.map((result, index) => (
                <View key={ index } className="border-b border-gray-200 px-5">
                    <View>
                        <Text className="text-primary-600 text-base font-semibold">
                            Kết quả khám:
                        </Text>
                        <View className="flex-row gap-2 -mt-1">
                            <Text className="text-zinc-700 font-semibold">
                                Dịch vụ:
                            </Text>
                            <Text className="text-zinc-500">
                                { result?.service?.name || result?.medicalPackage?.name }
                            </Text>
                        </View>
                        <View className="flex-row gap-2 -mt-1">
                            <Text className="text-zinc-700 font-semibold">
                                Chuẩn đoán:
                            </Text>
                            <Text className="text-zinc-500">
                                { result?.diagnose }
                            </Text>
                        </View>
                        <View className="flex-row gap-2 -mt-1">
                            <Text className="text-zinc-700 font-semibold">
                                Mô tả:
                            </Text>
                            <Text className="text-zinc-500">
                                { result?.description }
                            </Text>
                        </View>
                        <View className="mt-1 mb-1">
                            <Text className="font-semibold mr-1 mb-2 text-zinc-700">
                                Hình ảnh liên quan:
                            </Text>
                            <View className="text-primary-500 mt-2 flex-row gap-2">
                                { Array.isArray(result?.images) &&
                                    result?.images.length > 0 ? (
                                    result?.images.map((image, imgIndex) => (
                                        <View key={ imgIndex }>
                                            <Image
                                                className="h-[100px] w-[100px] cursor-pointer rounded-md object-cover"
                                                source={ { uri: `${IMAGE_URL}/${image}` } }
                                            />
                                        </View>
                                    ))
                                ) : (
                                    <Text>Không có hình ảnh</Text>
                                ) }
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text className="text-primary-600 text-base font-semibold mt-1">
                            Đơn thuốc:
                        </Text>
                        <View className="flex-row gap-2 -mt-1">
                            <Text className="text-zinc-700 font-semibold">
                                Lời khuyên:
                            </Text>
                            <Text className="text-zinc-500">
                                { result?.prescription?.advice }
                            </Text>
                        </View>
                        <View className="mt-1">
                            <Text className="text-zinc-700 font-semibold">
                                Thuốc kê:
                            </Text>
                            { result?.prescription?.medicines.map((medicine, i) => (
                                <View key={ medicine._id }>
                                    { i !== 0 && (
                                        <View className="my-3"></View>
                                    ) }
                                    <View className="mt-2 flex flex-col gap-2">
                                        <View className="ml-4 list-disc text-gray-600">
                                            <View>
                                                <Text className="font-medium text-black">
                                                    Tên thuốc:
                                                </Text>{ " " }
                                                { medicine.name } - { medicine.unit }
                                            </View>
                                            <View>
                                                <Text className="font-medium text-black">
                                                    Thành phần:
                                                </Text>{ " " }
                                                { medicine.ingredients }
                                            </View>
                                            <View>
                                                <Text className="font-medium text-black">
                                                    Hướng dẫn:
                                                </Text>{ " " }
                                                { medicine.instruction }
                                            </View>
                                            <View>
                                                <Text className="font-medium text-black">
                                                    Tác dụng phụ:
                                                </Text>{ " " }
                                                { medicine.sideEffects }
                                            </View>
                                            <View className="text-black">
                                                <Text className="font-medium text-black">
                                                    Lưu ý:
                                                </Text>{ " " }
                                                <Text className="text-red-500"> { medicine.note }</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )) }
                        </View>
                    </View>
                    <View className="mt-2">
                        <Text className="text-zinc-500">
                            { result?.content }
                        </Text>
                    </View>
                </View>
            )) }
        </View>
    );
};

export default ResultItem;