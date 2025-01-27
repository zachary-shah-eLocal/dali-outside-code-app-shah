import AnkerText from "components/buttons/AnkerText";
import BaseCard from "components/cards/BaseCard";
import Divider from "components/Divider";
import Text from "components/Text";
import { AddressDisplay } from "features/leads/utils";
import { LinkingHelper } from "helpers/LinkingHelpler";
import MailIcon from "icons/card/MailIcon";
import PhoneIcon from "icons/card/PhoneIcon";
import UserIcon from "icons/card/UserIcon";
import LocationIconS from "icons/LocationIconS";
import React from "react";
import { StyleSheet, View } from "react-native";
import { format } from "utils/index";
import useCall from "../api/useCall";

type Props = {
  supplyEventId: string;
};

const CustomerInformationView = ({ supplyEventId }: Props) => {
  const { data: call } = useCall(supplyEventId);

  const handleMailPress = () => {
    LinkingHelper.open("mailto:" + call.email);
  };
  const handlePhonePress = () => {
    LinkingHelper.open("tel:" + call.phoneNumber);
  };

  return (
    <BaseCard>
      <Text style={styles.title}>Customer Information</Text>
      <Divider />
      <View style={styles.content}>
        <View style={styles.row}>
          <UserIcon />
          <Text style={styles.text}>{`${call?.callerId}`}</Text>
        </View>
        <View style={styles.row}>
          <PhoneIcon />
          <AnkerText
            label={format.phoneNumber(call?.supplyCallEventDTO?.callerNumber)}
            onPress={handlePhonePress}
          />
        </View>
        {call && (
          <View style={styles.row}>
            <LocationIconS />

            <Text style={styles.text}>
              <AddressDisplay lead={call} />
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
