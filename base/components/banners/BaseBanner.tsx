import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../theme/colors";
import Text from "../Text";

type Props = {
  message: string;
  type: "info" | "success" | "error";
};

const BaseBanner = (props: Props) => {
  const styles = () => {
    switch (props.type) {
      case "info":
        return {
          backgroundColor: "#fef7e8",
          borderColor: "#f7c875",
        };
      case "success":
        return {
          backgroundColor: Colors.success[80],
          borderColor: Colors.success[30],
        };
      case "error":
        return {
          backgroundColor: Colors.danger[80],
          borderColor: Colors.danger[50],
        };
      default:
        return {
          backgroundColor: "#fef7e8",
          borderColor: "#f7c875",
        };
    }
  };
  return (
    <View
      style={{
        ...styles(),
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
      }}
    >
      <Text
        style={{
          lineHeight: 21,
        }}
      >
        {props.message}
      </Text>
    </View>
  );
};

export default BaseBanner;
