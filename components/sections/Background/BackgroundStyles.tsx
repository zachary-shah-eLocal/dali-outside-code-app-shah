import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    height: height,
  },
  waves: {
    position: "absolute",
    zIndex: -15,
  },
});
