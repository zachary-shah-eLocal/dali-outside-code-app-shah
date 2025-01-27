import React from "react";
import { StyleSheet, View } from "react-native";
import BaseCard from "../../../base/components/cards/BaseCard";
import Text from "../../../base/components/Text";
import MailIcon from "../../../base/icons/card/MailIcon";
import PhoneIcon from "../../../base/icons/card/PhoneIcon";
import UserIcon from "../../../base/icons/card/UserIcon";

type Props = {
  data: any;
};

const ContactCard = ({ data }: Props) => {
  return (
    <BaseCard>
      <View style={styles.topContainer}>
        <Text style={styles.name}>
          {data?.FirstName} {data?.LastName}
        </Text>
      </View>
      <View style={{ gap: 12 }}>
        <View style={styles.item}>
          <PhoneIcon />
          <Text>{data?.Phone}</Text>
        </View>
        <View style={styles.item}>
          <MailIcon />
          <Text>{data?.Email}</Text>
        </View>
        {data?.has_customer_portal_access__c && (
          <View style={styles.item}>
            <UserIcon />
            <Text>Portal Access</Text>
          </View>
        )}
      </View>
    </BaseCard>
  );
};

export default ContactCard;

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
});
