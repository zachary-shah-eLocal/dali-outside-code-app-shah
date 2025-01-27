import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Accordion from "../../../base/components/accordions/Accordion";
import BaseCard from "../../../base/components/cards/BaseCard";
import { Container } from "../../../base/components/containers/Container";
import PageView from "../../../base/components/containers/PageView";
import AppLoader from "../../../base/components/loaders/AppLoader";
import CampingIcon from "../../../base/icons/account/CampingIcon";
import ContactIcon from "../../../base/icons/account/ContactIcon";
import DollarIcon from "../../../base/icons/account/DollarIcon";
import LocationIcon from "../../../base/icons/account/LocationIcon";
import PauseIcon from "../../../base/icons/account/PauseIcon";
import { Header } from "../../../components/sections/Header";
import useAccount from "../../../features/accounts/api/useAccount";
import AccountDetails from "../../../features/accounts/components/AccountDetails";
import AccountLinkButton from "../../../features/accounts/components/AccountLinkButton";
import { Screens } from "../../../navigation/consts/Screens";
import { HomeIcon } from "../../../svgs";

type Props = {};

const AccountScreen = (props: Props) => {
  const { data: account, isLoading } = useAccount(true);

  if (isLoading) return <AppLoader />;
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <Header />
        <ScrollView
          bounces={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <PageView containerStyle={{ flex: 1, gap: 20, padding: 20 }}>
            <Accordion>
              <Accordion.Header>
                <View style={{ alignItems: "center", gap: 10 }}>
                  <Text>Account Name</Text>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    {account?.Name}
                  </Text>
                </View>
              </Accordion.Header>
              <Accordion.Content>
                <AccountDetails data={account} />
              </Accordion.Content>
            </Accordion>
            <BaseCard>
              <AccountLinkButton
                icon={<ContactIcon />}
                label="Contacts"
                screen={Screens.ACCOUNT_CONTACTS_SCREEN}
              />
              <AccountLinkButton
                icon={<LocationIcon />}
                label="Locations"
                screen={Screens.ACCOUNT_LOCATIONS_SCREEN}
              />
              <AccountLinkButton
                icon={<CampingIcon />}
                label="Holidays"
                screen={Screens.ACCOUNT_HOLIDAYS_SCREEN}
              />
              <AccountLinkButton
                icon={<PauseIcon />}
                label="Pauses"
                screen={Screens.ACCOUNT_PAUSES_SCREEN}
              />
              <AccountLinkButton
                icon={<DollarIcon />}
                label="Budgets"
                screen={Screens.ACCOUNT_BUDGETS_SCREEN}
              />
            </BaseCard>
          </PageView>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
