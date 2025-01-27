import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    height: height,
  },
  backgroundContainer: {
    position: "static",
    top: 0,
    left: 0,
    width: width,
    height: 0,
    zIndex: 1,
    opacity: 0.1,
  },
  grid: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: 230,
  },
  bars: {
    position: "absolute",
    top: -330,
    left: 0,
    width: width,
    height: 20,
  },
  loginWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    maxWidth: 1055,
    maxHeight: height,
    width: width,
    marginHorizontal: 0,
    marginVertical: "auto",
    position: "relative",
    zIndex: 2,
    height: "auto",
    padding: 0,
  },
  loginFlowWrapper: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 32,
    width: width,
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#fff",
    zIndex: 2,
    paddingHorizontal: 24,
  },
  bottomBuffer: {
    backgroundColor: "#fff",
    width: width,
    height: 0,
    position: "absolute",
    bottom: 0,
    zIndex: 0,
  },

  /* FORM STYLES */
});
