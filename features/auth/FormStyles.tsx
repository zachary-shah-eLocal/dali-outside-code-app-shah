import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  welcomeHeader: {
    fontSize: 24,
    fontWeight: "700",
    color: "#20244F",
    marginBottom: 8,
  },
  tag: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: "#20244f",
    // marginBottom: 25,
  },
  formMain: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  formFooter: {},
  actionsContainer: {
    padding: 10,
    width: width - width / 8,
    gap: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
});
