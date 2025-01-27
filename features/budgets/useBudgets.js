import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "../../api/api-url";
import createFetch from "../../api/fetchApi";
import { useAccountId } from "../accounts/AccountContext";
import budgetKeys from "./budgetKeys";

const fetchApi = createFetch(salesForceUrl);

async function getBudgets({ queryKey }) {
  const accountId = queryKey[0];
  let { page = 1, name, size = 20 } = queryKey.slice(-1)[0];

  const response = await fetchApi(`/${accountId}/budgets`, {
    queryParams: { page, size, name },
  });
  return response;
}

export default function useBudgets(filters, suspense = true) {
  const { accountId } = useAccountId();
  return useQuery({
    queryKey: [accountId, ...budgetKeys.list(filters)],
    queryFn: getBudgets,
    //  suspense,
  });
}
