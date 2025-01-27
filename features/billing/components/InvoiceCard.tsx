import BaseCard from "components/cards/BaseCard";
import BaseStatus from "components/statuses/BaseStatus";
import Text from "components/Text";
import DownloadIcon from "icons/DownloadIcon";
import { get } from "lodash";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { format } from "utils/index";

const InvoiceCard = ({ invoice }: any) => {
  const {
    occurred_on,
    invoice_num,
    due_date,
    payment_method_identifier,
    amount,
    status,
  } = invoice;

  const getStatusType = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "info";
      case "billable":
        return "success";
      case "active":
        return "success";
      case "closed":
        return "success";
      case "returned":
        return "error";
      default:
        return "info";
    }
  };

  // TODO download

  return (
    <BaseCard containerStyles={{ gap: 8 }}>
      <View style={styles.row}>
        <Text style={styles.date}>
          {format.date(occurred_on, "MMM dd, yyyy")}
        </Text>
        <BaseStatus type={getStatusType(status)} label={status} />
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Invoice # {invoice_num}</Text>
        <Text style={styles.title}>{format.currency(amount)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={{}}>
          Due Date: {format.date(due_date, "MMM dd, yyyy")}
        </Text>
        <Text style={{}}>Method: {payment_method_identifier}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <DownloadIcon />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Download</Text>
      </TouchableOpacity>
    </BaseCard>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({
  date: {
    fontSize: 10,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
