import { useQuery } from "@tanstack/react-query";
import { accountUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../../accounts/AccountContext";

const fetchApi = createFetch(accountUrl);

async function getAccountFilterOptions({ queryKey }) {
  const accountId = queryKey[0];
  try {
    const response = await fetchApi(`/supply-event/distinct-category`, {
      queryParams: { supplyEventType: "LEAD", accountId },
    });
    return response.response;
  } catch (error) {
    throw new Error("Error fetching category filter options");
  }
}

export default function useAccountFilterOptions(budgetId, suspense = true) {
  const { accountId } = useAccountId();

  return useQuery({
    queryKey: [accountId, "lead-filterOptions"],
    queryFn: getAccountFilterOptions,
    suspense,
  });
}
