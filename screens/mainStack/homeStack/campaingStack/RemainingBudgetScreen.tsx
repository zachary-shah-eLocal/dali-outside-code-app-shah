import BaseCard from "components/cards/BaseCard";
import { Container } from "components/containers/Container";
import CustomTable from "components/CustomTable";
import BaseHeader from "components/headers/BaseHeader";
import AppLoader from "components/loaders/AppLoader";
import Text from "components/Text";
import useBudget from "features/budgets/useBudget";
import useCampaigns from "features/campaigns/api/useCampaigns";
import CampaignCard from "features/campaigns/components/CampaignCard";
import useFilters from "hooks/useFilters";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "theme/colors";

type Props = {
  route: any;
};

const RemainingBudgetScreen = ({ route }: Props) => {
  const { budgetId } = route?.params;
  const { data: budget, isLoading } = useBudget(budgetId);

  const { filters } = useFilters({ name: "", budgetId });

  const { data: campaigns, isLoading: isRelatedCampaignsLoading } =
    useCampaigns(filters);

  const getCampaginType = (campaign: any) => {
    if (!campaign) return "";
    const campaignType = campaign?.Product_VConfig__r?.Name?.includes("CALL")
      ? "Call Campaign"
      : "Lead Campaign";
    return campaignType;
  };

  const detailsTableData = [
    ["Name", ":", budget?.Name],
    ["Amount", ":", budget?.Configured_Budget_Amount__c],
    ["Type", ":", budget?.Billable_Type__c],
    [
      "Notification Threshold",
      ":",
      budget?.Utilization_Notification_Threshold__c,
    ],
    ["Auto Recharge", ":", budget?.Auto_Recharge__c],
    ["Recharge Amount", ":", budget?.Recharge_Amount__c],
  ];

  if (isLoading || isRelatedCampaignsLoading) return <AppLoader />;
  return (
    <Container>
      <BaseHeader title="Remaining Budget" safeTopInset />
      <KeyboardAwareScrollView contentContainerStyle={styles.pageView}>
        <View style={{ gap: 8 }}>
          <Text style={styles.title}>{budget?.Name}</Text>
          <Text style={styles.type}>Budgets</Text>
        </View>
        <BaseCard>
          <CustomTable
            data={detailsTableData}
            cellSpacing={10}
            columnStyles={{
              0: { flex: 1.5 },
              1: { flex: 0.5 },
              2: { flex: 1 },
            }}
            columnTextStyles={{
              0: { color: Colors.info[30] },
              1: { color: Colors.info[30] },
              2: { fontSize: 16 },
            }}
          />
        </BaseCard>
        <View style={{ gap: 16 }}>
          <Text style={styles.sectionTitle}>Campaigns against this budget</Text>
          <View style={{ gap: 10 }}>
            {campaigns.records.map((campaign: any, key: number) => (
              <CampaignCard
                name={campaign?.Name}
                type={getCampaginType(campaign)}
                status={campaign?.Campaign_Status__c}
                postgres_External_Key__c={campaign?.Postgres_External_Key__c}
              />
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default RemainingBudgetScreen;

const styles = StyleSheet.create({
  pageView: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 24,
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
