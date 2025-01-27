import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const FiltersContainer = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>;
};

export default FiltersContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
});
