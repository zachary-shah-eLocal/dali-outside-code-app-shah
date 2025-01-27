import React from "react";
import { StyleSheet, View } from "react-native";
import useLead from "../../../features/leads/api/useLead";
import { AddressDisplay } from "../../../features/leads/utils";
import { LinkingHelper } from "../../../helpers/LinkingHelpler";
import { format } from "../../../utils";
import MailIcon from "../../icons/card/MailIcon";
import PhoneIcon from "../../icons/card/PhoneIcon";
import UserIcon from "../../icons/card/UserIcon";
import LocationIconS from "../../icons/LocationIconS";
import AnkerText from "../buttons/AnkerText";
import BaseCard from "../cards/BaseCard";
import Divider from "../Divider";
import Text from "../Text";

type Props = {
  supplyEventId: string;
};

const CustomerInformationView = ({ supplyEventId }: Props) => {
  const { data: lead } = useLead(supplyEventId);

  const handleMailPress = () => {
    LinkingHelper.open("mailto:" + lead.email);
  };
  const handlePhonePress = () => {
    LinkingHelper.open("tel:" + lead.phoneNumber);
  };

  return (
    <BaseCard>
      <Text style={styles.title}>Customer Information</Text>
      <Divider />
      <View style={styles.content}>
        <View style={styles.row}>
          <UserIcon />
          <Text
            style={styles.text}
          >{`${lead?.firstName}  ${lead?.lastName}`}</Text>
        </View>
        <View style={styles.row}>
          <PhoneIcon />
          <AnkerText
            label={format.phoneNumber(lead?.phoneNumber)}
            onPress={handlePhonePress}
          />
        </View>
        <View style={styles.row}>
          <MailIcon />
          <AnkerText label={lead?.email} onPress={handlePhonePress} />
        </View>
        {lead && (
          <View style={styles.row}>
            <LocationIconS />

            <Text style={styles.text}>
              <AddressDisplay lead={lead} />
            </Text>
          </View>
        )}
      </View>
    </BaseCard>
  );
};

export default CustomerInformationView;

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
  text: {
    fontWeight: "500",
  },
});
