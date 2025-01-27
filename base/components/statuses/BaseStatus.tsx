import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../theme/colors";
import ErrorStatusIcon from "../../icons/status/ErrorStatusIcon";
import StatusInfoIcon from "../../icons/status/StatusInfoIcon";
import StatusSuccessIcon from "../../icons/status/StatusSuccessIcon";

type Props = {
  type?: "success" | "info" | "error";
  label: string;
};

const BaseStatus = ({ type = "success", label }: Props) => {
  const getPros = () => {
    switch (type) {
      case "success":
        return {
          icon: <StatusSuccessIcon />,
          bg: Colors.success[80],
          color: Colors.success[30],
        };
      case "info":
        return {
          icon: <StatusInfoIcon />,
          bg: Colors.info[90],
          color: Colors.info[30],
        };

      case "error":
        return {
          icon: <ErrorStatusIcon />,
          bg: Colors.danger[80],
          color: Colors.danger[50],
        };
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: getPros().bg }]}>
      {getPros().icon}
      <Text style={[styles.label, { color: getPros().color }]}>{label}</Text>
    </View>
  );
};

export default BaseStatus;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 50,
    flexDirection: "row",
    gap: 4,
  },
  label: {
    fontWeight: "500",
    fontSize: 10,
  },
});
