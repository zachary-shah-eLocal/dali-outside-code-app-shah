import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnkerText from "../../base/components/buttons/AnkerText";
import BaseCard from "../../base/components/cards/BaseCard";
import { Container } from "../../base/components/containers/Container";
import PageView from "../../base/components/containers/PageView";
import Divider from "../../base/components/Divider";
import AppLoader from "../../base/components/loaders/AppLoader";
import Text from "../../base/components/Text";
import { Header } from "../../components/sections/Header";
import useAccount from "../../features/accounts/api/useAccount";
import { LinkingHelper } from "../../helpers/LinkingHelpler";
import { Colors } from "../../theme/colors";
import { format } from "../../utils";

const CONTACT_EMAIL = "customersuccess@elocal.com";
const CONTACT_PHONE = "6106296449";
const CONTACT_BOOKING_URL =
  "https://outlook.office365.com/owa/calendar/eLocalCustomerSuccessCheckIn@elocal.com/bookings/";

const ContactScreen = () => {
  const { data: account, isLoading } = useAccount();

  const showRepContact = () => {
    // Lifted from Legacy:- unless @account.rep_user.try(:house?) || @account.account_designation.blank? || @account.account_designation.smb?
    return (
      account?.Account_Manager__r?.Email !== "correspondence@elocal.com" ||
      !account.attributes?.type ||
      account.attributes?.type !== "smb"
    );
  };
  const openUrl = (url: string) => {
    LinkingHelper.open(url);
  };

  if (isLoading) return <AppLoader />;
  return (
    <Container>
      <SafeAreaView>
        <Header />
        <PageView>
          <ScrollView bounces={false} contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.title}>{account?.Name}</Text>
            <BaseCard>
              <Text style={styles.cardTitle}>We're Here to Help!</Text>
              <Text style={styles.cardSubTitle}>
                If you have questions regarding:
              </Text>
              <Divider />
              <View style={styles.listView}>
                <View style={styles.listItem}>
                  <Text>Account Questions?</Text>
                  <AnkerText
                    style={{ justifyContent: "flex-start" }}
                    label={format.phoneNumber(CONTACT_PHONE)}
                    onPress={() => {
                      openUrl(`tel:${CONTACT_PHONE}`);
                    }}
                  />
                </View>
                <View style={styles.listItem}>
                  <Text>Please call our Customer Success Team:</Text>
                  <AnkerText
                    style={{ justifyContent: "flex-start" }}
                    label={CONTACT_EMAIL}
                    onPress={() => {
                      openUrl(`mailto:${CONTACT_EMAIL}`);
                    }}
                  />
                </View>
                {showRepContact() && (
                  <View style={styles.listItem}>
                    <Text>Category, Coverage Area & Competitive Bidding:</Text>

                    <AnkerText
                      style={{ justifyContent: "flex-start" }}
                      label={account?.Account_Manager__r?.Name ?? ""}
                      onPress={() => {}}
                    />
                  </View>
                )}
                <View style={styles.listItem}>
                  <Text>Book Appointment Online:</Text>
                  <AnkerText
                    style={{ justifyContent: "flex-start" }}
                    label="Schedule a Call with a Customer Success Rep"
                    onPress={() => {
                      openUrl(CONTACT_BOOKING_URL);
                    }}
                  />
                </View>
                <View style={styles.listItem}>
                  <Text>Business hours(Mon-Thu EST):</Text>
                  <Text>8:30AM-12PM &amp; 1PM-5:30PM</Text>
                </View>
                <View style={styles.listItem}>
                  <Text>(Fri EST):</Text>
                  <Text>8:30AM-12PM &amp; 1PM-5PM</Text>
                </View>
                <View style={styles.listItem}>
                  <Text>Sat/Sun/Major holidays:</Text>
                  <Text>Closed</Text>
                </View>
              </View>
            </BaseCard>
          </ScrollView>
        </PageView>
      </SafeAreaView>
    </Container>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  cardSubTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "300",
    textAlign: "center",
    color: Colors.text,
    letterSpacing: 1.6,
  },
  listView: {
    marginTop: 15,
    rowGap: 24,
  },
  listItem: {
    rowGap: 8,
  },
  answer: {},
});
