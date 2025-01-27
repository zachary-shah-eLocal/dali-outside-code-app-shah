import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";
import { BackgroundWaves } from "../../../svgs";

interface WrapperProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
}

export const ModalContainer: React.FC<WrapperProps> = ({
  children,
  containerStyle,
}) => {
  return <View style={[styles.gradient, containerStyle]}>{children}</View>;
};

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: "white",
  },
});
