import { useMutation, useQueryClient } from "@tanstack/react-query";
import { salesForceUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../../accounts/AccountContext";
import contactKeys from "./contactKeys";
const fetchApi = createFetch(salesForceUrl);

const createContact = (accountId) => async (contact) => {
  const response = await fetchApi(`/${accountId}/contacts`, {
    method: "POST",
    body: JSON.stringify(contact),
  });

  return response;
};

export default function useCreateContact() {
  const queryClient = useQueryClient();
  const { accountId } = useAccountId();
  return useMutation({
    mutationFn: createContact(accountId),
    suspense: true,
    onSuccess: () => {
      queryClient.invalidateQueries([accountId, ...contactKeys.all]);
    },
  });
}
