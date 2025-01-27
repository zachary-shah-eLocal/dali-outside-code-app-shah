import Text from "components/Text";
import React, { useRef, useState } from "react";
import {
  Modal,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../../theme/colors";

type Props = {
  label?: string;
  error?: any;
  containerStyles?: ViewStyle;
  data: any;
  value?: any;
  setValue?: (value: any) => void;
  dropDownStyles?: any;
  renderLeftIcon?: () => JSX.Element | null;
  fetchOptions: (query: string) => Promise<any>;
  inputProps?: TextInputProps;
};

interface Layout {
  width: number;
  height: number;
  x: number;
  y: number;
}

const ACDropDown = ({
  containerStyles,
  error,
  label,
  data,
  value,
  setValue = () => {},
  dropDownStyles,
  fetchOptions,
  inputProps,
  ...rest
}: Props) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <RNTextInput
          style={[
            styles.defaultInputStyle,
            { borderColor: error ? Colors.danger[50] : Colors.border },
          ]}
          placeholderTextColor={"#7A7D9E"}
          autoCapitalize="none"
          {...rest}
        />
        {/* <Image
          source={require("")}
          style={styles.icon}
        /> */}
      </View>
    </View>
  );
};

export default ACDropDown;

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
  defaultInputStyle: {
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
    paddingRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
