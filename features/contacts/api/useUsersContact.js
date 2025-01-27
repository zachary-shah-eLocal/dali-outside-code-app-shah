import { useQuery } from "@tanstack/react-query";
import { salesForceBaseUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAuth } from "../../../features/auth";
import { Navigation } from "../../../helpers/Navigationhelper";
import { Stacks } from "../../../navigation/consts/Stacks";
import { useAccountId } from "../../accounts/AccountContext";

const fetchApi = createFetch(salesForceBaseUrl);

async function getUsersContact({ queryKey }) {
  // const { logout } = useAuth();
  // const { removeAccountId } = useAccountId();

  const handleLogout = async () => {
    Navigation.replace(Stacks.AUTH_STACK);
    // await logout();
    // removeAccountId();
  };

  const cognitoId = queryKey[0];

  let response;

  try {
    response = await fetchApi(`/user_identity/${cognitoId}`);
  } catch (error) {
    if (error.status === 404) {
      console.log("no contact found for user");
      throw new Error("Users account is not linked to a contact");
    }
    if (error.status === 401) {
      console.log("User not authenticated");
      handleLogout();
      // throw new Error("User not authenticated");
    }
    console.error(error);
  }

  const contact = response && response[0];

  // Found contact but does not have membership to any accounts
  if (!contact?.Account_Contact_Assignments__r) {
    return {
      ...contact,
      accountContacts: [],
    };
  }

  contact.accountContacts = contact.Account_Contact_Assignments__r.records;
  return contact;
}

export default function useUsersContact(_filters, suspense = true) {
  const { auth } = useAuth();

  return useQuery({
    queryKey: [auth?.getAccessToken().payload.username],
    queryFn: getUsersContact,
    suspense: suspense,
  });
}
