import { useMutation, useQueryClient } from "@tanstack/react-query";
import { salesForceUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../../accounts/AccountContext";
import { useAuth } from "../../auth";
// import createFetch from 'api/fetchApi'
// import { useAccountId } from 'features/accounts/AccountContext'
// import { salesForceUrl } from 'api/api-url'
// import { useAuth } from 'features/auth'

const fetchApi = createFetch(salesForceUrl);

const updateAccountContact = () => async (role) => {
  const { accountId, ...accountContact } = role;
  const response = await fetchApi(
    `/${accountId}/account_contact_assignments/${accountContact.Postgres_External_Key__c}`,
    {
      method: "PUT",
      body: JSON.stringify(accountContact),
    }
  );
  return response[0];
};

export default function useUpdateAccountNotifications() {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const userName = auth?.getAccessToken().payload.username;
  return useMutation({
    mutationFn: updateAccountContact(),
    onMutate: async (role) => {
      await queryClient.cancelQueries({ queryKey: [userName] });

      const previousUserContact = queryClient.getQueryData([userName]);
      queryClient.setQueryData([userName, auth.isAdmin], (old) => {
        const copy = JSON.parse(JSON.stringify(old));

        copy.accountContacts = copy.accountContacts.map((x) => {
          return x.Id === role.Id ? { ...x, ...role } : x;
        });
        return copy;
      });

      return { previousUserContact };
    },
    onError: (_err, _newRole, context) => {
      console.log(_err);
      queryClient.setQueryData([userName], context.previousUserContact);
    },
    onSettled: () => {
      queryClient.invalidateQueries([userName]);
    },
  });
}
