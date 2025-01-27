import EmptyCard from "components/cards/EmptyCard";
import ScreenLoader from "components/loaders/ScreenLoader";
import { subDays } from "date-fns";
import useFilters from "hooks/useFilters";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import useInvoices from "../api/useInvoices";
import BillingFilters from "./BillingFilters";
import InvoiceCard from "./InvoiceCard";

const today = new Date();
const sixDaysAgo = subDays(today, 6);

const InvoicesTab = () => {
  const { filters, setFilters, resetFilters } = useFilters({
    page: 1,
    startDate: sixDaysAgo,
    endDate: today,
    size: 10,
  });

  const { data: invoices, isLoading } = useInvoices(filters);

  const mockData = [
    {
      occurred_on: "2024-11-18T06:02:06.620528Z",
      invoice_num: "ELADV8",
      due_date: "2024-11-18T06:02:06.620528Z",
      payment_method_identifier: "Credit Card",
      amount: 100.0,
      status: "Closed",
    },
  ];

  return (
    <FlatList
      data={mockData || []}
      // data={invoices?.response || []}
      keyExtractor={(item) => item.invoice_num}
      renderItem={({ item }) => <InvoiceCard invoice={item} />}
      ListHeaderComponent={
        <BillingFilters filters={filters} setFilters={setFilters} />
      }
      ListFooterComponent={isLoading ? () => <ScreenLoader /> : undefined}
      ListEmptyComponent={<EmptyCard toRender={!isLoading} />}
      contentContainerStyle={styles.container}
    />
  );
};

export default InvoicesTab;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
  },
});
