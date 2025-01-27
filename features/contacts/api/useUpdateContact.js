import { useMutation, useQueryClient } from "@tanstack/react-query";
import { salesForceUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../../accounts/AccountContext";
import { useAuth } from "../../auth";
import contactKeys from "./contactKeys";
const fetchApi = createFetch(salesForceUrl);

const updateContact = (accountId) => async (contact) => {
  const response = await fetchApi(
    `/${accountId}/contacts/${contact.Postgres_External_Key__c}`,
    {
      method: "PUT",
      body: JSON.stringify(contact),
    }
  );

  return response;
};

export default function useUpdateContact() {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const { accountId } = useAccountId();

  const invalidateQueries = () => {
    queryClient.invalidateQueries([accountId, ...contactKeys.all]);
    // queryClient.invalidateQueries([auth?.getAccessToken().payload.username]);
  };
  return useMutation(
    {
      mutationFn: updateContact(accountId),
      suspense: true,
      onSuccess: invalidateQueries,
    },
    queryClient
  );
}
