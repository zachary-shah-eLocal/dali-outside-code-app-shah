import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Navigation } from "../../../helpers/Navigationhelper";
import ArrowLeft from "../../icons/ArrowLeft";
import CloseIcon from "../../icons/CloseIcon";

type Props = {
  onPress?: () => void;
  toDismiss?: boolean;
};

const BackButton = ({ onPress, toDismiss = false }: Props) => {
  const pressHandler = () => {
    onPress ? onPress() : Navigation.canGoBack() && Navigation.pop();
  };
  return (
    <TouchableOpacity onPress={pressHandler} style={styles.container}>
      {!toDismiss ? <ArrowLeft /> : <CloseIcon />}
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
