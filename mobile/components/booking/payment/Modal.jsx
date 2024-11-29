import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const ModalPayment = ({
    isOpen,
    onClose
}) => {
    return (
        <View
            className="flex-1 justify-center items-center"
        >
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
                    <Text>Modal Payment</Text>
                </View>
            </Modal>
        </View>
    );
};

export default ModalPayment;