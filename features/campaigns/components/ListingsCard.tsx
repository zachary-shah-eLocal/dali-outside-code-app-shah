import BaseCard from "components/cards/BaseCard";
import ScreenLoader from "components/loaders/ScreenLoader";
import Text from "components/Text";
import useCampaignListings from "features/campaignListings/api/useCampaignListings";

import { Navigation } from "helpers/Navigationhelper";
import ArrowRight from "icons/ArrowRight";
import ListingIcon from "icons/ListingIcon";
import { Screens } from "navigation/consts/Screens";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  id: string;
};

const ListingsCard = ({ id }: Props) => {
  const filters = { page: 1, campaignId: id, size: 1, name: "" };
  const { data: listings, isLoading } = useCampaignListings(filters);

  const listingCount = listings?.records.length;

  const handleNavigation = () => {
    Navigation.navigate(Screens.CAMPAIGN_LISTING_SCREEN, { campaignId: id });
  };
  return (
    <BaseCard>
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <TouchableOpacity
          onPress={handleNavigation}
          style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
        >
          <ListingIcon />
          <Text style={{ fontSize: 16, lineHeight: 20, opacity: 0.5 }}>
            Listings
          </Text>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 20,
              fontWeight: "600",
              marginRight: "auto",
            }}
          >
            {listingCount}
          </Text>
          <ArrowRight />
        </TouchableOpacity>
      )}
    </BaseCard>
  );
};

export default ListingsCard;

const styles = StyleSheet.create({});
