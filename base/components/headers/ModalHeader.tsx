import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Shadows } from "../../../theme/colors";
import ArrowLeft from "../../icons/ArrowLeft";
import BackButton from "../buttons/BackButton";

type Props = {
  title: string;
  safeTopInset?: boolean;
  onPress?: any;
};

const ModalHeader = ({ title, safeTopInset = false, onPress }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      {safeTopInset && (
        <View
          style={{ height: insets.top, backgroundColor: "white", zIndex: 100 }}
        />
      )}
      <View style={[styles.container, safeTopInset && { paddingTop: 0 }]}>
        <Text style={styles.title}>{title}</Text>
        <BackButton toDismiss onPress={onPress ? onPress : false} />
      </View>
    </>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: Colors.white,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ebecf5",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
});
