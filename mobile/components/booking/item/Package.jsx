import { Image, Text, TouchableOpacity, View } from "react-native";
import { URL_IMAGE } from "../../../configs/urls";
import { formatCurrency } from "../../../utils/format";
import { useEffect, useState } from "react";

const PackageItem = ({
    data,
    packageLevel,
    onSetPackageLevel
}) => {
    useEffect(() => {
        if (data?.services?.[0]._id) {
            onSetPackageLevel(data.services[0]._id);
        }
    }, [data]);

    return <View className={ `flex-row items-center space-x-2 cursor-pointer select-none rounded-lg p-2 border-2 border-gray-300 peer-checked:bg-gray-50 peer-checked:border ${false ? "peer-checked:border-red-500" : "peer-checked:border-primary-500"} ${false ? "border-red-500" : "border-primary-500"}` }>
        <Image
            source={ {
                uri: URL_IMAGE + "/" + data?.image,
            } }
            className="w-[130px] h-[100px] rounded-lg"
        />
        <View className="flex-1">
            <Text
                numberOfLines={ 2 }
                className="text-base flex-1 font-bold">
                { data?.name }
            </Text>
            <View className="flex-row items-center flex-wrap gap-1 pr-6 py-1">
                { data?.services?.[0]._id ? data?.services?.map((service) => (
                    <TouchableOpacity
                        activeOpacity={ .9 }
                        className="space-x-1"
                        onPress={ () => onSetPackageLevel(service._id) }
                    >
                        <Text
                            style={ {
                                backgroundColor: service._id === packageLevel
                                    ? '#007ebc'
                                    : 'transparent',
                                color: service._id === packageLevel
                                    ? 'white'
                                    : 'black',
                            } }
                            key={ service._id }
                            className="text-[10px] md:text-[11px] rounded-sm px-2 py-[2px] border-primary-500 bg-opacity-20 border-[1px] border-opacity-50"
                        >
                            { service.levelName }
                        </Text>
                    </TouchableOpacity>
                )) : 99 }
            </View>
            <Text className="text-sm font-semibold">
                Giá: <Text>{ formatCurrency(data.services.find(service => {
                    return service._id === packageLevel;
                })?.discountPrice) }</Text>
            </Text>
        </View>
    </View>;
};

export default PackageItem;