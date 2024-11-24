import Toast from "react-native-toast-message";

export default function ToastUI({ type, text1, text2, time, onPress }) {
  return Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    visibilityTime: time || 5000,
    autoHide: true,
    topOffset: 50,
    bottomOffset: 40,
    position: "top",
    onShow: () => {},
    onHide: () => {},
    onPress: onPress,
  });
}
