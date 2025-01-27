import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Container } from "../../../base/components/containers/Container";
import PageView from "../../../base/components/containers/PageView";
import BaseHeader from "../../../base/components/headers/BaseHeader";
import AppLoader from "../../../base/components/loaders/AppLoader";
import Text from "../../../base/components/Text";
import useUsersContact from "../../../features/contacts/api/useUsersContact";
import useHolidays from "../../../features/holidays/api/useHolidays";
import useSetHolidayActive from "../../../features/holidays/api/useSetHolidayActive";
import HolidayCard from "../../../features/holidays/components/HolidayCard";
import { ToastHelper } from "../../../helpers/ToastHelpers";

type Props = {};

const AccountHolidaysScreen = (props: Props) => {
  const insets = useSafeAreaInsets();
  const { data: holidaysRes, isLoading } = useHolidays();
  const { mutate: toogleHoliday } = useSetHolidayActive();
  const { data: userContact } = useUsersContact();

  const queryClient = new QueryClient();

  const handleToogle = (holiday: any) => {
    toogleHoliday(
      [
        {
          ...holiday,
          isActive: !holiday.isActive,
          contactId: userContact?.Postgres_External_Key__c,
        },
      ],
      {
        onSuccess: () => {
          queryClient.invalidateQueries("holidays");
          ToastHelper.success(`${holiday.name} was updated`);
        },
        onError: () => {
          ToastHelper.error(`${holiday.name} was not updated`);
        },
      }
    );
  };

  if (isLoading) return <AppLoader />;
  return (
    <Container>
      <BaseHeader title="Holidays" safeTopInset />
      <PageView>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.title}>
              You can set dates to pause all activity on your account. You have
              a set number of days per year you can pause for and cannot create
              a pause longer than 30 days in a row
            </Text>
          }
          data={holidaysRes?.holidays || []}
          renderItem={({ item }) => (
            <HolidayCard data={item} onToogle={handleToogle} />
          )}
          keyExtractor={(item) => item.Id}
          contentContainerStyle={[
            styles.scrollView,
            { paddingBottom: insets.top + insets.bottom + 60 },
          ]}
        />
      </PageView>
    </Container>
  );
};

export default AccountHolidaysScreen;

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
