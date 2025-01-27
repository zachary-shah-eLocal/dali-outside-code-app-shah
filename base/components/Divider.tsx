import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../theme/colors";

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.grayLight,
  },
});
