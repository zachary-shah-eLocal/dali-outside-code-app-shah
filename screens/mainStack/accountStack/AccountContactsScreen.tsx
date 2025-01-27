import { orderBy } from "lodash";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AnkerText from "../../../base/components/buttons/AnkerText";
import AppLoader from "../../../base/components/loaders/AppLoader";
import ScreenLoader from "../../../base/components/loaders/ScreenLoader";
import MailIcon from "../../../base/icons/card/MailIcon";
import UserIcon from "../../../base/icons/card/UserIcon";
import useContacts from "../../../features/accounts/api/useContacts";
import AccountScreensWrapper from "../../../features/accounts/components/AccountScreensWrapper";
import ContactCard from "../../../features/accounts/components/ContactCard";
import { useAuth } from "../../../features/auth";
import { Navigation } from "../../../helpers/Navigationhelper";
import { Screens } from "../../../navigation/consts/Screens";

type Props = {};

const AddContactButton = () => {
  return (
    <AnkerText
      style={{ marginLeft: "auto" }}
      label="+ Add contact"
      onPress={() => {
        Navigation.navigate(Screens.ACCOUNT_NEW_CONTACTS_SCREEN);
      }}
    />
  );
};

const AccountContactsScreen = (props: Props) => {
  const { auth } = useAuth();

  const { data: contacts, isLoading } = useContacts();
  const sortedContacts = orderBy(contacts ?? [], (contact) =>
    contact.Email === auth?.getIdToken().payload.email ? 0 : 1
  );

  return (
    <AccountScreensWrapper
      screenName="Contact"
      screenTitle="Contact will be removed from account if at least one role is not selected"
      renderActionComponent={<AddContactButton />}
    >
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <>
          {sortedContacts.map((contact) => (
            <ContactCard key={contact.Id} data={contact} />
          ))}
        </>
      )}
    </AccountScreensWrapper>
  );
};

export default AccountContactsScreen;
