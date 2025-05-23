import { Image, Text, View } from "react-native";
import { URL_IMAGE } from "../../../configs/urls";
import { formatCurrency } from "../../../utils/format";

const ServiceItem = ({
    data
}) => {
    return <View className={ `flex-row space-x-2 cursor-pointer select-none rounded-lg p-2 border-2 border-gray-300 peer-checked:bg-gray-50 peer-checked:border ${false ? "peer-checked:border-red-500" : "peer-checked:border-primary-500"} ${false ? "border-red-500" : "border-primary-500"}` }>
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
            <Text className="text-sm font-semibold line-through text-gray-600">
                Giá gốc: <Text>{ formatCurrency(data?.price) }</Text>
            </Text>
            <Text className="text-sm font-semibold">
                Giá: <Text>{ formatCurrency(data?.discountPrice) }</Text>
            </Text>
        </View>
    </View>;
};

export default ServiceItem;