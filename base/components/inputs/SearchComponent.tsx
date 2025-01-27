import SearchIcon from "icons/SearchIcon";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "theme/colors";
import SelectDropdown from "./SelectDropdown";

type Props = {
  containerStyles?: ViewStyle;
  inputStyles?: ViewStyle;
  error?: any;
  selectorComponent?: React.ReactNode;
  renderButton?: boolean;
  onSubmit: () => void;
} & React.ComponentProps<typeof TextInput>;

const SearchComponent = ({
  containerStyles = {},
  inputStyles,
  error,
  selectorComponent = null,
  renderButton = true,
  onSubmit,
  ...rest
}: Props) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.defaultInputStyle,
            inputStyles,
            { borderColor: error ? Colors.danger[50] : Colors.border },
          ]}
          placeholderTextColor={"#7A7D9E"}
          autoCapitalize="none"
          {...rest}
        />
      </View>
      {selectorComponent ?? null}
      {renderButton && (
        <TouchableOpacity style={styles.submit} onPress={onSubmit}>
          <SearchIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 0,
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
  },
  defaultInputStyle: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    fontWeight: "500",
  },
  submit: {
    padding: 12,
    backgroundColor: Colors.secondary,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  inputContainer: {
    flex: 1,
  },
});
