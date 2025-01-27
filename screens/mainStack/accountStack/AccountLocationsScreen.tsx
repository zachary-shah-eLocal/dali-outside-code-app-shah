import EmptyCard from "components/cards/EmptyCard";
import SearchComponent from "components/inputs/SearchComponent";
import SelectDropdown from "components/inputs/SelectDropdown";
import ScreenLoader from "components/loaders/ScreenLoader";
import useFilters from "hooks/useFilters";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Container } from "../../../base/components/containers/Container";
import PageView from "../../../base/components/containers/PageView";
import BaseHeader from "../../../base/components/headers/BaseHeader";
import useCampaignListings from "../../../features/accounts/api/useListings";
import LocationCard from "../../../features/accounts/components/LocationCard";

type Props = {};

const AccountLocationsScreen = (props: Props) => {
  const insets = useSafeAreaInsets();

  const [filterKey, setFilterKey] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  const dropDownItems = [
    { label: "Name", value: "name" },
    { label: "Phone", value: "phone" },
    { label: "Address", value: "address" },
  ];

  const { filters, setFilters } = useFilters({ filterKey: "name" });

  const onSubmit = () => {
    setFilters({ filterKey, filterValue });
  };

  const {
    data: listings,
    isLoading,
    isFetching,
  } = useCampaignListings(filters);

  return (
    <Container>
      <BaseHeader title="Locations" safeTopInset />
      <PageView containerStyle={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.Id}
          data={listings?.records}
          ListHeaderComponent={
            <SearchComponent
              selectorComponent={
                <SelectDropdown
                  data={dropDownItems}
                  value={filterKey}
                  setValue={setFilterKey}
                  dropDownStyles={{ width: 150, borderWidth: 0 }}
                />
              }
              value={filterValue}
              onChangeText={setFilterValue}
              onSubmit={onSubmit}
              placeholder="Search"
            />
          }
          renderItem={({ item }) => <LocationCard data={item} />}
          ListEmptyComponent={<EmptyCard toRender={!isLoading} />}
          refreshing={true}
          contentContainerStyle={[
            styles.scrollView,
            { paddingBottom: insets.top + insets.bottom + 60 },
          ]}
          ListFooterComponent={
            isLoading || isFetching ? <ScreenLoader /> : null
          }
        />
      </PageView>
    </Container>
  );
};

export default AccountLocationsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
});
