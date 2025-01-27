import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "api/api-url";
import createFetch from "api/fetchApi";
import { useAccountId } from "features/accounts/AccountContext";
import campaignKeys from "./campaignKeys";

const fetchApi = createFetch(salesForceUrl);

async function getCampaignById({ queryKey }: any) {
  const accountId = queryKey[0];
  const campaignId = queryKey.slice(-1)[0];
  try {
    const response = await fetchApi(`/${accountId}/campaigns/${campaignId}`);
    const campaign = response.records[0];
    if (campaign.Product_VConfig__r.Name.toLowerCase().includes("call")) {
      campaign.productType = "call";
    }
    if (campaign.Product_VConfig__r.Name.toLowerCase().includes("lead")) {
      campaign.productType = "lead";
    }
    return campaign;
  } catch (error: any) {
    if (error?.status === 404) {
      throw new Error("There is no campaign matching that Id");
    }
    throw new Error("There was an error fetching your campaign");
  }
}

export default function useCampaign(campaignId: string) {
  const { accountId } = useAccountId();
  const query = useQuery({
    queryKey: [accountId, ...campaignKeys.detail(campaignId)],
    queryFn: getCampaignById,
  });
  return query;
}
