import React, { useState } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { Colors } from "../../../theme/colors";
import CloseIcon from "../../icons/CloseIcon";

type Props = {
  label?: string;
  error?: any;
  containerStyles?: ViewStyle;
  data: any;
  value?: any;
  setValue?: (value: any) => void;
  dropDownStyles?: any;
  renderLeftIcon?: () => JSX.Element | null;
} & any;

const SelectDropdown = ({
  containerStyles,
  error,
  label,
  data,
  value,
  setValue = () => {},
  dropDownStyles,
  ...rest
}: Props) => {
  // const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <Dropdown
        style={[
          styles.dropdown,
          { borderColor: error ? Colors.danger[50] : Colors.border },
          dropDownStyles,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={""}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        dropdownPosition="auto"
        {...rest}
      />
    </View>
  );
};

export default SelectDropdown;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    padding: 16,
  },
  inputLabel: {
    color: Colors.text,
    marginBottom: 8,
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
