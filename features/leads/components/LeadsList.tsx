import { subDays } from "date-fns";
import React, { Suspense, useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import EmptyCard from "../../../base/components/cards/EmptyCard";
import ScreenLoader from "../../../base/components/loaders/ScreenLoader";
import { StorageHelper } from "../../../helpers/Storagehelper";
import useFilters from "../../../hooks/useFilters";
import useLeads from "../api/useLeads";
import Filters from "./Filters";
import LeadCard from "./LeadCard";

const today = new Date();
const sixDaysAgo = subDays(today, 6);

const DEFAULT_FILTERS = {
  filterKey: "phoneNumber",
  filterValue: "",
  campaignId: "",
  campaignListingId: "",
  category: "",
  service: "",
  startDate: new Date(),
  endDate: new Date(),
};

const LeadsList = () => {
  const [storedFilters, setStoredFilters] = React.useState(DEFAULT_FILTERS);
  const [loading, setLoading] = React.useState(true);
  const [filtersInitialized, setFiltersInitialized] = React.useState(false);

  useEffect(() => {
    const fetchStoredFilters = async () => {
      const filters = await StorageHelper.use("leadsFilters", DEFAULT_FILTERS);
      setStoredFilters(filters);
      setLoading(false);
    };
    fetchStoredFilters();
  }, []);

  const handleSetFilters = async (newFilters: any) => {
    await StorageHelper.set("leadsFilters", newFilters);
    setStoredFilters(newFilters);
  };

  const { filters, setFilters, resetFilters, calendarChanged } = useFilters(
    {
      ...DEFAULT_FILTERS,
      ...storedFilters,
      startDate: new Date(storedFilters.startDate || sixDaysAgo),
      endDate: new Date(storedFilters.endDate || today),
    },
    handleSetFilters
  );

  useEffect(() => {
    if (!loading && !filtersInitialized) {
      setFilters({
        ...DEFAULT_FILTERS,
        ...storedFilters,
        startDate: new Date(storedFilters.startDate || sixDaysAgo),
        endDate: new Date(storedFilters.endDate || today),
      });
      setFiltersInitialized(true);
    }
  }, [loading, storedFilters, filtersInitialized]);

  const { data: leads, isLoading, isFetching, refetch } = useLeads(filters);

  return (
    <Suspense fallback={<ScreenLoader />}>
      <FlatList
        data={leads?.response?.supplyEvents || []}
        keyExtractor={(item) => item.supplyEventId}
        renderItem={({ item }) => <LeadCard lead={item} />}
        ListHeaderComponent={
          <Filters
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            calendarChanged={calendarChanged}
          />
        }
        ListFooterComponent={isLoading ? () => <ScreenLoader /> : undefined}
        ListEmptyComponent={<EmptyCard toRender={!isLoading} />}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
          />
        }
      />
    </Suspense>
  );
};

export default LeadsList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
  },
});
