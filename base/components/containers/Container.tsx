import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { BackgroundWaves } from "../../../svgs";

const { height } = Dimensions.get("window");

interface WrapperProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
}

export const Container: React.FC<WrapperProps> = ({
  children,
  containerStyle,
}) => {
  return (
    <LinearGradient
      colors={["#c9ecff", "#f9f9fe"]}
      style={[styles.gradient, containerStyle]}
    >
      <BackgroundWaves style={styles.waves} />
      {children}
    </LinearGradient>
  );
};

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    height: height,
  },
  waves: {
    position: "absolute",
    zIndex: -15,
  },
});
