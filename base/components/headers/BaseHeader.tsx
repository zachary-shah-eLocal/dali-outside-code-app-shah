import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Shadows } from "../../../theme/colors";
import ArrowLeft from "../../icons/ArrowLeft";
import BackButton from "../buttons/BackButton";

type Props = {
  title: string;
  safeTopInset?: boolean;
  renderActionComponent?: React.ReactNode;
};

const BaseHeader = ({
  title,
  safeTopInset = false,
  renderActionComponent,
}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      {safeTopInset && (
        <View
          style={{ height: insets.top, backgroundColor: "white", zIndex: 100 }}
        />
      )}
      <View style={[styles.container, safeTopInset && { paddingTop: 0 }]}>
        <BackButton />
        <Text style={styles.title}>{title}</Text>
        {renderActionComponent && renderActionComponent}
      </View>
    </>
  );
};

export default BaseHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
    ...Shadows.primary,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
});
