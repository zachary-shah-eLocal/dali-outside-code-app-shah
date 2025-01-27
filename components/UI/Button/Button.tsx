import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "react-router-native";

import { styles } from "./ButtonStyles";

type ButtonProps = {
  children: React.ReactNode;
  size?: "xs" | "small" | "medium" | "large" | "lg";
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary" | "warning" | "danger" | "disabled";
  variant?: "contained" | "outlined" | "text";
  clickable?: boolean;
  className?: string;
  underline?: boolean;
  style?: object;
  fullWidth?: boolean;
  to?: string;
  onClick?: (event: GestureResponderEvent) => void;
  href?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "medium",
  type = "button",
  color,
  variant = "text",
  clickable = true,
  className = "",
  underline,
  style,
  fullWidth,
  to,
  onClick,
  href,
  ...rest
}) => {
  const conditionStyles = StyleSheet.create({
    btn: {
      ...(fullWidth ? { width: "100%" } : {}),
    },
    txt: {
      ...(underline ? { textDecorationLine: "underline" } : {}),
    },
  });

  if (!clickable) {
    color = "disabled";
  }

  const combinedStylesBtn = [
    styles.btn,
    conditionStyles.btn,
    color && styles[color],
    size && styles[size],
    variant && styles[variant],
    style,
  ];

  const combinedStylesTxt = [styles.txt, conditionStyles.txt];

  if (href) {
    return (
      <TouchableOpacity
        style={combinedStylesBtn as any}
        disabled={!clickable}
        onPress={() => (window.location.href = href)}
        {...rest}
      >
        <Text style={combinedStylesTxt as any}>{children}</Text>
      </TouchableOpacity>
    );
  }

  if (to) {
    return (
      <Link to={to} style={combinedStylesBtn as any} {...rest}>
        <Text style={combinedStylesTxt as any}>{children}</Text>
      </Link>
    );
  }

  return (
    <TouchableOpacity
      style={combinedStylesBtn as any}
      disabled={!clickable}
      onPress={onClick}
      {...rest}
    >
      <Text style={combinedStylesTxt as any}>{children}</Text>
    </TouchableOpacity>
  );
};
