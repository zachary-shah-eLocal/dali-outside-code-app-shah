import { RouteProp } from "@react-navigation/native";
import BaseCard from "components/cards/BaseCard";
import { Container } from "components/containers/Container";
import BaseHeader from "components/headers/BaseHeader";
import AppLoader from "components/loaders/AppLoader";
import Text from "components/Text";
import CallsList from "features/calls/components/CallsList";
import useCampaign from "features/campaigns/api/useCampaign";
import CampaignCategoryCard from "features/campaigns/components/CampaignCategoryCard";
import CampaignTypeCard from "features/campaigns/components/CampaignTypeCard";
import ListingsCard from "features/campaigns/components/ListingsCard";
import ScheduleAccordion from "features/campaigns/components/ScheduleAccordion";
import LeadsList from "features/leads/components/LeadsList";
import { Navigation } from "helpers/Navigationhelper";
import ArrowRight from "icons/ArrowRight";
import CurrencyIcon from "icons/CurrencyIcon";
import IOIcon from "icons/IOIcon";
import ListingIcon from "icons/ListingIcon";
import { Screens } from "navigation/consts/Screens";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "theme/colors";
import { format } from "utils/index";

const CampaignDetailsScreen = ({ route }: any) => {
  const { campaignId } = route.params;
  const { data: campaign, isLoading } = useCampaign(campaignId);
  const budget = campaign?.Configured_Budget__r;

  const navigateRemainingBudget = () => {
    Navigation.navigate(Screens.REMAINING_BUDGET_SCREEN, {
      budgetId: budget?.Postgres_External_Key__c,
    });
  };

  if (isLoading) return <AppLoader />;
  return (
    <Container>
      <BaseHeader title="Campaign Details" safeTopInset />
      <KeyboardAwareScrollView contentContainerStyle={styles.pageView}>
        <View style={{ gap: 25, paddingHorizontal: 20 }}>
          <View style={{ gap: 8 }}>
            <Text style={styles.title}>{campaign.Name}</Text>
            <Text style={styles.type}>
              {format.campaignType(campaign.productType)} Campaign
            </Text>
          </View>
          <View style={{ gap: 16 }}>
            <BaseCard
              containerStyles={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <IOIcon />
              <View>
                <Text style={{ fontSize: 16, lineHeight: 20, opacity: 0.5 }}>
                  Status
                </Text>
                <Text
                  style={{ fontSize: 16, lineHeight: 20, fontWeight: "600" }}
                >
                  {campaign.Campaign_Status__c}
                </Text>
              </View>
            </BaseCard>
            <BaseCard>
              <TouchableOpacity
                style={{
                  flexGrow: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
                onPress={navigateRemainingBudget}
              >
                <Text style={styles.dollarIcon}>$</Text>
                <View style={{ marginRight: "auto" }}>
                  <Text style={{ fontSize: 16, lineHeight: 20, opacity: 0.5 }}>
                    Remaining budget
                  </Text>
                  <Text
                    style={{ fontSize: 16, lineHeight: 20, fontWeight: "600" }}
                  >
                    {budget
                      ? format.currency(budget.Configured_Budget_Amount__c)
                      : "No Budget"}
                  </Text>
                </View>
                <ArrowRight />
              </TouchableOpacity>
            </BaseCard>
            <ListingsCard id={campaignId} />
            <CampaignTypeCard id={campaignId} />
            <CampaignCategoryCard id={campaignId} />
            <ScheduleAccordion id={campaignId} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Recent Activity
          </Text>
        </View>
        {campaign.productType === "call" ? <CallsList /> : <LeadsList />}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default CampaignDetailsScreen;

const styles = StyleSheet.create({
  pageView: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  type: {
    color: Colors.gray,
  },
  dollarIcon: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.secondary,
  },
});
