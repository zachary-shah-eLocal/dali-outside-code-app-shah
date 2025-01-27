import { format as formatDate } from "date-fns";
import { isEmpty, omitBy } from "lodash-es";
import { vikingApi } from "../api/http-client";
import { DEFAULT_DATE_FORMAT } from "../utils/format";

// Define the shape of the filters object
// We won't use TypeScript types here
export async function fetchLeads(filters) {
  // Filter out empty criteria
  const searchParams = omitBy(
    {
      accountId: filters.accountId,
      adCampaignId: filters.campaignId,
      adCampaignListingId: filters.campaignListingId,
      startDate: formatDate(filters.startDate, DEFAULT_DATE_FORMAT),
      endDate: formatDate(filters.endDate, DEFAULT_DATE_FORMAT),
      page: filters.page - 1,
      size: filters.size,
      [filters.filterKey]: filters.filterValue,
    },
    isEmpty
  );

  // Adjust to handle JavaScript only
  const leadsResponse = await vikingApi.get(
    "account-management/supply-event/web-lead",
    { searchParams }
  );
  return leadsResponse;
}

export async function fetchLead(supplyEventId) {
  const leadsResponse = await vikingApi.get(
    "account-management/supply-event/web-lead",
    {
      searchParams: { supplyEventId },
    }
  );

  const lead = leadsResponse?.response?.supplyEvents?.[0];

  if (!lead) {
    throw new Error(`No supply event matching ID: ${supplyEventId}`);
  }

  return lead;
}
