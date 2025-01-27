import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "api/api-url";
import createFetch from "api/fetchApi";
import { useAccountId } from "features/accounts/AccountContext";
import budgetKeys from "./budgetKeys";

const fetchApi = createFetch(salesForceUrl);

async function getBudget({ queryKey }) {
  const accountId = queryKey[0];
  const budgetId = queryKey.slice(-1)[0];
  try {
    const response = await fetchApi(`/${accountId}/budgets/${budgetId}`);
    return response.records[0];
  } catch (error) {
    throw new Error("Error finding budget");
  }
}

export default function useBudget(budgetId) {
  const { accountId } = useAccountId();
  return useQuery({
    queryKey: [accountId, ...budgetKeys.detail(budgetId)],
    queryFn: getBudget,
  });
}
