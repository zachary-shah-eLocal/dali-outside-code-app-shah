import { subDays } from "date-fns";
import React, { Suspense, useEffect, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import EmptyCard from "../../../base/components/cards/EmptyCard";
import ScreenLoader from "../../../base/components/loaders/ScreenLoader";
import { StorageHelper } from "../../../helpers/Storagehelper";
import useFilters from "../../../hooks/useFilters";
import useCalls from "../api/useCalls";
import CallCard from "./CallCard";
import Filters from "./Filters";

const today = new Date();
const sixDaysAgo = subDays(today, 6);

const DEFAULT_FILTERS = {
  filterKey: "phoneNumber",
  filterValue: "",
  campaignId: "",
  campaignListingId: "",
  category: "",
  startDate: new Date(),
  endDate: new Date(),
};

const CallsList = () => {
  const [storedFilters, setStoredFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [filtersInitialized, setFiltersInitialized] = useState(false);

  useEffect(() => {
    const fetchStoredFilters = async () => {
      const filters = await StorageHelper.use("callsFilters", DEFAULT_FILTERS);
      setStoredFilters(filters);
      setLoading(false);
    };
    fetchStoredFilters();
  }, []);

  const handleSetFilters = async (newFilters: any) => {
    await StorageHelper.set("callsFilters", newFilters);
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

  const { data: calls, refetch, isLoading, isFetching } = useCalls(filters);
  return (
    <Suspense fallback={<ScreenLoader />}>
      <FlatList
        data={calls?.supplyEvents}
        keyExtractor={(item) => item.supplyEventId}
        renderItem={({ item }) => <CallCard call={item} />}
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
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
          />
        }
        contentContainerStyle={styles.container}
      />
    </Suspense>
  );
};

export default CallsList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
  },
});
