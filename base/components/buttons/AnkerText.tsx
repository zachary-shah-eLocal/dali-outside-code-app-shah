import React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../../theme/colors";
import Text from "../Text";

type Props = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
};

const AnkerText: React.FC<Props> = ({
  label,
  onPress,
  style,
  textStyle,
  disabled,
  icon,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style ?? {}]}
    >
      {icon && <View style={{}}>{icon}</View>}
      <Text style={[styles.text, textStyle ?? {}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AnkerText;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.secondary,
  },
});
