import { Container } from "components/containers/Container";
import BaseHeader from "components/headers/BaseHeader";
import AppLoader from "components/loaders/AppLoader";
import Pagination from "components/pagination/Pagination";
import Text from "components/Text";
import useCampaignListings from "features/campaignListings/api/useCampaignListings";
import ListingCard from "features/campaignListings/components/ListingCard";
import useCampaign from "features/campaigns/api/useCampaign";
import LeadsList from "features/leads/components/LeadsList";
import useFilters from "hooks/useFilters";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "theme/colors";

type Props = {
  route: any;
};

const CampaignListingsScreen = ({ route }: Props) => {
  const { campaignId } = route.params;
  const { data: campaign, isLoading } = useCampaign(campaignId);

  const filters = { page: 1, campaignId, size: 1, name: "" };
  const { data: listings, isLoading: isListingsLoading } =
    useCampaignListings(filters);

  if (isLoading || isListingsLoading) return <AppLoader />;
  return (
    <Container>
      <BaseHeader title="Campaign Listings" safeTopInset />
      <KeyboardAwareScrollView contentContainerStyle={styles.pageView}>
        <View style={{ gap: 8 }}>
          <Text style={styles.title}>{campaign.Name}</Text>
          <Text style={styles.type}>Listings</Text>
        </View>
        {listings?.records.map((item: any) => (
          <ListingCard key={item.Id} item={item} />
        ))}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default CampaignListingsScreen;

const styles = StyleSheet.create({
  pageView: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  type: {
    color: Colors.gray,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22.6,
  },
});
