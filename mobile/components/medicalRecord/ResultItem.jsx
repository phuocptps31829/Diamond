import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import DialogCustom from '../ui/Dialog';

const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const ResultItem = ({ results }) => {
    const [imageOpen, setImageOpen] = useState(false);
    const [image, setImage] = useState('');

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
                                        <TouchableOpacity
                                            key={ imgIndex }
                                            onPress={ () => {
                                                setImageOpen(true);
                                                setImage(image);
                                            } }
                                        >
                                            <Image
                                                className="h-[100px] w-[100px] cursor-pointer rounded-md object-cover"
                                                source={ { uri: `${IMAGE_URL}/${image}` } }
                                            />
                                        </TouchableOpacity>
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
                            <Text className="text-zinc-700 mb-1 font-semibold">
                                Thuốc kê:
                            </Text>
                            { result?.prescription?.medicines.map((medicine, i) => (
                                <View key={ medicine._id }>
                                    { i !== 0 && (
                                        <View className="my-3"></View>
                                    ) }
                                    <View className="mt-2 flex flex-col gap-2">
                                        <View className="ml-4 list-disc text-gray-600">
                                            <View className="">
                                                <Text className="ml-4 font-medium text-black my-1">
                                                    Tên thuốc: { ' ' }
                                                    { medicine.name }  ({ medicine.unit })
                                                </Text>{ " " }
                                            </View>
                                            <View className="">
                                                <Text className="ml-4 font-medium text-black my-1">
                                                    Thành phần: { ' ' }
                                                    { medicine.ingredients }
                                                </Text>{ " " }
                                            </View>
                                            <View className="">
                                                <Text className="ml-4 font-medium text-black my-1">
                                                    Hướng dẫn: { ' ' }
                                                    { medicine.instruction }
                                                </Text>{ " " }
                                            </View>
                                            <View className="">
                                                <Text className="ml-4 font-medium text-black my-1">
                                                    Tác dụng phụ: { ' ' }
                                                    { medicine.sideEffects }
                                                </Text>{ " " }
                                            </View>
                                            <View className="text-black">
                                                <Text Text className="ml-4 font-medium text-black mt-1" >
                                                    Lưu ý: { ' ' }
                                                    <Text className="text-red-500"> { medicine.note }</Text>
                                                </Text>
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
            <DialogCustom
                setVisible={ setImageOpen }
                visible={ imageOpen }
                content={ <Image
                    className="h-[300px] w-full cursor-pointer rounded-md object-cover"
                    source={ { uri: `${IMAGE_URL}/${image}` } }
                /> }
            />
        </View>
    );
};

export default ResultItem;