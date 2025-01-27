import React from "react";
import {
  Text as RNText,
  StyleSheet,
  TextProps,
  TextStyle,
  View,
} from "react-native";
import { Colors } from "../../theme/colors";

type Props = {
  children: any;
  style?: TextStyle | TextStyle[];
};

const Text = ({ children, style, ...rest }: Props) => {
  return (
    <RNText style={[styles.default, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  default: {
    color: Colors.text,
  },
});
