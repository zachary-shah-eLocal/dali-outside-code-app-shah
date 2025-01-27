import AnkerText from "components/buttons/AnkerText";
import OptionButton from "components/buttons/OptionButton";
import BaseCard from "components/cards/BaseCard";
import Divider from "components/Divider";
import AppLoader from "components/loaders/AppLoader";
import Tabs from "components/tabs/Tabs";
import Text from "components/Text";
import useAccount from "features/accounts/api/useAccount";
import useBillingAccount from "features/billing/api/useBillingAccount";
import ActivityTab from "features/billing/components/ActivityTab";
import InvoicesTab from "features/billing/components/InvoicesTab";
import { Navigation } from "helpers/Navigationhelper";
import ArrowRight from "icons/ArrowRight";
import CurrencyIcon from "icons/CurrencyIcon";
import InvoiceDateIcon from "icons/InvoiceDateIcon";
import Location2SIcon from "icons/Location2SIcon";
import LocationIconS from "icons/LocationIconS";
import PaperIcon from "icons/PaperIcon";
import PendingChargesIcon from "icons/PendingChargesIcon";
import ShowIcon from "icons/ShowIcon";
import TimerIcon from "icons/TimerIcon";
import { Screens } from "navigation/consts/Screens";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "theme/colors";
import { format } from "utils/index";
import { Container } from "../../../../base/components/containers/Container";
import PageView from "../../../../base/components/containers/PageView";
import { Header } from "../../../../components/sections/Header";

const tabs = [
  { label: "Billing Activity", tab: <ActivityTab /> },
  { label: "Invoices", tab: <InvoicesTab /> },
];

const BillingScreen = () => {
  const { data: account, isLoading: isAccountLoading } = useAccount();
  const { data: billingDetails, isLoading: isBillingDetailsLoading } =
    useBillingAccount();

  const handleToPaymnetMethods = () => {
    Navigation.navigate(Screens.PAYMENT_METHODS_SCREEN);
  };

  if (isAccountLoading || isBillingDetailsLoading) {
    return <AppLoader />;
  }
  return (
    <Container>
      <SafeAreaView>
        <Header />
        <PageView containerStyle={styles.container}>
          <ScrollView contentContainerStyle={{ gap: 16 }}>
            <BaseCard containerStyles={{ gap: 16, marginHorizontal: 20 }}>
              <View>
                <Text style={{ color: Colors.gray, marginBottom: 2 }}>
                  Account name
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  {account?.Name}
                </Text>
              </View>
              <Divider />
              <View style={{ gap: 8, marginBottom: 12 }}>
                <View style={[styles.row]}>
                  <View style={styles.pair}>
                    <PaperIcon />
                    <View style={styles.col}>
                      <Text style={styles.item}>
                        {billingDetails?.billType}
                      </Text>
                      <Text style={styles.desc}>Billing Type</Text>
                    </View>
                  </View>
                  <View style={styles.pair}>
                    <InvoiceDateIcon />
                    <View style={styles.col}>
                      <Text style={styles.item}>
                        {format.date(
                          new Date(billingDetails?.nextInvoiceDate),
                          "PP"
                        )}
                      </Text>
                      <Text style={styles.desc}>Next Invoice Date</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.pair}>
                    <PendingChargesIcon />
                    <View style={styles.col}>
                      <Text style={styles.item}>
                        {format.currency(billingDetails?.totalPendingCharges)}
                      </Text>
                      <Text style={styles.desc}>Pending Charges</Text>
                    </View>
                  </View>
                  <View style={styles.pair}>
                    <CurrencyIcon height={20} width={20} />
                    <View style={styles.col}>
                      <Text style={styles.item}>
                        {format.currency(billingDetails.accountBalance)}
                      </Text>
                      <Text style={styles.desc}>Account Balance</Text>
                    </View>
                  </View>
                </View>
              </View>
            </BaseCard>
            <TouchableOpacity
              style={{ marginHorizontal: 20 }}
              onPress={handleToPaymnetMethods}
            >
              <BaseCard
                containerStyles={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18 }}>Payment Methods</Text>
                <ArrowRight />
              </BaseCard>
            </TouchableOpacity>
            <Tabs tabs={tabs} />
          </ScrollView>
        </PageView>
      </SafeAreaView>
    </Container>
  );
};

export default BillingScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pair: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  col: {
    flexDirection: "column",
    gap: 2,
  },
  desc: {
    color: Colors.textLight,
    fontSize: 14,
  },
  item: {
    color: Colors.text,
    fontSize: 16,
  },
});
