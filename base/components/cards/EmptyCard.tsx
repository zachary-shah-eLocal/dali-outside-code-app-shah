import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../../theme/colors";
import EmptyCardIcon from "../../icons/EmptyCardIcon";
import Text from "../Text";
import BaseCard from "./BaseCard";

type Props = { toRender: boolean };

const EmptyCard = ({ toRender }: Props) => {
  if (!toRender) return null;
  return (
    <BaseCard containerStyles={styles.container}>
      <EmptyCardIcon />
      <Text style={styles.title}>No Results Found</Text>
      {/* <Text style={styles.subTitle}>Try using different Filters</Text> */}
    </BaseCard>
  );
};

export default EmptyCard;

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", gap: 10 },
  title: { fontSize: 20, fontWeight: "700" },
  subTitle: { fontSize: 16, fontWeight: "500", color: Colors.gray },
});
