import ExpoCheckbox from "expo-checkbox/build/ExpoCheckbox";
import React from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { Colors } from "../../../theme/colors";
import Text from "../Text";

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  color?: string;
};

const Checkbox = ({
  value,
  onValueChange,
  label,
  containerStyle,
  labelStyle,
  color = Colors.text,
  ...rest
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ExpoCheckbox
        value={value}
        onValueChange={onValueChange}
        color={color}
        {...rest}
      />
      {label && <Text style={[styles.label, labelStyle || {}]}>{label}</Text>}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontWeight: "300",
  },
});
