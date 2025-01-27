import BaseCard from "components/cards/BaseCard";
import Text from "components/Text";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "theme/colors";
import { format } from "utils/index";

const BudgetDetailsCard = ({ item }: any) => {
  const {
    supplyEventStartTime,
    creditOrDebit,
    effectiveRunningBalance,
    budgetEventType,
    supplyEventType,
    credit,
    debit,
  } = item;

  const formatIt = (value: string | undefined): string =>
    value ? value.split("_").join(" ").toLowerCase() : "";

  interface RenderTitleParams {
    budgetEventType: string;
    supplyEventType?: string;
  }

  const renderTitle = ({
    budgetEventType,
    supplyEventType,
  }: RenderTitleParams): string => {
    if (
      budgetEventType === "BILLABLE_EVENT" ||
      budgetEventType === "RETURNED_EVENT"
    ) {
      return formatIt(supplyEventType);
    }
    if (budgetEventType === "BUDGET_RECHARGE") {
      return "Recharge";
    }
    if (budgetEventType === "CREDIT_ADJUSTMENT") {
      return "Adjustment";
    }
    return formatIt(budgetEventType);
  };

  return (
    <BaseCard containerStyles={{ gap: 8 }}>
      <Text style={styles.date}>
        {format.date(supplyEventStartTime, "MMM dd, yyyy | hh:ss")}
      </Text>
      <View style={styles.row}>
        <Text style={styles.title}>
          {renderTitle({ budgetEventType, supplyEventType })}
        </Text>
        <Text
          style={[
            styles.title,
            {
              color:
                creditOrDebit === "CREDIT"
                  ? Colors.success[30]
                  : Colors.danger[50],
            },
          ]}
        >
          {format.currency(creditOrDebit === "CREDIT" ? credit : debit * -1)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{ fontWeight: "500" }}>
          Balance:{format.currency(effectiveRunningBalance)}
        </Text>
        <Text style={{ fontWeight: "500" }}>{creditOrDebit}</Text>
      </View>
    </BaseCard>
  );
};

export default BudgetDetailsCard;

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
});
