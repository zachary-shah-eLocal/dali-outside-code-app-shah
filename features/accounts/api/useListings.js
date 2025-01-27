import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../AccountContext";
import listingKeys from "./listingKeys";

const fetchApi = createFetch(salesForceUrl);

async function getCampaignListings({ queryKey }) {
  const accountId = queryKey[0];
  let { page, size = 20, filterKey, filterValue } = queryKey.slice(-1)[0];

  const response = await fetchApi(`/${accountId}/listings`, {
    queryParams: { page, size, [filterKey]: filterValue },
  });
  return response;
}

export default function useCampaignListings(filters, suspense = true) {
  const { accountId } = useAccountId();
  return useQuery({
    queryKey: [accountId, ...listingKeys.list(filters)],
    queryFn: getCampaignListings,
  });
}
