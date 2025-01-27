import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  logoContainer: {},
  dropdownItem: {
    flexDirection: "row",
    columnGap: 12,
  },
  icon: {
    color: "#4d4d4d",
  },
  iconText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4d4d4d",
  },
});
