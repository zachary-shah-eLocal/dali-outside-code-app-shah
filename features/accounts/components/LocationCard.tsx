import React from "react";
import { StyleSheet, View } from "react-native";
import BaseCard from "../../../base/components/cards/BaseCard";
import Text from "../../../base/components/Text";
import PhoneIcon from "../../../base/icons/card/PhoneIcon";
import LocationIconS from "../../../base/icons/LocationIconS";
import ZipIcon from "../../../base/icons/ZipIcon";
import { format } from "../../../utils";

type Props = {
  data: any;
};

const LocationCard = ({ data }: Props) => {
  const {
    Name,
    Listing_Owner_Phone_Number__c,
    Address_1__c,
    City__c,
    State_or_Province__c,
    Country_Code__c,
    Zip_Postal_Code__c,
  } = data;
  return (
    <BaseCard>
      <View style={styles.topContainer}>
        <Text style={styles.name}>{Name}</Text>
      </View>
      <View style={{ gap: 12 }}>
        <View style={styles.item}>
          <PhoneIcon />
          <Text style={styles.text}>
            {format.phoneNumber(Listing_Owner_Phone_Number__c)}
          </Text>
        </View>
        <View style={styles.item}>
          <LocationIconS />
          <Text style={styles.text}>
            {Address_1__c}, {City__c} {State_or_Province__c} {Country_Code__c}{" "}
          </Text>
        </View>
        <View style={styles.item}>
          <ZipIcon />
          <Text style={styles.text}>{Zip_Postal_Code__c}</Text>
        </View>
      </View>
    </BaseCard>
  );
};

export default LocationCard;

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
