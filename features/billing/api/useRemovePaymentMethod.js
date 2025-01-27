import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gtvUrl } from "api/api-url";
import createFetch from "api/fetchApi";
import { useAccountId } from "features/accounts/AccountContext";
const fetchApi = createFetch(gtvUrl);

const removePaymentMethod = (accountId) => async (recurringPaymentId) => {
  const res = await fetchApi(
    `/${accountId}/payment-method/${recurringPaymentId}/remove`,
    { method: "POST" }
  );
  return res.response;
};

export default function useAddPaymentMethod() {
  const { accountId } = useAccountId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removePaymentMethod(accountId),
    suspense: true,
    onSuccess: () => {
      queryClient.invalidateQueries([accountId, "billing"]);
    },
  });
}
