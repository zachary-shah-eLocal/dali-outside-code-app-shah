import SearchComponent from "components/inputs/SearchComponent";
import Pagination from "components/pagination/Pagination";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import BaseCard from "../../../../base/components/cards/BaseCard";
import EmptyCard from "../../../../base/components/cards/EmptyCard";
import { Container } from "../../../../base/components/containers/Container";
import PageView from "../../../../base/components/containers/PageView";
import ScreenLoader from "../../../../base/components/loaders/ScreenLoader";
import { LoadingSpinner } from "../../../../components/atoms";
import { Header } from "../../../../components/sections/Header";
import useCampaigns from "../../../../features/campaigns/api/useCampaigns";
import CampaignCard from "../../../../features/campaigns/components/CampaignCard";

const CampaignsScreen = () => {
  const [filters, setFilters] = useState({ name: "", page: 1, size: 10 });

  const setPage = (page: number) => {
    setFilters({ ...filters, page });
  };
  const {
    isLoading,
    data: campaigns,
    isFetching,
    refetch,
  } = useCampaigns(filters);

  const [query, setQuery] = useState("");

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        {isLoading ? (
          <ScreenLoader />
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={campaigns?.records || []}
            keyExtractor={(item) => item.Id}
            renderItem={({ item }) => (
              <CampaignCard
                name={item.Name}
                type={
                  item?.Product_VConfig__r?.Name?.includes("CALL")
                    ? "Call Campaign"
                    : "Lead Campaign"
                }
                status={item.Campaign_Status__c}
                postgres_External_Key__c={item.Postgres_External_Key__c}
              />
            )}
            ListEmptyComponent={<EmptyCard toRender={!isLoading} />}
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={isFetching && !isLoading}
                onRefresh={refetch}
              />
            }
            ListHeaderComponent={
              <SearchComponent
                value={query}
                onChangeText={(text) => setQuery(text)}
                onSubmit={() => {
                  setFilters({ ...filters, name: query });
                }}
                placeholder="Search Name"
              />
            }
            ListFooterComponent={
              <Pagination
                {...campaigns?.pageable}
                setPage={setPage}
                disabled={isLoading}
              />
            }
            ListFooterComponentStyle={{
              marginTop: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
      </SafeAreaView>
    </Container>
  );
};

export default CampaignsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    flexGrow: 1,
  },
});
