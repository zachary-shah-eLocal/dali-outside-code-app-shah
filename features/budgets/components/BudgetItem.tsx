import BaseCard from "components/cards/BaseCard";
import CustomTable from "components/CustomTable";
import Text from "components/Text";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "theme/colors";
import { format } from "utils/index";

type Props = {
  data: any;
};

const BudgetItem = (props: Props) => {
  const {
    item: {
      Name,
      Billable_Type__c,
      Budget_Interval__c,
      Auto_Recharge__c,
      Recharge_Amount__c,
      Configured_Budget_Amount__c,
      Last_Recharge_Date__c,
    },
  } = props.data;
  return (
    <BaseCard>
      <Text style={styles.title}>{Name}</Text>
      <CustomTable
        data={[
          [Billable_Type__c || "N/A", Budget_Interval__c || "N/A"],
          [
            Auto_Recharge__c ? "Autopay - Yes" : "Autopay - No" || "N/A",
            format.currency(Recharge_Amount__c) || "N/A",
          ],
          [
            format.date(Last_Recharge_Date__c, "PP") || "N/A",
            format.currency(Configured_Budget_Amount__c) || "N/A",
          ],
        ]}
        columnStyles={{
          0: { paddingVertical: 8 },
          1: { paddingVertical: 8 },
          2: { paddingVertical: 8 },
        }}
        columnTextStyles={{
          0: { color: Colors.textLight },
          1: { color: Colors.textLight },
          2: { color: Colors.textLight },
        }}
      />
    </BaseCard>
  );
};

export default BudgetItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
});
