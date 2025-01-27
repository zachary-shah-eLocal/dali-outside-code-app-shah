import React from "react";
import { StyleSheet, View } from "react-native";
import BaseCard from "../../../base/components/cards/BaseCard";
import Divider from "../../../base/components/Divider";
import Switch from "../../../base/components/inputs/Switch";
import Text from "../../../base/components/Text";
import NotificationForm from "./NotificationForm";

type Props = {
  userContact: any;
};

const UsersAccounts = ({ userContact }: Props) => {
  return (
    <BaseCard containerStyles={{ marginTop: 24, padding: 0 }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          paddingHorizontal: 24,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.5 }}>
          <Text>Account Name</Text>
        </View>
        <View style={{ flex: 0.25 }}>
          <Text>Email</Text>
        </View>
        <View style={{ flex: 0.25 }}>
          <Text>SMS</Text>
        </View>
      </View>
      <Divider />
      {userContact.accountContacts.map((accountContact: any) => (
        <View key={accountContact.Account__r.Postgres_External_Key__c}>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 15,
              paddingHorizontal: 24,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 0.5 }}>
              <Text>{accountContact.Account__r.Name}</Text>
            </View>
            <NotificationForm
              accountId={accountContact.Account__r.Postgres_External_Key__c}
              accountContact={accountContact}
              userContact={userContact}
            />
          </View>
          <Divider />
        </View>
      ))}
    </BaseCard>
  );
};

export default UsersAccounts;

const styles = StyleSheet.create({});
