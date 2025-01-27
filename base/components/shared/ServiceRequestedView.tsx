import React from "react";
import { StyleSheet, View } from "react-native";
import useLead from "../../../features/leads/api/useLead";
import { LinkingHelper } from "../../../helpers/LinkingHelpler";
import { Colors } from "../../../theme/colors";
import AnkerText from "../buttons/AnkerText";
import BaseCard from "../cards/BaseCard";
import Divider from "../Divider";
import Text from "../Text";

type Props = {
  supplyEventId: string;
};

const ServiceRequestedView = ({ supplyEventId }: Props) => {
  const { data: lead } = useLead(supplyEventId);

  const handleMailPress = () => {
    LinkingHelper.open("mailto:" + lead.email);
  };
  const handlePhonePress = () => {
    LinkingHelper.open("tel:" + lead.phoneNumber);
  };

  return (
    <BaseCard>
      <Text style={styles.title}>Service Requested</Text>
      <Divider />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.key}>Category : </Text>
          <Text style={styles.value}>{lead.categoryName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Service : </Text>
          <Text style={styles.value}>{lead.serviceName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.key}>Campaign : </Text>
          <AnkerText label={lead.adCampaignName} onPress={() => {}} />
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Listing : </Text>
          <AnkerText label={lead.listingName} onPress={() => {}} />
        </View>
      </View>
    </BaseCard>
  );
};

export default ServiceRequestedView;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
    gap: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  key: {
    color: Colors.gray,
  },
  value: {
    fontWeight: "500",
  },
});
