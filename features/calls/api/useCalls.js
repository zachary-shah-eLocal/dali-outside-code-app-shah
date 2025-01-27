import { useQuery } from "@tanstack/react-query";
import { accountUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { format } from "../../../utils";
import { useAccountId } from "../../accounts/AccountContext";
import callKeys from "./callKeys";

const fetchApi = createFetch(accountUrl);
const formatSting = "yyyy-LL-dd";
const formatDate = (value) => {
  try {
    return format.date(value, formatSting);
  } catch {
    return null;
  }
};

async function getCalls({ queryKey }) {
  const accountId = queryKey[0];
  const { filterKey, filterValue, campaignlistingId, ...filters } =
    queryKey.slice(-1)[0];

  const response = await fetchApi(`/supply-event/call`, {
    queryParams: {
      accountId,
      ...filters,
      page: filters.page - 1,
      [filterKey]: filterValue,
      adCampaignListingId: campaignlistingId,
      startDate: formatDate(filters.startDate),
      endDate: formatDate(filters.endDate),
    },
  });

  return response.response;
}

function useCalls(filters) {
  const { accountId } = useAccountId();

  const query = useQuery({
    queryKey: [accountId, ...callKeys.list(filters)],
    queryFn: getCalls,
  });
  return query;
}

export default useCalls;
