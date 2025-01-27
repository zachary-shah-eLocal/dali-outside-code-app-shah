import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "api/api-url";
import createFetch from "api/fetchApi";
import { useAccountId } from "features/accounts/AccountContext";
import campaignKeys from "./campaignKeys";

const fetchApi = createFetch(salesForceUrl);

async function getCampaigns({ queryKey }: any) {
  const accountId = queryKey[0];
  let { page = 1, name, budgetId, size = 20 } = queryKey.slice(-1)[0];
  const response = await fetchApi(`/${accountId}/campaigns`, {
    queryParams: { page, size, name, budgetId },
  });
  return response;
}

export default function useCampaigns(filters: any) {
  const { accountId } = useAccountId();

  return useQuery({
    queryKey: [accountId, ...campaignKeys.list(filters)],
    queryFn: getCampaigns,
  });
}
