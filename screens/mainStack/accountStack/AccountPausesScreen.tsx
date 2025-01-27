import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BaseCard from "../../../base/components/cards/BaseCard";
import { Container } from "../../../base/components/containers/Container";
import PageView from "../../../base/components/containers/PageView";
import BaseHeader from "../../../base/components/headers/BaseHeader";
import AppLoader from "../../../base/components/loaders/AppLoader";
import ScreenLoader from "../../../base/components/loaders/ScreenLoader";
import Text from "../../../base/components/Text";
import useUsersContact from "../../../features/contacts/api/useUsersContact";
import useHolidays from "../../../features/holidays/api/useHolidays";
import useSetHolidayActive from "../../../features/holidays/api/useSetHolidayActive";
import HolidayCard from "../../../features/holidays/components/HolidayCard";
import { ToastHelper } from "../../../helpers/ToastHelpers";

const today = new Date();

type Props = {};

const AccountPausesScreen = (props: Props) => {
  const insets = useSafeAreaInsets();
  const { data: holidayRes, isLoading } = useHolidays();
  const remainingPauseDays =
    holidayRes?.remainingPauseDaysByYear[today.getFullYear()] ||
    holidayRes?.allowedPauseDays ||
    0;

  const { mutate: toogleHoliday } = useSetHolidayActive();
  const { data: userContact } = useUsersContact();

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
            <View style={{ gap: 16 }}>
              <Text style={styles.title}>
                Holidays are used to pause your account. You will not recieve
                any calls or leads on days Holidays are active.
              </Text>
              <BaseCard
                containerStyles={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 28, textAlign: "center" }}>
                  {remainingPauseDays}
                </Text>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  Pause Days
                </Text>
              </BaseCard>
            </View>
          }
          data={holidayRes?.pauses || []}
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

export default AccountPausesScreen;

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
