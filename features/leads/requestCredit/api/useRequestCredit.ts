import { useMutation, useQueryClient } from "@tanstack/react-query";
import { salesForceUrl } from "api/api-url";
import createFetch from "api/fetchApi";
import { useAccountId } from "features/accounts/AccountContext";
import leadkeys from "features/leads/api/leadKeys";

const fetchApi = createFetch(salesForceUrl);

const requestCredit = (accountId: any) => async (request: any) => {
  const response = await fetchApi(
    `/${accountId}/creditSupplyEvent`,
    {
      method: "POST",
      body: JSON.stringify(request),
    },
    "application/json"
  );
  return response;
};

export default function useRequestCredit() {
  const { accountId } = useAccountId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestCredit(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries([accountId, leadkeys.all]);
    },
  });
}
