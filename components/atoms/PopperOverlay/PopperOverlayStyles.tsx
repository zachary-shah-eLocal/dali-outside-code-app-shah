import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  popperShell: {
    width: 32,
    height: 32,
  },
  popperButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 32,
    height: 32,
  },
});
