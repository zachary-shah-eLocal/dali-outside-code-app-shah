import EmptyCard from "components/cards/EmptyCard";
import ScreenLoader from "components/loaders/ScreenLoader";
import { subDays } from "date-fns";
import useBudgetDetail from "features/billingActivity/api/useBudgetDetail";
import useFilters from "hooks/useFilters";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import BillingFilters from "./BillingFilters";
import BudgetDetailsCard from "./BudgetDetailsCard";

const today = new Date();
const sixDaysAgo = subDays(today, 6);

const ActivityTab = () => {
  const { filters, setFilters, resetFilters } = useFilters({
    page: 1,
    startDate: sixDaysAgo,
    endDate: today,
    size: 10,
  });

  const { data: budgetDetail, isLoading } = useBudgetDetail(filters);

  return (
    <FlatList
      data={budgetDetail?.budgetActivities || []}
      keyExtractor={(item) => item.budgetActivityId}
      renderItem={({ item }) => <BudgetDetailsCard item={item} />}
      ListHeaderComponent={
        <BillingFilters filters={filters} setFilters={setFilters} />
      }
      ListFooterComponent={isLoading ? () => <ScreenLoader /> : undefined}
      ListEmptyComponent={<EmptyCard toRender={!isLoading} />}
      contentContainerStyle={styles.container}
    />
  );
};

export default ActivityTab;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
  },
});
