import {
    ActivityIndicator,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

const ModalCancel = ({
    isPending,
    isOpen,
    onClose,
    onCancel
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={ true }
            visible={ isOpen }
            onRequestClose={ () => {
                setModalVisible(!isOpen);
            } }
        >
            <TouchableWithoutFeedback onPress={ onClose }>
                <View className="flex-1 justify-center items-center bg-[#00000090] bg-opacity-50 absolute top-0 left-0 right-0 bottom-0" />
            </TouchableWithoutFeedback>
            <View className="flex-1 justify-center items-center">
                <View className="bg-white p-4 rounded-lg w-[90%] max-w-[340px]">
                    <Text className="text-xl font-semibold text-gray-700">Hủy lịch</Text>
                    <Text className="text-base">
                        <Text className="text-base text-red-500">
                            (*) { '' }
                        </Text>
                        Bạn có chắc chắn muốn hủy lịch khám này?
                    </Text>
                    <View className="mt-2">
                        <Image
                            source={ require("../../../assets/images/momo.webp") }
                            className="w-7 h-7 mr-2"
                        />
                    </View>
                    <View className="mt-4 flex-row justify-end">
                        <TouchableOpacity
                            className="bg-red-500 py-3 flex-row items-center px-4 rounded-lg max-w-[160px]"
                            onPress={ onCancel }
                        >
                            <Text className="text-center text-white uppercase font-semibold">
                                Hủy
                            </Text>
                            { isPending && <ActivityIndicator
                                color="#fff"
                                className="ml-2"
                                size="small"
                            />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalCancel;