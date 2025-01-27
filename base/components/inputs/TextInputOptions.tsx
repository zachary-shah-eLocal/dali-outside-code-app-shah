import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../../theme/colors";
import Text from "../Text";

interface Props extends TextInputProps {
  label?: string;
  containerStyles?: ViewStyle;
  inputStyles?: any;
  error?: any;
  optionsValues: any;
  optionsValue: any;
  optionsOnchange: any;
}

const TextInputOptions = ({
  label,
  containerStyles,
  inputStyles,
  error,
  optionsValues,
  optionsOnchange,
  optionsValue,
  ...rest
}: Props) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
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
        <Dropdown
          style={{ width: "30%" }}
          containerStyle={{ width: "25%", marginTop: 10 }}
          labelField="label"
          valueField="value"
          onChange={optionsOnchange}
          data={optionsValues}
          value={optionsValue}
          dropdownPosition="auto"
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default TextInputOptions;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    color: Colors.text,
    marginBottom: 8,
    fontSize: 14,
  },
  defaultInputStyle: {
    fontSize: 16,
    fontWeight: "500",
    width: "70%",
    paddingRight: 10,
  },
  error: {
    marginTop: 4,
    color: Colors.danger[50],
    maxWidth: "80%",
  },
});
