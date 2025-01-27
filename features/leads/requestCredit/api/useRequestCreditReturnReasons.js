import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "api/api-url";
import createFetch from "api/fetchApi";
import { useAccountId } from "features/accounts/AccountContext";
import returnReasonsKeys from "./returnReasonsKeys";
const fetchApi = createFetch(salesForceUrl);

async function getReturnReasons({ queryKey }) {
  const accountId = queryKey[0];
  const { supplyEventType, supplyEventId } = queryKey.slice(-1)[0];

  let response = {};

  try {
    const data = await fetchApi(
      `/${accountId}/product_types/${supplyEventType}/supply_events/${supplyEventId}/return_reasons`
    );
    response.data = data;
  } catch (e) {
    response.error =
      e && e.errors && e.errors[0] && e.errors[0].message
        ? e.errors[0].message
        : e || "Unknown error";
  }

  return response;
}

function useRequestCreditReasons(filters) {
  const { accountId } = useAccountId();

  const query = useQuery({
    queryKey: [accountId, "returnReasons", ...returnReasonsKeys.list(filters)],
    queryFn: getReturnReasons,
    suspense: true,
  });
  return query;
}

export default useRequestCreditReasons;
