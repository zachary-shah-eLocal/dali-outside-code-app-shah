import { accountUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { format } from "../../../utils";

const fetchApi = createFetch(accountUrl);
const formatSting = "yyyy-LL-dd";
const formatDate = (value) => {
  try {
    return format.date(value, formatSting);
  } catch {
    return null;
  }
};

export async function getLeadsCSV({ queryKey }) {
  const accountId = queryKey[0];
  const { filterKey, filterValue, campaignId, campaignlistingId, ...filters } =
    queryKey.slice(-1)[0];

  const response = await fetchApi(
    `/supply-event/web-lead/csv`,
    {
      queryParams: {
        accountId,
        ...filters,
        [filterKey]: filterValue,
        adCampaignId: campaignId,
        adCampaignListingId: campaignlistingId,
        startDate: formatDate(filters.startDate),
        endDate: formatDate(filters.endDate),
      },
    },
    "text/csv"
  );
  return await response.text();
}
