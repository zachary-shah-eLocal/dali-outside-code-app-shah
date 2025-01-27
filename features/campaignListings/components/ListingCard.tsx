import BaseCard from "components/cards/BaseCard";
import { Navigation } from "helpers/Navigationhelper";
import { Screens } from "navigation/consts/Screens";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: any;
};

const displayWithComma = (value: string) => {
  if (value) {
    return `${value}, `;
  }
  return "";
};

const ListingCard = ({ item }: Props) => {
  const name = item?.Listing__r.Name;
  const formattedAddress =
    displayWithComma(item.Listing__r.Address_1__c) +
    displayWithComma(item.Listing__r.Address_2__c) +
    displayWithComma(item.Listing__r.City__c) +
    item.Listing__r.State_or_Province__c +
    item.Listing__r.Zip_Postal_Code__c;

  const handlePress = () => {
    Navigation.navigate(Screens.CAMPAIGN_LISTING_DETAILS_SCREEN, {
      listingId: item.Postgres_External_Key__c,
      campaignId: item.Ad_Campaign__r.Postgres_External_Key__c,
    });
  };

  return (
    <BaseCard>
      <TouchableOpacity style={{ gap: 12 }} onPress={handlePress}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.address}>{formattedAddress}</Text>
      </TouchableOpacity>
    </BaseCard>
  );
};

export default ListingCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
  },
  address: {
    fontSize: 16,
    lineHeight: 20,
    opacity: 0.5,
  },
});
