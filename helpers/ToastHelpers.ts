import Toast from "react-native-toast-message";

export class ToastHelper {
  static success = (text1: string) => {
    Toast.show({
      type: "success",
      text1,
    });
  };
  static error = (text1: string) => {
    Toast.show({
      type: "error",
      text1,
    });
  };
}
