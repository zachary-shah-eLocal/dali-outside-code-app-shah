import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../../base/components/Text";
import BillingTypeIcon from "../../../base/icons/account/BillingTypeIcon";
import InvoiceIcon from "../../../base/icons/account/InvoiceIcon";
import { Colors } from "../../../theme/colors";

type Props = {
  data: any;
};

const AccountDetails = ({ data }: Props) => {
  const accountManager = data?.Account_Manager__r;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <BillingTypeIcon />
        <View>
          <Text style={styles.value}>{data?.Business_Formal_Name__c}</Text>
          <Text style={styles.key}>Formal Name</Text>
        </View>
      </View>
      <View style={styles.item}>
        <InvoiceIcon />
        <View>
          <Text style={styles.value}>{data?.Phone}</Text>
          <Text style={styles.key}>Phone</Text>
        </View>
      </View>
      <View style={styles.item}>
        <InvoiceIcon />
        <View>
          <Text style={styles.value}>{accountManager?.Name}</Text>
          <Text style={styles.key}>Elocal Contact</Text>
        </View>
      </View>
      <View style={styles.item}>
        <InvoiceIcon />
        <View>
          <Text style={styles.value}>{accountManager?.Email}</Text>
          <Text style={styles.key}>Elocal Contact Email</Text>
        </View>
      </View>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#f9f9fe",
    borderRadius: 8,
  },
  key: {
    fontSize: 13,
    color: Colors.textLight,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
  },
});
