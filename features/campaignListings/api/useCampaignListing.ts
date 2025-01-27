import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "api/api-url";
import createFetch from "api/fetchApi";
import { useAccountId } from "features/accounts/AccountContext";
import listingKeys from "./listingKeys";

const fetchApi = createFetch(salesForceUrl);

async function getCampaignListingById({ queryKey }: any) {
  const accountId = queryKey[0];
  const [campaignId, campaignListingId] = queryKey.slice(-1)[0].split(",");
  try {
    const response = await fetchApi(
      `/${accountId}/campaign_listings/${campaignListingId}`,
      { queryParams: { campaignId } }
    );
    const record = response.records[0];
    if (!record.Geo_Targets__r) {
      record.Geo_Targets__r = {
        records: [],
      };
    }
    return record;
  } catch (error) {
    console.error(error);
    throw new Error("Campaign Listing failed fetch");
  }
}

export default function useCampaignListings(
  campaignId: string,
  campaignListingId: string
) {
  const { accountId } = useAccountId();
  return useQuery({
    queryKey: [
      accountId,
      ...listingKeys.detail(`${campaignId},${campaignListingId}`),
    ],
    queryFn: getCampaignListingById,
  });
}
