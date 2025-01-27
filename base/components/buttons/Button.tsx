import React from "react";
import {
  ActivityIndicator,
  FlexAlignType,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Colors } from "../../../theme/colors";
import Text from "../Text";

type Props = {
  title?: string;
  onPress?: () => void;
  starticon?: any;
  endIcon?: any;
  disabled?: boolean;
  loading?: boolean;
  variant?: "outlined" | "contained";
  size?: "small" | "medium" | "large";
  containerStyle?: ViewStyle;
  textsStyle?: TextStyle;
  fullWidth?: boolean;
};

const Button = ({
  title = "",
  onPress = () => {},
  starticon,
  endIcon,
  disabled = false,
  loading = false,
  variant = "contained",
  size = "medium",
  containerStyle = {},
  textsStyle = {},
  fullWidth = true,
}: Props) => {
  const conditionalContainerStyles = {
    paddingVertical: size === "small" ? 7 : size === "medium" ? 10 : 13,
    backgroundColor: variant === "contained" ? Colors.primary : "transparent",
    borderColor: variant === "outlined" ? Colors.textLight : "transparent",
    borderWidth: variant === "outlined" ? 1 : 0,
    opacity: disabled || loading ? 0.5 : 1,
    alignSelf: fullWidth
      ? ("stretch" as FlexAlignType)
      : ("flex-start" as FlexAlignType),
  };
  const conditionalTextStyles = {
    color: variant === "contained" ? Colors.white : Colors.text,
    fontSize: size === "small" ? 14 : size === "medium" ? 16 : 18,
    lineHeight: size === "small" ? 18 : size === "medium" ? 18 : 20,
  };

  const indicatorStyles = {
    height: size === "small" ? 18 : size === "medium" ? 18 : 20,
  };
  const indicatorColor = variant === "contained" ? Colors.white : Colors.text;

  const containerStyles: ViewStyle = {
    ...styles.defaultContainerStyle,
    ...conditionalContainerStyles,
    width: fullWidth ? "100%" : "auto",
    ...containerStyle,
  };

  const textStyles: TextStyle = {
    ...styles.defaultTextStyle,
    ...conditionalTextStyles,
    ...textsStyle,
  };

  const handlePress = () => {
    if (loading || disabled) {
      return;
    }
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyles}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          style={indicatorStyles}
          size="small"
          color={indicatorColor}
        />
      ) : (
        <>
          {starticon && starticon}
          <Text style={textStyles}>{title}</Text>
          {endIcon && endIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    columnGap: 8,
  },
  defaultTextStyle: {
    color: Colors.white,
    fontWeight: "600",
    letterSpacing: 0.7,
  },
});
