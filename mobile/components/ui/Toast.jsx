import Toast from "react-native-toast-message";

export default function ToastUI({ type, text1, text2 }) {
  return Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
    bottomOffset: 40,
    position: "top",
    onShow: () => {},
    onHide: () => {},
  });
}
