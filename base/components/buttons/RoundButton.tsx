import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  icon: any;
  onPress: () => void;
};

const RoundButton = ({ icon, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
