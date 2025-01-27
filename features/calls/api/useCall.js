import { useQuery } from "@tanstack/react-query";

import { accountUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../../accounts/AccountContext";
import CallKeys from "./callKeys";

const fetchApi = createFetch(accountUrl);

async function getCall({ queryKey }) {
  const supplyEventId = queryKey.slice(-1)[0];

  // size and page are set to 1 here because this is being used as the get by ID call
  const response = await fetchApi(`/supply-event/call`, {
    queryParams: {
      supplyEventId,
      size: 1,
      page: 0,
    },
  });

  const call = response?.response.supplyEvents[0];

  if (!call) {
    throw new Error(`No supply event matching ID: ${supplyEventId}`);
  }
  return call;
}

function useCall(supplyEventId) {
  const { accountId } = useAccountId();

  const query = useQuery({
    queryKey: [accountId, ...CallKeys.detail(supplyEventId)],
    queryFn: getCall,
    suspense: false,
  });
  return query;
}

export default useCall;
