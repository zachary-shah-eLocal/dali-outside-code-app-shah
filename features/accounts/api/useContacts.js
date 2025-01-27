import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../AccountContext";
import contactKeys from "./contactKeys";

const fetchApi = createFetch(salesForceUrl);

async function getContacts({ queryKey }) {
  const accountId = queryKey[0];
  const response = await fetchApi(`/${accountId}/contacts`);

  const sortedResponse = response
    .map((ac) => {
      const { Contact__r, ...accountContact } = ac;
      Contact__r.accountContacts = [accountContact];
      return Contact__r;
    })
    .sort((a, b) => a.LastName > b.LastName);

  return sortedResponse;
}

export default function useContacts(filters) {
  const { accountId } = useAccountId();
  return useQuery({
    queryKey: [accountId, ...contactKeys.list(filters)],
    queryFn: getContacts,
    suspense: true,
  });
}
