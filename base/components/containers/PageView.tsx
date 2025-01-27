import React from "react";
import { StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  viewProps?: ViewProps;
};

const PageView = ({ children, containerStyle, viewProps }: Props) => {
  return (
    <View style={[styles.container, containerStyle]} {...viewProps}>
      {children}
    </View>
  );
};

export default PageView;

const styles = StyleSheet.create({
  container: {},
});
