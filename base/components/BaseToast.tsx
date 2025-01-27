import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { Colors, Shadows } from "../../theme/colors";
import ErrorIcon from "../icons/toast/ErrorIcon";
import SuccessIcon from "../icons/toast/SuccessIcon";
import Text from "./Text";

const toasConfig = {
  success: ({ text1 }: BaseToastProps) => {
    return (
      <View
        style={[styles.baseContainer, { backgroundColor: Colors.success[80] }]}
      >
        <SuccessIcon />
        <Text style={styles.message}>{text1 || ""}</Text>
      </View>
    );
  },
  error: ({ text1 }: BaseToastProps) => {
    return (
      <View
        style={[styles.baseContainer, { backgroundColor: Colors.danger[80] }]}
      >
        <ErrorIcon />
        <Text style={styles.message}>{text1 || ""}</Text>
      </View>
    );
  },
};

export default function BaseToast() {
  const insets = useSafeAreaInsets();
  return (
    <Toast
      topOffset={insets.top}
      config={toasConfig}
      position="top"
      autoHide
      visibilityTime={2000}
    />
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    width: Dimensions.get("window").width - 40,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    ...Shadows.toast,
  },
  message: {
    lineHeight: 20,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});
