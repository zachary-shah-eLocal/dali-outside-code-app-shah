import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Divider from "../../../base/components/Divider";
import ArrowLeftLarge from "../../../base/icons/ArrowLeftLarge";
import { Navigation } from "../../../helpers/Navigationhelper";
import { Colors } from "../../../theme/colors";

type Props = {
  icon: React.ReactNode;
  label: string;
  screen: string;
};

const AccountLinkButton = ({ icon, label, screen }: Props) => {
  const handlePress = () => {
    Navigation.navigate(screen);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        {icon}
        <Text style={styles.text}>{label}</Text>
        <ArrowLeftLarge />
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default AccountLinkButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
  text: {
    marginRight: "auto",
    color: Colors.textLight,
  },
});
