import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../base/components/buttons/Button";
import BaseCard from "../../../base/components/cards/BaseCard";
import { Container } from "../../../base/components/containers/Container";
import PageView from "../../../base/components/containers/PageView";
import Divider from "../../../base/components/Divider";
import Switch from "../../../base/components/inputs/Switch";
import Text from "../../../base/components/Text";
import { Header } from "../../../components/sections/Header";
import useUpdateContact from "../../../features/contacts/api/useUpdateContact";
import useUsersContact from "../../../features/contacts/api/useUsersContact";
import UsersAccounts from "../../../features/contacts/components/UsersAccounts";
import { Navigation } from "../../../helpers/Navigationhelper";
import { ToastHelper } from "../../../helpers/ToastHelpers";
import { Screens } from "../../../navigation/consts/Screens";
import { Colors } from "../../../theme/colors";

const InfoItem = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) => {
  const renderValue = () => {
    if (!value || value === "") {
      return "N/A";
    }
    return value;
  };
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      {value && <Text style={styles.infoValue}>{renderValue()}</Text>}
      {children && <View style={{ marginTop: 10 }}>{children}</View>}
    </View>
  );
};

const ProfileScreen = () => {
  const { data: userContact } = useUsersContact();
  const { mutate: updateContact } = useUpdateContact();

  const [marketUpdates, setMarketUpdates] = React.useState<boolean>(
    userContact.Allow_Marketing_Communications__c || false
  );

  const handleToggleMarketEmail = () => {
    setMarketUpdates((state) => !state);
    const contactUpdate = {
      Id: userContact.Id,
      Postgres_External_Key__c: userContact.Postgres_External_Key__c,
      Allow_Marketing_Communications__c:
        !userContact.Allow_Marketing_Communications__c,
    };

    updateContact(contactUpdate, {
      onSuccess: () => {
        ToastHelper.success("Updated successfully");
      },
      onError: () => {
        ToastHelper.error("Failed to update contact");
      },
    });
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <Header />
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 32,
          }}
        >
          <PageView containerStyle={{ flex: 1 }}>
            <BaseCard containerStyles={{ gap: 20 }}>
              <View>
                <Text style={styles.cardTitle}>
                  {userContact.FirstName} {userContact.LastName}
                </Text>
                <Text style={styles.cardSubTitle}>{userContact.Email}</Text>
                <Button
                  title="Edit Contact Information"
                  onPress={() => {
                    Navigation.navigate(
                      Screens.EDIT_CONTACT_INFORMATION_SCREEN
                    );
                  }}
                  containerStyle={{
                    backgroundColor: Colors.secondary,
                    borderRadius: 50,
                    alignSelf: "center",
                  }}
                  fullWidth={false}
                  size="small"
                />
              </View>
              <View>
                <Text style={[styles.title, {}]}>Contact Information</Text>
                <View style={styles.row}>
                  <InfoItem label="Phone" value={userContact.Phone} />
                  <InfoItem
                    label="Phone Extension"
                    value={userContact.Phone_Ext__c}
                  />
                  <InfoItem label="Mobile Phone" value={userContact.Phone} />
                  <InfoItem label="Street" value={userContact.MailingStreet} />
                  <InfoItem label="City" value={userContact.MailingCity} />
                  <InfoItem label="State" value={userContact.MailingState} />
                  <InfoItem
                    label="Postal Code"
                    value={userContact.MailingPostalCode}
                  />
                  <InfoItem
                    label="Country"
                    value={userContact.MailingCountry}
                  />
                  <InfoItem
                    label="Time Zone"
                    value={userContact.Time_Zone__c}
                  />
                  <InfoItem label="Recieve marketing updates">
                    <Switch
                      value={marketUpdates}
                      onChange={handleToggleMarketEmail}
                    />
                  </InfoItem>
                </View>
              </View>
            </BaseCard>
            <UsersAccounts userContact={userContact} />
          </PageView>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
    lineHeight: 28,
  },
  cardSubTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
    color: Colors.gray,
    lineHeight: 22.5,
  },
  row: {
    gap: 15,
  },
  infoItem: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  infoLabel: { color: Colors.secondary, fontWeight: "500", letterSpacing: 0.5 },
  infoValue: { color: Colors.text, fontSize: 16, lineHeight: 24 },
});
