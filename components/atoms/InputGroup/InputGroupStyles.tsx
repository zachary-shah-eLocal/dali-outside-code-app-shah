import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    textAlign: "left",
    alignItems: "center",
    //marginBottom: 8,
    width: "100%",
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    //lineHeight: 19.6,
  },
  errorContainer: {
    height:14,
    width: "80%",
  },
  error: {
    textAlign: 'left',
    fontWeight: "300",
    fontSize: 11,
    color: 'gray',
    //lineHeight: 19.6,
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ededed",
    borderRadius: 18,
    fontWeight: "500",
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    // lineHeight: 19.8,
    width: "90%",
  },
});
