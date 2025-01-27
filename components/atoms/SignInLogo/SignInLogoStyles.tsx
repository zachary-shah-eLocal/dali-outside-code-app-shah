//@import '../../../scss/screen-size';

import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  signInLogoContainer: {
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: height / 7,
    flexDirection: "column",
    gap: 9,
    marginBottom: height / 20,
  },
  logo: {
    width: width,
    height: height / 15,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: .2,
  },
  subHeader: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginHorizontal: 40,
    opacity: 0.7,
  },
});
