import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../AccountContext";
import accountKeys from "./accountKeys";
const fetchApi = createFetch(salesForceUrl);

async function getAccount({ queryKey }: any) {
  const id = queryKey.slice(-1)[0];
  const response = await fetchApi(`/${id}`, {}, false);
  return response;
}

export default function useAccount(suspense = true) {
  const { accountId } = useAccountId();

  return useQuery({
    queryKey: accountKeys.detail(accountId),
    queryFn: getAccount,
    // suspense: suspense,
    enabled: !!accountId,
  });
}
