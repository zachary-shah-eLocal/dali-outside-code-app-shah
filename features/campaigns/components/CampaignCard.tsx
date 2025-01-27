import AnkerText from "components/buttons/AnkerText";
import BaseCard from "components/cards/BaseCard";
import BaseStatus from "components/statuses/BaseStatus";
import Text from "components/Text";
import { Navigation } from "helpers/Navigationhelper";
import { Screens } from "navigation/consts/Screens";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "theme/colors";

type Props = {
  name: string;
  type: string;
  status: string;
  postgres_External_Key__c?: string;
};

const CampaignCard = ({
  name,
  type,
  status,
  postgres_External_Key__c,
}: Props) => {
  const statusType = status === "ACTIVE" ? "success" : "info";

  const handleNavigation = () => {
    Navigation.navigate(Screens.CAMPAIGN_DETAILS_SCREEN, {
      campaignId: postgres_External_Key__c,
    });
  };

  return (
    <BaseCard>
      <TouchableOpacity style={{ gap: 8 }} onPress={handleNavigation}>
        <AnkerText
          label={name}
          onPress={handleNavigation}
          textStyle={styles.name}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.type}>{type}</Text>
          <BaseStatus type={statusType} label={status} />
        </View>
      </TouchableOpacity>
    </BaseCard>
  );
};

export default CampaignCard;

const styles = StyleSheet.create({
  name: {
    marginRight: "auto",
    fontSize: 16,
    color: Colors.text,
    fontWeight: "600",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  type: {},
});
