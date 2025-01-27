import React from "react";
import { StyleSheet, View } from "react-native";
import BaseCard from "../../../base/components/cards/BaseCard";
import Switch from "../../../base/components/inputs/Switch";
import Text from "../../../base/components/Text";
import CalendarIcon from "../../../base/icons/CalendarIcon";
import { format } from "../../../utils";

type Props = {
  data: any;
  onToogle: (data: any) => void;
};

const HolidayCard = ({ data, onToogle }: Props) => {
  const { name, startDate, endDate, isActive } = data;
  return (
    <BaseCard>
      <View style={styles.topContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.item}>
          <CalendarIcon />
          <Text style={styles.text}>
            {format.date(startDate, "MMM dd,yyy")} -{" "}
            {format.date(endDate, "MMM dd,yyy")}
          </Text>
        </View>
        <Switch
          value={isActive}
          onValueChange={() => {
            onToogle(data);
          }}
        />
      </View>
    </BaseCard>
  );
};

export default HolidayCard;

const styles = StyleSheet.create({
  topContainer: {
    marginBottom: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  item: {
    flexDirection: "row",
    gap: 6,
  },
  text: {
    lineHeight: 16,
    flexShrink: 1,
    fontWeight: "300",
  },
});
