import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  icon?: any;
  iconEnd?: any;
  containerStyles?: ViewStyle;
};

const OptionButton = ({
  label,
  onPress,
  icon,
  iconEnd,
  containerStyles,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={!!onPress ? 0.7 : 1}
      style={[styles.button, containerStyles ?? {}]}
      onPress={onPress}
    >
      {icon && icon}
      <Text style={styles.label}>{label}</Text>
      {iconEnd && iconEnd}
    </TouchableOpacity>
  );
};

export default OptionButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});
