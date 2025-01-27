import { useQuery } from "@tanstack/react-query";
import { fetchLead } from "../../../services/leads.service";
import { useAccountId } from "../../accounts/AccountContext";
import leadKeys from "./leadKeys";

function useLead(supplyEventId) {
  const { accountId } = useAccountId();

  const queryResult = useQuery({
    queryKey: [accountId, ...leadKeys.detail(supplyEventId)],
    queryFn: () => fetchLead(supplyEventId),
    suspense: false,
  });

  return queryResult;
}

export default useLead;
