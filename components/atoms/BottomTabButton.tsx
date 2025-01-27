import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BillingIcon from "../../base/icons/bottomtab/BillingIcon";
import CampingIcon from "../../base/icons/bottomtab/CampingIcon";
import HomeIcon from "../../base/icons/bottomtab/HomeIcon";

type Props = {
  label: string;
  focused: boolean;
  onPress: () => void;
};

// TODO - Migrate to svg components
const BottomTabButton = ({ focused, label, onPress }: Props) => {
  const renderIcon = () => {
    switch (label) {
      case "Summery":
        return <HomeIcon color={focused ? "#0293D2" : "#20244F"} />;
      case "Campaigns":
        return <CampingIcon color={focused ? "#0293D2" : "#20244F"} />;
      case "Billing":
        return <BillingIcon color={focused ? "#0293D2" : "#20244F"} />;
      default:
        return <HomeIcon />;
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      {renderIcon()}
      <Text style={[styles.label, focused && { color: "#0293D2" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default BottomTabButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 6,
    minWidth: 90,
  },
  label: {
    fontFamily: Platform.OS === "ios" ? "montserrat" : "Roboto",
    fontSize: 12,
    fontWeight: "500",
    color: "#20244F",
  },
});
