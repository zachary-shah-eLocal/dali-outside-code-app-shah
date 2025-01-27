import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BaseCard from "../../base/components/cards/BaseCard";
import { Container } from "../../base/components/containers/Container";
import PageView from "../../base/components/containers/PageView";
import Divider from "../../base/components/Divider";
import { Header } from "../../components/sections/Header";
import { useAccountId } from "../../features/accounts/AccountContext";
import useUsersContact from "../../features/contacts/api/useUsersContact";
import { ArrowIcon } from "../../svgs";
import { Colors } from "../../theme/colors";

type Props = {};

const SwitchAccountScreen = (props: Props) => {
  const { data: userContact } = useUsersContact();
  const { setAccountId } = useAccountId();

  const onAccountPress = async (account: any) => {
    await setAccountId(account);
  };

  return (
    <Container>
      <SafeAreaView>
        <Header />
        <PageView containerStyle={{ padding: 20 }}>
          <BaseCard containerStyles={{ rowGap: 15 }}>
            <Text style={styles.title}>Switch Account</Text>
            <Divider />
            <Text style={styles.subTitle}>Select an account to view</Text>
            <View style={{ rowGap: 16 }}>
              {userContact.accountContacts.map((accountContact: any) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#f9f9fe",
                    padding: 8,
                    borderWidth: 1,
                    borderColor: "#dfe0ed",
                  }}
                  key={accountContact.Account__r.Id}
                  onPress={() => onAccountPress(accountContact.Account__r)}
                >
                  <Text
                    style={{
                      color: Colors.text,
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    {accountContact.Account__r.Name}
                  </Text>
                  <ArrowIcon />
                </TouchableOpacity>
              ))}
            </View>
          </BaseCard>
        </PageView>
      </SafeAreaView>
    </Container>
  );
};

export default SwitchAccountScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.gray,
  },
});
