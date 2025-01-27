import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "api/api-url";
import createFetch from "api/fetchApi";
import { useAccountId } from "features/accounts/AccountContext";
import listingKeys from "./listingKeys";

const fetchApi = createFetch(salesForceUrl);

async function getCampaignListings({ queryKey }: any) {
  const accountId = queryKey[0];
  let { page, campaignId, name, size, listingId } = queryKey.slice(-1)[0];
  size = size ? size : 20;

  const response = await fetchApi(`/${accountId}/campaign_listings`, {
    queryParams: { name, size, page, campaignId, listingId },
  });
  return response;
}

export default function useCampaignListings(filters: any, suspense = true) {
  const { accountId } = useAccountId();
  return useQuery({
    queryKey: [accountId, ...listingKeys.list(filters)],
    queryFn: getCampaignListings,
  });
}
