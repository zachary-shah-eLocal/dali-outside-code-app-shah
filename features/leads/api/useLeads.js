import { useQuery } from "@tanstack/react-query";
import { fetchLeads } from "../../../services/leads.service";
import { useAccountId } from "../../accounts/AccountContext";
import leadKeys from "./leadKeys";

function useLeads(filters) {
  const { accountId } = useAccountId();

  const queryResult = useQuery({
    queryKey: [accountId, ...leadKeys.list(filters)],
    queryFn: () => fetchLeads({ accountId, ...filters }),
    suspense: false,
  });

  return queryResult;
}

export default useLeads;
