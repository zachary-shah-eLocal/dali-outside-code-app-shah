import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  containerStyles?: ViewStyle | false;
};

const BaseCard = ({ children, containerStyles = {} }: Props) => {
  return <View style={[styles.container, containerStyles]}>{children}</View>;
};

export default BaseCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    overflow: "hidden",
  },
});
