import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const menuItems = [
    {
        icon: <FontAwesome name="history" size={ 24 } color="#FBCC50" />,
        text: "Lịch sử đặt khám",
        navigateTo: '/account/history-appointment',
    },
    {
        icon: <FontAwesome5 name="file-medical-alt" size={ 24 } color="#FBCC50" />,
        text: "Bệnh án điện tử",
        navigateTo: '/account/medical-record',
    },
    {
        icon: <FontAwesome6 name="house-medical-flag" size={ 24 } color="#FBCC50" />,
        text: "Trung tâm hỗ trợ",
        navigateTo: 'https://zalo.me/0916512235',
    },
    {
        icon: <Fontisto name="unlocked" size={ 24 } color="#FBCC50" />,
        text: "Thay đổi mật khẩu",
        navigateTo: '/account/change-password',
    },
    {
        icon: <MaterialIcons name="policy" size={ 28 } color="#FBCC50" />,
        text: "Chính sách quyền riêng tư",
        navigateTo: 'https://diamond.id.vn/',
    },
    {
        icon: <FontAwesome5 name="user-friends" size={ 20 } color="#FBCC50" />,
        text: "Giới thiệu bạn bè",
        navigateTo: '/account/invite-friend',
    },
];