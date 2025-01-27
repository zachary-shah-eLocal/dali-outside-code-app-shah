import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../../theme/colors";
import Text from "../Text";

interface Props extends TextInputProps {
  label?: string;
  containerStyles?: ViewStyle;
  inputStyles?: any;
  error?: any;
}

const TextInput: React.FC<Props> = ({
  label,
  containerStyles,
  inputStyles,
  error,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[
          styles.defaultInputStyle,
          inputStyles,
          { borderColor: error ? Colors.danger[50] : Colors.border },
        ]}
        placeholderTextColor={"#7A7D9E"}
        autoCapitalize="none"
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  label: {
    color: Colors.text,
    marginBottom: 8,
    fontSize: 14,
  },
  defaultInputStyle: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
  },
  error: {
    marginTop: 4,
    color: Colors.danger[50],
    maxWidth: "80%",
  },
});
