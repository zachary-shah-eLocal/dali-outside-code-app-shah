import Button from "components/buttons/Button";
import { Container } from "components/containers/Container";
import BaseHeader from "components/headers/BaseHeader";
import Pagination from "components/pagination/Pagination";
import BudgetItem from "features/budgets/components/BudgetItem";
import useFilters from "hooks/useFilters";
import { filter, size } from "lodash";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ScreenLoader from "../../../base/components/loaders/ScreenLoader";
import AccountScreensWrapper from "../../../features/accounts/components/AccountScreensWrapper";
import useBudgets from "../../../features/budgets/useBudgets";

const AccountBudgetsScreen = () => {
  const { filters, setFilters } = useFilters({ page: 1, size: 20 });
  const { data: budgets, isLoading } = useBudgets(filters);

  const setPage = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <Container containerStyle={{ backgroundColor: "white" }}>
      <BaseHeader title={"Budgets"} safeTopInset />
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <FlatList
          data={budgets?.records}
          keyExtractor={(item) => item.Id}
          renderItem={(item) => <BudgetItem data={item} />}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, padding: 20, gap: 12 }}
          ListFooterComponent={
            <Pagination
              {...budgets?.pageable}
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
    </Container>
  );
};

export default AccountBudgetsScreen;
