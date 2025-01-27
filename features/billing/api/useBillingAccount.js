import { useQuery } from "@tanstack/react-query";
import { gtvUrl } from "api/api-url";
import createFetch from "api/fetchApi";
import { useAccountId } from "features/accounts/AccountContext";

const fetchApi = createFetch(gtvUrl);
async function getBililngAccount({ queryKey }) {
  const accountId = queryKey[0];
  try {
    const response = await fetchApi(`?accountId=${accountId}&return=FULL`);
    return response.response;
  } catch (error) {
    if (error.status === 404) {
      throw new Error("There is no billing account matching that Id");
    }
    throw new Error("There was an error fetching your billing-account");
  }
}

export default function useBillingAccount() {
  const { accountId } = useAccountId();
  const query = useQuery({
    queryKey: [accountId, "billing"],
    queryFn: getBililngAccount,
    suspense: false,
  });
  return query;
}
