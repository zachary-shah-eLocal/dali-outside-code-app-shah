import BaseCard from "components/cards/BaseCard";
import Text from "components/Text";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "theme/colors";
import useCampaign from "../api/useCampaign";

type Props = {
  id: string;
};

const CampaignCategoryCard = ({ id }: Props) => {
  const { data: campaign } = useCampaign(id);
  const categoires = campaign?.Ad_Campaign_Categories__r?.records || [];

  return (
    <BaseCard
      containerStyles={{ flexDirection: "row", alignItems: "center", gap: 10 }}
    >
      <Text style={{ fontSize: 16, lineHeight: 20, fontWeight: "600" }}>
        Categories
      </Text>
      <View style={{ gap: 5 }}>
        {categoires.map((item: any, key: number) => (
          <View key={key.toString()} style={styles.category}>
            <Text style={styles.label}>{item.Category__r.Name}</Text>
          </View>
        ))}
      </View>
    </BaseCard>
  );
};

export default CampaignCategoryCard;

const styles = StyleSheet.create({
  category: {
    backgroundColor: "#f4f5fe",
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 7.5,
  },
  label: {
    fontSize: 12,
    lineHeight: 20,
    color: Colors.info[30],
  },
});
